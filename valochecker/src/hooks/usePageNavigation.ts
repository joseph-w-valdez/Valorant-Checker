import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const usePageNavigation = (
  filteredDataLength: number,
  pageSize: number,
  searchValue: string,
) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const [currentPage, setCurrentPage] = useState(1);
  const [desiredPage, setDesiredPage] = useState(1);

  useEffect(() => {
    const totalPages = Math.ceil(filteredDataLength / pageSize);
    const parsedPage = pageParam ? parseInt(pageParam, 10) : 1;
    if (parsedPage !== currentPage) {
      setDesiredPage(parsedPage);
    }
    if (totalPages > 1) {
      if (desiredPage < 1) {
        setCurrentPage(1);
        navigate(`${location.pathname}?page=1${searchValue ? `&search=${searchValue}` : ''}`);
      } else if (desiredPage > totalPages) {
        setCurrentPage(totalPages);
      } else {
        setCurrentPage(desiredPage);
        navigate(`${location.pathname}?page=${desiredPage}${searchValue ? `&search=${searchValue}` : ''}`);
      }
    } else {
      setCurrentPage(1);
      navigate(`${location.pathname}?page=1${searchValue ? `&search=${searchValue}` : ''}`);
    }
  }, [location.pathname, pageParam, navigate, filteredDataLength, pageSize, searchValue]);

  return {
    currentPage,
    setCurrentPage,
    setDesiredPage,
  };
};
