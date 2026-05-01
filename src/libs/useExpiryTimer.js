'use client';

import { useEffect, useState } from 'react';

const useExpiryTimer = expiry => {
  const [expiryTime, setExpiryTime] = useState();

  // expiry timer
  useEffect(() => {
    const interval = setInterval(() => {
      const time = expiry ? new Date(expiry).getTime() : 0;
      const timeCounter = time - Date.now();

      if (timeCounter <= 0) {
        clearInterval(interval);
        return;
      }
      setExpiryTime(timeCounter);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiry]);

  const time = Math.floor((expiryTime || 0) / 1000);
  const minutes = Math.floor(time / 60);
  const minutesFormat = minutes < 10 ? '0' + minutes : minutes;
  const second = Math.floor(time % 60);
  const secondFormat = second < 10 ? '0' + second : second;

  return { minutesFormat, secondFormat };
};

export default useExpiryTimer;
