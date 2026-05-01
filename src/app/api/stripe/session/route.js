// ==================== /api/stripe/session/route.js ====================
import connectdb from '@/libs/connectdb';
import { Cart } from '@/models/cartSchema';
import { Order } from '@/models/orderShema';
import { Product } from '@/models/productShema';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { method, form, orderPrice, cartItems, user } = await req.json();

  await connectdb();

  try {
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: 'Cart not found!',
        },
        { status: 400 },
      );
    }

    const payload = {
      user: user._id,
      orderItems: cart?.cartItems,
      shippingAddress: {
        name: form.fullName,
        address: form.address,
        country: form.country,
        city: form.city,
        zip: form.zip,
        email: form.email,
        phone: form.phone,
        notes: form.notes,
      },

      paymentMethod: method,
      itemsPrice: orderPrice.itemsPrice,
      shippingPrice: 0,
      discountPrice: orderPrice.discountPrice,
      totalPrice: orderPrice.totalPrice,
      statusHistory: [
        {
          status: 'pending',
        },
      ],
    };
    const res = await Order.create(payload);
    const orderId = res._id.toString();

    const lineItems = await Promise.all(
      cartItems?.map(async item => {
        const product = await Product.findById(item.product);

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              images: [product.images[0].url],
            },

            unit_amount: product.discountPrice * 100,
          },
          quantity: item.quantity,
        };
      }),
    );

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_API}/success?orderId=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_API}/cancel`,
      mode: 'payment',
      customer_email: user.email,

      client_reference_id: user._id.toString(),
      payment_method_types: ['card'],

      metadata: {
        orderId: orderId,
        userId: user._id.toString(),
      },

      shipping_address_collection: {
        allowed_countries: ['US', 'BD'],
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Stripe session created successfully',
        data: session,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || 'Stripe session failed',
        data: null,
      },
      { status: 500 },
    );
  }
}
