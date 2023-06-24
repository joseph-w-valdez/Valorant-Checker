import { useEffect } from 'react';

export const usePageNavigation = (
  totalPages: number,
  parsedPage: number,
  currentPage: number,
  searchParam: string,
  navigate: (to: string) => void,
  setCurrentPage: (page: number) => void,
  pageSize: number,
  filterValue: string
) => {
  useEffect(() => {
    if (totalPages > 1) {
      if (parsedPage < 1) {
        setCurrentPage(1);
        navigate(`?page=1${searchParam ? `&search=${searchParam}` : ''}`);
      } else if (parsedPage > totalPages) {
        setCurrentPage(totalPages);
      } else {
        setCurrentPage(parsedPage);
      }
    } else {
      setCurrentPage(1);
    }
  }, [totalPages, parsedPage, navigate, setCurrentPage, searchParam]);

  useEffect(() => {
    navigate(`?page=${currentPage}${searchParam ? `&search=${searchParam}` : ''}`);
  }, [currentPage, searchParam, navigate]);

  useEffect(() => {
    if (filterValue !== searchParam) {
      setCurrentPage(1);
    }
  }, [filterValue, searchParam, setCurrentPage]);
};
