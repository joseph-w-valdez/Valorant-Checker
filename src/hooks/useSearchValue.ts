import { useEffect, useState } from 'react';

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

  const handleSearchSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
    navigate(`${location.pathname}?page=1${newSearchValue ? `&search=${newSearchValue}` : ''}`);
  };

  return {
    searchValue,
    handleSearchSubmit,
  };
}
