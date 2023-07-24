import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const usePageNavigation = (
  filteredDataLength: number,
  pageSize: number,
  searchValue: string,
) => {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams  = useSearchParams();
  const searchParam = searchParams.get('query')
  const pageParam = searchParams.get('page')
  const [currentPage, setCurrentPage] = useState(1);
  const [desiredPage, setDesiredPage] = useState(1);

  useEffect(() => {
    const totalPages = Math.ceil(filteredDataLength / pageSize);
    const parsedPage = pageParam ? parseInt(pageParam as string, 10) : 1;
    if (parsedPage !== currentPage) {
      setDesiredPage(parsedPage);
    }
    if (totalPages > 1) {
      if (desiredPage < 1) {
        setCurrentPage(1);
        router.push(
          `${pathname}?page=1${searchValue ? `&search=${searchValue}` : ''}`,
          undefined,
          { shallow: true }
        );
      } else if (desiredPage > totalPages) {
        setCurrentPage(totalPages);
      } else {
        setCurrentPage(desiredPage);
        router.push(
          `${pathname}?page=${desiredPage}${searchValue ? `&search=${searchValue}` : ''}`,
          undefined,
          { shallow: true }
        );
      }
    } else {
      setCurrentPage(1);
      router.push(
        `${pathname}?page=1${searchValue ? `&search=${searchValue}` : ''}`,
        undefined,
        { shallow: true }
      );
    }
  }, [pathname, pageParam, router, filteredDataLength, pageSize, searchValue]);

  return {
    currentPage,
    setCurrentPage,
    setDesiredPage,
  };
};
