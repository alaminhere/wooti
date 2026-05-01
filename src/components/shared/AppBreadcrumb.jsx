'use client';

import Link from 'next/link';
import { ChevronRight, House } from 'lucide-react';

const AppBreadcrumb = ({ items }) => {
  return (
    <div className="flex items-center gap-1 text-sm text-grey">
      <Link
        href="/"
        className="text-darkGrey hover:text-black transition-colors flex justify-center items-center gap-1 "
      >
        <House size={13} /> Home
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <ChevronRight size={14} />
          {index === items?.length - 1 ? (
            <span className="text-black font-medium">{item?.title}</span>
          ) : (
            <Link href={item?.href} className="text-darkGrey transition-colors">
              {item?.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppBreadcrumb;
