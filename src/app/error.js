'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({ error, unstable_retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-red-50 p-8 flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center">
            <AlertTriangle size={28} className="text-white" />
          </div>
          <h5>Something went wrong</h5>
          <p className="text-sm text-darkGrey text-center">
            An unexpected error occurred. Please try again.
          </p>
        </div>

        <div className="p-5 flex flex-col gap-3 border-b border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-grey">Error</span>
            <span className="truncate max-w-55">
              {error?.message || 'Unknown error'}
            </span>
          </div>
        </div>

        <div className="p-5 flex gap-3">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">Go To Home</Link>
          </Button>
          <Button onClick={() => unstable_retry()} className="flex-1 bg-yellow">
            Try Again
          </Button>
        </div>
      </div>
    </section>
  );
}
