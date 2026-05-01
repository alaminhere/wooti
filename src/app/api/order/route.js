import connectdb from '@/libs/connectdb';
import { Cart } from '@/models/cartSchema';
import { Order } from '@/models/orderShema';
import { Product } from '@/models/productShema';

import { NextResponse } from 'next/server';

export async function POST(request) {
  const { method, form, orderPrice, userId } = await request.json();
  try {
    await connectdb();

    const cart = await Cart.findOne({ user: userId });
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
      user: userId,
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
    await Order.create(payload);
    for (const item of cart?.cartItems) {
      await Product.findByIdAndUpdate(
        { _id: item._id },
        {
          $inc: { stock: -item.quantity },
        },
      );
    }
    await Cart.findOneAndUpdate({ user: userId }, { $set: { cartItems: [] } });

    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
