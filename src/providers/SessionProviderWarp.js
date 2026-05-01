'use client'

import { SessionProvider } from 'next-auth/react';

const SessionProviderWarp = ({ children }) => {
  return <SessionProvider>{children} </SessionProvider>;
};

export default SessionProviderWarp;
