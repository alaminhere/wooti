'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { handleActionAlert } from '@/libs/handleAlert';
import { useActionState, useEffect, useState } from 'react';

const LoginForm = ({ callbackUrl, error }) => {
  const [show, setShow] = useState(false);
  const route = useRouter();
  const callback = callbackUrl || '/dashboard';

  const logInUser = async (prevData, formData) => {
    const prev = prevData;

    const email = formData.get('email');
    const password = formData.get('password');
    try {
      if (!email || !password) {
        return {
          success: false,
          message: 'Please fill in all required fields!',
        };
      }

      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });

      if (result.ok) {
        return {
          success: true,
          message: 'Login successful',
        };
      } else {
        return {
          success: false,
          message: result.error,
        };
      }
    } catch (err) {
      return {
        success: false,
        message: 'Something went wrong, please try again!!!',
      };
    }
  };
  const [state, formAction, pending] = useActionState(logInUser, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      route.push(callback);
    }
    handleActionAlert(state.success, state.message);
  }, [callback, route, state]);

  const errorMessage = error => {
    switch (error) {
      case 'AccessDenied':
        return 'Access denied! Please try again later.';
      case 'OAuthCallbackError':
        return 'Google sign in failed! Please try again later.';
      default:
        return 'Something went wrong! Please try again later.';
    }
  };

  useEffect(() => {
    if (!error) return;
    if (error) {
      handleActionAlert(false, errorMessage(error));
      route.replace('/login');
    }
  }, [error, route]);

  return (
    <>
      <form action={formAction}>
        <div className="w-full flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              type="email"
              name="email"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-yellow hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                required
                id="password"
                type={show ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-grey transition-colors"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            disabled={pending}
            type="submit"
            className="w-full bg-yellow text-whiteCustom uppercase mt-2"
          >
            {pending ? 'loading...' : 'login'}
          </Button>
        </div>
      </form>

      <Button
        onClick={async () => {
          await signIn('google', {
            callbackUrl: callback,
            redirect: false,
          });
        }}
        variant="outline"
        className="w-full flex items-center gap-2 uppercase"
      >
        <Image
          src={'/images/google.png'}
          alt="cat_Igm"
          width={20}
          height={20}
        />
        Continue with Google
      </Button>
      <p className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-yellow hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
