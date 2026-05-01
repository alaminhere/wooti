'use client';

import { useActionState, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { changePasswordWithCurrentPassword } from '@/actions/profileAction';
import { handleActionAlert } from '@/libs/handleAlert';

const ChangePassword = () => {
  const [state, formAction, padding] = useActionState(
    changePasswordWithCurrentPassword,
    null,
  );
  useEffect(() => {
    if (!state) return;
    handleActionAlert(state.success, state.message);
  }, [state]);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <div className="bg-whiteCustom border border-gray-200 rounded-xl p-5">
      <p className="text-sm font-semibold text-deefBlack mb-4">
        Change password
      </p>

      <form action={formAction} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current password</Label>
          <div className="relative">
            <Input
              required
              id="currentPassword"
              name="currentPassword"
              type={showCurrent ? 'text' : 'password'}
              placeholder="••••••••"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-grey"
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <div className="relative">
            <Input
              required
              id="newPassword"
              name="newPassword"
              type={showNew ? 'text' : 'password'}
              placeholder="••••••••"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-grey"
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <div className="relative">
            <Input
              required
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="••••••••"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-grey"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="bg-yellow text-white w-fit px-5 uppercase  mt-1"
        >
          Update password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
