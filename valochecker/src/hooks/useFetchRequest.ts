import { useState, useEffect } from 'react';
import { useLoadingContext } from '@/contexts/LoadingContext';
import { useRouter } from 'next/navigation'

interface FetchArrayOptions {
  fetchFunction: (option: string) => Promise<any[]>
  selectedOption: string
}

export function useFetchArray({
  fetchFunction,
  selectedOption,
}: FetchArrayOptions) {
  const { setIsLoading } = useLoadingContext();
  const [data, setData] = useState<any[]>([]);
  const router = useRouter()

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
}: FetchObjectOptions) {
  const { setIsLoading } = useLoadingContext();
  const [data, setData] = useState<any | null>(null);
  const router = useRouter()

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
