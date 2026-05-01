'use client';

import Image from 'next/image';
import { useActionState, useEffect, useState } from 'react';

import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { handleActionAlert } from '@/libs/handleAlert';
import { submitCategory } from '@/actions/categoryAction';

const style = {
  label: 'text-[10px] font-semibold uppercase tracking-wide text-grey mb-1',
  imageBox:
    'w-25 h-25 relative overflow-hidden rounded-md border border-gray-200',
};

const CategoryForm = () => {
  const [prevURl, setPrevURl] = useState(null);
  const [state, formAction, pending] = useActionState(submitCategory, null);

  // handle prev url set
  const handleChenge = e => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPrevURl(url);
  };

  // remove image url
  const removeImage = e => {
    e.preventDefault();
    setPrevURl(null);
  };

  // response
  useEffect(() => {
    const res = () => {
      if (!state) return;
      handleActionAlert(state?.success, state?.message);
      setPrevURl(null);
    };
    res();
  }, [state]);

  // remove createObjectURL
  useEffect(() => {
    return () => URL.revokeObjectURL(prevURl);
  }, [prevURl]);

  return (
    <form
      action={formAction}
      className="space-y-5 max-w-2xl border border-gray-200 rounded-md p-5"
    >
      <p className={style.label}>Basic info</p>

      <Input required placeholder="title" name="title" />

      <div className="space-y-3 w-fit">
        <p className={style.label}>Product images</p>
        <div className="grid grid-cols-2 gap-3">
          {prevURl ? (
            <div className={style.imageBox}>
              <Image
                src={prevURl}
                alt="img"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
              <button
                onClick={e => removeImage(e)}
                className="p-1 rounded-full w-fit h-fit bg-yellow/30 cursor-pointer absolute top-0.5 right-0.5"
              >
                <X className="" size={12} />
              </button>
            </div>
          ) : (
            <label
              htmlFor="file"
              className="w-25 h-25 border-2 border-dashed  border-gray-200
            rounded-md flex justify-center items-center cursor-pointer"
            >
              <Plus className="text-gray-400 cursor-pointer " />
            </label>
          )}

          <input
            onChange={e => handleChenge(e)}
            type="file"
            name="file"
            id="file"
            className="hidden"
          />
        </div>
      </div>

      <Button disabled={pending} type="submit" className={'bg-yellow px-5'}>
        {pending ? 'Loading...' : 'Submit Category'}
      </Button>
    </form>
  );
};

export default CategoryForm;
