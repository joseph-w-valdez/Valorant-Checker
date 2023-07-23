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
    const newSearchValue = event.target.value;
    debouncedHandleSearchSubmit(newSearchValue);
    router.push({
      pathname: router.pathname,
      query: {
        page: '1',
        search: newSearchValue || undefined,
      },
    });
  };

  return {
    searchValue,
    handleSearchSubmit,
  };
}
