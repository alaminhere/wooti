import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: {
        url: String,
        public_id: String,
      },
      default: [],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema);
