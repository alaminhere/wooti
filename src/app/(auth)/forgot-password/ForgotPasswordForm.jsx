'use client';

import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { handleActionAlert } from '@/libs/handleAlert';
import { forgotPassword } from '@/actions/authActions';
import React, { useActionState, useEffect } from 'react';

const ForgotPasswordForm = () => {
  const [state, formAction, pending] = useActionState(forgotPassword, null);
  const route = useRouter();

  useEffect(() => {
    if (!state) return;
    handleActionAlert(state.success, state.message);

    if (state.success) {
      route.push('/verification?type=forgot-password');
    }
  }, [route, state]);

  return (
    <form action={formAction}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="example@gmail.com"
        />
      </div>

      <Button
        disabled={pending}
        type="submit"
        className="mt-6 w-full bg-yellow text-whiteCustom uppercase"
      >
        {pending ? 'loading...' : 'Send Code'}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
