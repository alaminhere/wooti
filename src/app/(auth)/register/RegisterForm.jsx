'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { registerUser } from '@/actions/authActions';
import { handleActionAlert } from '@/libs/handleAlert';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const RegisterForm = ({ callbackUrl }) => {
  const route = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, formAction, pending] = useActionState(registerUser, null);
  const callback = callbackUrl || '/dashboard';

  useEffect(() => {
    if (!state) return;
    handleActionAlert(state.success, state.message);

    if (state.success) {
      route.push('/verification?type=register');
    }
  }, [route, state]);

  return (
    <>
      <form action={formAction}>
        <div className="w-full flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input name="name" id="name" placeholder="Jon Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-grey hover:text-black transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmpassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmpassword"
                name="confirmpassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-grey hover:text-black transition-colors"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            disabled={pending}
            type="submit"
            className="w-full bg-yellow text-white uppercase mt-2"
          >
            {pending ? 'loading. . .' : 'Create Account'}
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
      <p className="text-center text-sm text-grey">
        Already have an account?{' '}
        <Link href="/login" className="text-yellow hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
