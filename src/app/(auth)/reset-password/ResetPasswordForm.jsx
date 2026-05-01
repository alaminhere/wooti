'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { changePassword } from '@/actions/authActions';
import { handleActionAlert } from '@/libs/handleAlert';
import { useActionState, useEffect, useState } from 'react';

const ResetPasswordForm = ({ email }) => {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, formAction, pending] = useActionState(changePassword, null);
  const route = useRouter();

  useEffect(() => {
    if (!state) return;
    handleActionAlert(state.success, state.message);
    if (state.success) {
      route.push('/');
    }
  }, [route, state]);

  return (
    <form action={formAction}>
      <div className="w-full flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="newpassword">New Password</Label>
          <div className="relative">
            <Input
              id="newpassword"
              name="newpassword"
              type={showNew ? 'text' : 'password'}
              placeholder="••••••••"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-grey transition-colors"
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-grey transition-colors"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <input className="hidden" name="email" value={email} readOnly />
        <Button
          type="submit"
          disabled={pending}
          className="w-full bg-yellow text-whiteCustom uppercase mt-2"
        >
          {pending ? 'Loading...' : 'Reset Password'}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
