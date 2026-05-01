'use server';

import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { cookies } from 'next/headers';
import connectdb from '@/libs/connectdb';
import TempUser from '@/models/tempUser';
import sendVerificationEmail from '@/libs/sendVerificationEmail';

// registerUser => create TempUser
export const registerUser = async (prevData, formData) => {
  const cookiesStore = await cookies();

  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmpassword = formData.get('confirmpassword');
  //console.log(name, email, password, confirmpassword);

  try {
    await connectdb();

    // validation
    if (!name || !email || !password || !confirmpassword) {
      return {
        success: false,
        message: 'Please fill in all required fields!',
      };
    }

    // password check
    if (password !== confirmpassword) {
      return {
        success: false,
        message: "Password don't match",
      };
    }

    // exists user check
    const existsUser = await User.findOne({ email: email });
    if (existsUser) {
      return {
        success: false,
        message: 'Email already in use',
      };
    }

    // exists temp user check
    await TempUser.findOneAndDelete({ email: email });

    // verification code + expiry, current time + 4 minutes 6 digit code
    const verifyExpiry = new Date(Date.now() + 1000 * 60 * 2);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // create temp user
    await TempUser.create({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      verifyCode: verifyCode,
      verifyExpiry: verifyExpiry,
    });

    //send email
    await sendVerificationEmail(verifyCode, email);

    // set cookies
    cookiesStore.set('verifyEmail', email, {
      expires: new Date(verifyExpiry),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    cookiesStore.set('expiry', verifyExpiry.toString(), {
      expires: new Date(verifyExpiry),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return {
      success: true,
      message:
        'A verification code has been send to your email. Please check your inbox.',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again.',
    };
  }
};

//======= otp verification =>  create User, and reset password verify========
export const verification = async (prevData, formData) => {
  const cookiesStore = await cookies();

  const otp = formData.get('otp');
  const verifyType = formData.get('type');
  const email = formData.get('email');

  try {
    await connectdb();

    if (!email) {
      return {
        success: false,
        message: 'session expire! Please try again later',
      };
    }

    if (verifyType === 'register') {
      const existsTempUser = await TempUser.findOne({ email: email });
      if (!existsTempUser) {
        return {
          success: false,
          message: 'User not found! Please try again later',
        };
      }

      if (existsTempUser.verifyExpiry <= Date.now()) {
        return {
          success: false,
          message: 'User not found! Please try again later',
        };
      }

      if (existsTempUser.verifyCode !== otp) {
        return {
          success: false,
          message: "Verification code don't match",
        };
      }

      // create user
      await User.create({
        name: existsTempUser.name,
        email: existsTempUser.email,
        password: existsTempUser.password,
        isVerified: true,
      });
      await TempUser.findOneAndDelete({ email: email });

      return {
        success: true,
        message: 'Account created successfully',
        email: email,
      };
    }

    if (verifyType === 'forgot-password') {
      const existsUser = await User.findOne({ email: email });

      if (!existsUser) {
        return {
          success: false,
          message: 'User not found! Please try again later',
        };
      }

      if (existsUser.verifyExpiry <= Date.now()) {
        return {
          success: false,
          message: 'session expire! Please try again later',
        };
      }

      if (existsUser.verifyCode !== otp) {
        return {
          success: false,
          message: "Verification code don't match",
        };
      }

      await User.findOneAndUpdate(
        { email: email },
        {
          resetPasswordVerified: true,
          verifyCode: '',
          verifyExpiry: null,
        },
      );
      const verifyExpiry = new Date(Date.now() + 1000 * 60 * 30);
      // set cookies
      cookiesStore.set('resetVerifyEmail', email, {
        expires: new Date(verifyExpiry),
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      });

      return {
        success: true,
        message: 'Verify Successfully',
        email: email,
      };
    }

    //
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again.',
    };
  }
};

// ================= forgot password ===========================
export const forgotPassword = async (prevData, formData) => {
  const cookiesStore = await cookies();
  const email = formData.get('email');

  try {
    await connectdb();

    const user = await User.findOne({ email: email });
    if (!user) {
      return {
        success: false,
        message: 'User not found! Please try again later',
      };
    }
    const verifyExpiry = new Date(Date.now() + 1000 * 60 * 4);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    //send email
    await sendVerificationEmail(verifyCode, email);

    await User.findOneAndUpdate(
      { email: email },
      { verifyCode: verifyCode, verifyExpiry: verifyExpiry },
    );

    // set cookies
    cookiesStore.set('verifyEmail', email, {
      expires: new Date(verifyExpiry),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    cookiesStore.set('expiry', verifyExpiry.toString(), {
      expires: new Date(verifyExpiry),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return {
      success: true,
      message:
        'A verification code has been send to your email. Please check your inbox.',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again.',
    };
  }
};

// ================== verifyRased =====================
export const verifyResend = async (email, type) => {
  const cookiesStore = await cookies();
  const verifyType = type;

  try {
    await connectdb();
    if (!email) {
      return {
        success: false,
        message: 'session expire! Please try again later',
      };
    }

    const verifyExpiry = new Date(Date.now() + 1000 * 60 * 4);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    //send email
    await sendVerificationEmail(verifyCode, email);

    if (verifyType === 'register') {
      await TempUser.findOneAndUpdate(
        { email: email },
        { verifyCode: verifyCode, verifyExpiry: verifyExpiry },
      );
    }

    if (verifyType === 'forgot-password') {
      await User.findOneAndUpdate(
        { email: email },
        { verifyCode: verifyCode, verifyExpiry: verifyExpiry },
      );
    }
    // set cookies
    cookiesStore.set('verifyEmail', email, {
      expires: new Date(verifyExpiry),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    cookiesStore.set('expiry', verifyExpiry.toString(), {
      expires: new Date(verifyExpiry),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return {
      success: true,
      message:
        'A verification code has been send to your email. Please check your inbox.',
      verifyExpiry: verifyExpiry,
      email: email,
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again.',
    };
  }
};

// ================= change passwd ===================
export const changePassword = async (prevData, formData) => {
  // old
  // const prev = prevData;
  // const cookiesStore = await cookies();

  // new
  const cookiesStore = await cookies();

  const email = formData.get('email');
  const newPassword = formData.get('newpassword');
  const confirmpassword = formData.get('confirmpassword');

  try {
    await connectdb();

    if (!email) {
      return {
        success: false,
        message: 'Session expire! Please try again later',
      };
    }

    // validation
    if (!newPassword || !confirmpassword) {
      return {
        success: false,
        message: 'Please fill in all required fields!',
      };
    }

    // password check
    if (newPassword !== confirmpassword) {
      return {
        success: false,
        message: "Password don't match",
      };
    }

    const existsUser = await User.findOne({ email: email });
    if (!existsUser) {
      return {
        success: false,
        message: 'User not found! Please try again later',
      };
    }

    if (!existsUser.resetPasswordVerified) {
      return {
        success: false,
        message: 'Please verify your email to continue.',
      };
    }
    await User.findOneAndUpdate(
      { email: email },
      { password: await bcrypt.hash(newPassword, 10) },
    );
    cookiesStore.delete('resetVerifyEmail');

    return {
      success: true,
      message:
        'Password changed successfully. Please login with your new password..',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Something went wrong! Please try again.',
    };
  }
};
