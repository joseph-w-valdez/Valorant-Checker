import { useEffect, useState } from 'react';
import { Location } from 'react-router-dom';
import { debounce } from 'lodash';

type UseSearchValueProps = {
  searchParam: string;
  navigate: Function;
  location: Location;
};

export function useSearchValue({ searchParam, navigate, location }: UseSearchValueProps) {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchParam) {
      setSearchValue(searchParam);
    }
  }, [searchParam]);

  const debouncedHandleSearchSubmit = debounce((newSearchValue: string) => {
    setSearchValue(newSearchValue);
  }, 40);

  const handleSearchSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    debouncedHandleSearchSubmit(newSearchValue);
    navigate(`${location.pathname}?page=1${newSearchValue ? `&search=${newSearchValue}` : ''}`);
  };

  return {
    searchValue,
    handleSearchSubmit,
  };
}
