import { useState, useEffect } from 'react';
import { useLoadingContext } from '../contexts/LoadingContext';
import { NextRouter } from 'next/router';

interface FetchArrayOptions {
  fetchFunction: (option: string) => Promise<any[]>
  selectedOption: string
}

export function useFetchArray({
  fetchFunction,
  selectedOption,
  router
}: FetchArrayOptions & { router: NextRouter }) {
  const { setIsLoading } = useLoadingContext();
  const [data, setData] = useState<any[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchFunction(selectedOption);
        if (!fetchedData) {
          router.push('/not-found');
        } else {
          setData(fetchedData);
        }
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 150);
      }
    };

    fetchData();
  }, [selectedOption, fetchFunction]);

  return data;
};

interface FetchObjectOptions {
  fetchFunction: (option: string) => Promise<any>
  arg?: any
}

export function useFetchObject({
  fetchFunction,
  arg,
  router
}: FetchObjectOptions & { router: NextRouter }) {
  const { setIsLoading } = useLoadingContext();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchFunction(arg);
        if (!fetchedData) {
          router.push('/not-found');
        } else {
          setData(fetchedData);
        }
      } catch (error) {
        console.error(error);
        setData(null);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 150);
      }
    };

    fetchData();
  }, [arg, fetchFunction]);

  return data;
};
