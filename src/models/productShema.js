import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      text: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      min: [1, 'Price must be greater than 0'],
    },
    discountPrice: {
      type: Number,
      default: 0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    images: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      default: [],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    widh: {
      type: Number,
      min: 1,
    },
    height: {
      type: Number,
      min: 1,
    },
    packages: {
      type: Number,
      required: true,
      min: 1,
    },

    brand: {
      type: String,
      default: '',
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
    
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
