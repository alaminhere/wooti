'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const RadioFilter = ({ className, category }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();

  const handleFilter = slug => {
    const params = new URLSearchParams(searchParams);
    params.set('category', slug);
    params.set('page', '1');
    route.push(`${pathname}?${params}`);
  };

  const handleRemoveFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    route.push(`${pathname}?${params}`);
  };

  return (
    <>
      <p className="px-5 py-2 bg-paleGrey text-deefBlack uppercase font-medium text-[16px]">
        Category
      </p>
      <div className={`flex flex-col gap-3 ${className}`}>
        {category?.map(item => (
          <label
            key={item._id}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onClick={() => handleFilter(item?.slug)}
              type="radio"
              name="category"
              value={item.title}
              className="peer sr-only"
            />
            <div className="w-5 h-5 rounded-full border-2 border-darkGrey/20 peer-checked:border-yellow flex items-center justify-center shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow opacity-100 peer-checked:opacity-100" />
            </div>
            <span className="text-sm text-grey line-clamp-1">{item.title}</span>
          </label>
        ))}
      </div>
      {searchParams?.get('category') && (
        <Button
          onClick={() => handleRemoveFilter()}
          className={'mt-4 rounded-none w-full py-1 bg-yellow'}
        >
          {' '}
          Clear filter
        </Button>
      )}
    </>
  );
};

export default RadioFilter;
