import mongoose from 'mongoose';

// Status history er jonno alag schema
const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      required: true,
      default: 'pending',
    },
  },
  { timestamps: true },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        title: { type: String, required: true },
        image: String,
        price: { type: Number, required: true },
        discountPrice: { type: Number, required: true },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],

    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      country: { type: String, default: 'Bangladesh' },
      city: { type: String },
      zip: { type: String },
      email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
      },
      phone: { type: String, required: true },
      notes: String,
    },

    paymentMethod: {
      type: String,
      enum: ['COD', 'Stripe'],
      required: true,
      default: 'COD',
    },

    paymentResult: {
      id: String,
      status: String,
      updatedAt: String,
      emailAddress: String,
    },

    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    discountPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },

    isPaid: { type: Boolean, default: false },
    paidAt: Date,

    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

    statusHistory: [statusHistorySchema],

    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
  },
  { timestamps: true },
);

export const Order =
  mongoose.models.Order || mongoose.model('Order', orderSchema);
