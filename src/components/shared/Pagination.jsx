'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AppPagination = ({ totalPage }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();
  const [currentPage, setCurrentPage] = useState();

  const pages = Array.from({ length: totalPage }, (_, index) => index);

  const getPages = () => {
    const page = [];
    const start = Math.max(currentPage - 2, 1);
    const end = Math.min(currentPage + 2, totalPage);
    for (let i = start; i <= end; i++) page.push(i);
    return page;
  };

  const handlePage = value => {
    const params = new URLSearchParams(searchParams);
    params.set('page', value);
    route.push(`${pathname}?${params}`);
  };

  useEffect(() => {
    const defaultPage = () => {
      setCurrentPage(Number(searchParams.get('page') || 1));
    };
    defaultPage();
  }, [searchParams]);

  return (
    <Pagination>
      <PaginationContent>
        {currentPage >= 2 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setCurrentPage(prev => prev - 1);
                handlePage(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}

        {getPages().map((item, index) =>
          item === '...' ? (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationLink
                className={`${item == currentPage ? 'bg-yellow text-whiteCustom hover:bg-yellow' : 'bg-paleGrey'}`}
                isActive={item == currentPage}
                onClick={() => {
                  setCurrentPage(item);
                  handlePage(item);
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {pages?.length > currentPage && (
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setCurrentPage(prev => prev + 1);
                handlePage(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
export default AppPagination;
