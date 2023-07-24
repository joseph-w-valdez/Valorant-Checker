import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

type UseSearchValueProps = {
  searchParam: string;
};

export function useSearchValue({ searchParam }: UseSearchValueProps) {
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
    const router = useRouter();
    const newSearchValue = event.target.value.trim(); // Trim the search value to remove leading/trailing spaces
    debouncedHandleSearchSubmit(newSearchValue);

    // Remove the search query parameter from the URL if the new search value is empty
    const query = newSearchValue ? { page: '1', search: newSearchValue } : { page: '1' };
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return {
    searchValue,
    handleSearchSubmit,
  };
}
