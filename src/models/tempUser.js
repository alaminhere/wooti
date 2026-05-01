import mongoose from 'mongoose';
const tempUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },

    verifyCode: {
      type: String,
      required: true,
    },
    verifyExpiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const TempUser =
  mongoose.models.TempUser || mongoose.model('TempUser', tempUserSchema);
export default TempUser;
