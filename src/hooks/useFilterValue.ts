import { useEffect, useState } from 'react';

type UseFilterValueProps = {
  searchParam: string;
  navigate: Function;
  location: Location;
};

export function useFilterValue({ searchParam, navigate, location }: UseFilterValueProps) {
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (searchParam) {
      setFilterValue(searchParam);
    }
  }, [searchParam]);

  const handleFilterSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterValue = event.target.value;
    setFilterValue(newFilterValue);
    navigate(`${location.pathname}?page=1${newFilterValue ? `&search=${newFilterValue}` : ''}`);
  };

  return {
    filterValue,
    handleFilterSubmit,
  };
}
