import { useState, useEffect } from 'react';
import { useLoadingContext } from '../contexts/LoadingContext';
import { useRouter } from 'next/router';

export const useFetchArray = (fetchFunction: (option: string) => Promise<any[]>, selectedOption: any) => {
  const { setIsLoading } = useLoadingContext();
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();

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
  }, [selectedOption, setIsLoading, fetchFunction, router]);

  return data;
};

export const useFetchObject = (fetchFunction: (option: string) => Promise<any | null>, arg?: any) => {
  const { setIsLoading } = useLoadingContext();
  const [data, setData] = useState<any | null>(null);
  const router = useRouter();

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
  }, [arg, setIsLoading, fetchFunction, router]);

  return data;
};
