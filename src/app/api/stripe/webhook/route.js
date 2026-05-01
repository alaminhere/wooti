// ==================== /api/stripe/webhook/route.js ====================
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import connectdb from '@/libs/connectdb';
import { Cart } from '@/models/cartSchema';
import { Product } from '@/models/productShema';
import { Order } from '@/models/orderShema';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();

  const signature = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // payment success
  if (event.type === 'checkout.session.completed') {
    try {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const orderId = session.metadata.orderId;

      await connectdb();
      const order = await Order.findById(orderId);

      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      await Order.findByIdAndUpdate(orderId, {
        $set: {
          isPaid: true,
          paidAt: new Date(),
          orderStatus: 'processing',
          paymentResult: {
            id: session.payment_intent,
            status: 'paid',
            updatedAt: new Date().toISOString(),
            emailAddress: session.customer_email,
          },
        },
        $push: {
          statusHistory: {
            status: 'processing',
          },
        },
      });

      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(
          { _id: item.product },
          {
            $inc: { stock: -item.quantity },
          },
        );
      }
      await Cart.findOneAndUpdate(
        { user: userId },
        { $set: { cartItems: [] } },
      );

      return NextResponse.json({ received: true });
    } catch (err) {
      console.error('Webhook error:', err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
