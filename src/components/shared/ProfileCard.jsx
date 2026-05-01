'use client';

import { useActionState, useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UserAvatar from '@/components/shared/Avatar';
import { useSession } from 'next-auth/react';
import { submitProfile } from '@/actions/profileAction';
import { handleActionAlert } from '@/libs/handleAlert';

const ProfileCard = () => {
  const [state, formAction, pending] = useActionState(submitProfile, null);
  const [prevImageUrl, setPrevImageUrl] = useState();
  const { data: session, update } = useSession();
  const user = session?.user;

  const handleImage = e => {
    const file = e.target.files?.[0];
    const url = URL.createObjectURL(file);
    setPrevImageUrl(url);
  };

  useEffect(() => {
    const submit = async () => {
      if (!state) return;
      handleActionAlert(state?.success, state?.message);
      await update();
    };
    submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5  max-w-xl">
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-5">
          <UserAvatar
            newImage={prevImageUrl}
            className={'w-10 h-10'}
            className2={'bg-yellow/10 text-yellow '}
          />

          <label
            htmlFor="file"
            className="flex items-center gap-2 text-xs font-medium capitalize px-2 py-1.5 border border-gray-200 rounded-md cursor-pointer"
          >
            <Camera size={14} />
            <input
              type="file"
              onChange={e => handleImage(e)}
              name="file"
              id="file"
              className="hidden"
            />
            Change photo
          </label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input required id="name" name="name" placeholder={user?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input required id="email" name="email" placeholder={user?.email} />
        </div>

        <Button
          disabled={pending}
          type="submit"
          className="bg-yellow text-white w-fit px-5 uppercase  mt-1"
        >
          {pending ? 'loading..' : '  Save changes'}
        </Button>
      </form>
    </div>
  );
};

export default ProfileCard;
