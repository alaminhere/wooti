'use server';

import authOptions from '@/libs/authOptions';
import connectdb from '@/libs/connectdb';
import uploadImage from '@/libs/uploadImage';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';

// profile change
export const submitProfile = async (preData, formData) => {
  const { token } = await getServerSession(authOptions);
  const id = token?.user?._id;

  const name = formData.get('name');
  const newEmail = formData.get('email');
  const file = formData.get('file');

  if (!id) {
    return {
      success: false,
      message: 'Unauthorized',
    };
  }

  if (!name || !newEmail) {
    return {
      success: false,
      message: 'Please fill in all required fields!',
    };
  }

  try {
    await connectdb();
    const currentUser = await User.findOne({ _id: id });

    if (!currentUser) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    let imgUrl = currentUser.image;
    if (file && file.size > 0) {
      const res = await uploadImage(file);
      imgUrl = res.url;
    }

    await User.findOneAndUpdate(
      { _id: id },
      { image: imgUrl, name: name, email: newEmail },
    );

    return {
      success: true,
      message: 'Profile successfully updated',
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'something went wrong! Please try again',
    };
  }
};

// change Password With Current Password
export const changePasswordWithCurrentPassword = async (_preData, formData) => {
  const { token } = await getServerSession(authOptions);
  const id = token?.user?._id;

  const currentPassword = formData.get('currentPassword');
  const password = formData.get('newPassword');
  const confirmpassword = formData.get('confirmPassword');

  try {
    if (!currentPassword || !password || !confirmpassword) {
      return {
        success: false,
        message: 'Please fill in all required fields!',
      };
    }

    if (password !== confirmpassword) {
      return {
        success: false,
        message: "Password and confirm password don't match",
      };
    }

    if (!id) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    await connectdb();
    const currentUser = await User.findOne({ _id: id });

    if (!currentUser) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    //   Google user check
    if (!currentUser.password) {
      return {
        success: false,
        message:
          'This account was registered with Google. Please use Google to sign in.',
      };
    }

    const isMatch = await bcrypt.compare(currentPassword, currentUser.password);
    if (!isMatch) {
      return {
        success: false,
        message: 'Current password is incorrect',
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ _id: id }, { password: hashedPassword });

    return {
      success: true,
      message: 'Password successfully updated',
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'something went wrong! Please try again',
    };
  }
};
