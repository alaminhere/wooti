import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        ' w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-sm transition-colors outline-none  placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-yellow',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
