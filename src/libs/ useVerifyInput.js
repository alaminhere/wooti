'use client';

import { useRef, useState } from 'react';

const useVerifyInput = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputref = useRef([]);

  // set otp and focus next
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    if (value && index < otp.length - 1) {
      inputref.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputref.current[index - 1]?.focus();
    }
  };

  return { otp, setOtp, inputref, handleChange, handleKeyDown };
};

export default useVerifyInput;
