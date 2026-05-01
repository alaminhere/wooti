'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import useExpiryTimer from '@/libs/useExpiryTimer';
import useVerifyInput from '@/libs/ useVerifyInput';
import { handleActionAlert } from '@/libs/handleAlert';
import { verification, verifyResend } from '@/actions/authActions';
import React, { useActionState, useEffect, useState } from 'react';

const VerificationForm = ({ type, initialEmail, initialExpiry }) => {
  const [expiry, setExpiry] = useState(initialExpiry);
  const [email, setEmail] = useState(initialEmail);
  const [state, formAction, pending] = useActionState(verification, null);
  const route = useRouter();

  // ========== reusable otp verification input handler hook =====
  const { otp, setOtp, inputref, handleChange, handleKeyDown } =
    useVerifyInput();
  // =========  Reusable expiry countdown timer hook ==========
  const { minutesFormat, secondFormat } = useExpiryTimer(expiry);

  // ======== verification response ===========
  useEffect(() => {
    if (!state) return;

    if (type === 'register') {
      handleActionAlert(state?.success, state?.message);
      const successFn = async () => {
        if (state.success) {
          setOtp(['', '', '', '', '', '']);

          // otp_verified =>  auto login
          const result = await signIn('credentials', {
            email: state.email,
            grant_type: 'otp_verified',
            redirect: false,
          });

          if (!result.ok) {
            handleActionAlert(result.ok, 'login failed, please try again');
          }
          route.push('/dashboard');
        }
      };
      successFn();
    }

    if (type === 'forgot-password') {
      if (state.success) {
        route.push('/reset-password');
      } else {
        handleActionAlert(state.success, state.message);
      }
    }
  }, [route, setOtp, state, type]);

  //========== resend code =============
  const handleResend = async () => {
    const result = await verifyResend(initialEmail, type);

    if (!result) return;
    handleActionAlert(result.success, result.message);

    if (result.success) {
      // set  new email and expiry
      setEmail(result.email);
      setExpiry(result.verifyExpiry);
    }
  };

  return (
    <>
      <form action={formAction}>
        <div className="w-full flex flex-col">
          <div className="flex gap-2 justify-center"></div>
          <div className="flex justify-center gap-2">
            {otp.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                ref={el => (inputref.current[index] = el)}
                maxLength={1}
                onChange={e => handleChange(e, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                className="w-10 h-10 text-lg font-semibold text-yellow
              focus:border-yellow text-center border border-gray-200 rounded-md outline-none "
              />
            ))}
          </div>

          <input className="hidden" value={otp.join('')} name="otp" readOnly />
          <input className="hidden" value={email} name="email" readOnly />
          <input className="hidden" value={type} name="type" readOnly />
          <span className="mb-1 mt-5 text-end text-xs">
            {expiry ? (
              <>
                {minutesFormat}:{secondFormat}
              </>
            ) : (
              <>
                <p className="text-xs text-red-500">session expire</p>
              </>
            )}
          </span>
          <Button
            disabled={pending}
            type="submit"
            className="w-full bg-yellow text-whiteCustom uppercase"
          >
            Verify Code
          </Button>
        </div>
      </form>
      <button
        onClick={() => handleResend()}
        className="mt-3 text-center text-gray-500 text-sm text-grey"
      >
        do not receive code?{' '}
        <span className="text-yellow cursor-pointer hover:underline">
          Resend
        </span>
      </button>
    </>
  );
};

export default VerificationForm;
