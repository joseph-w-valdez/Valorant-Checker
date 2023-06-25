import { useState, useEffect } from 'react';
import { useLoadingContext } from '../contexts/LoadingContext';

export const useFetchArray = (fetchFunction: (option: string) => Promise<any[]>, selectedOption: string) => {
  const { setIsLoading } = useLoadingContext();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchFunction(selectedOption);
        setData(fetchedData);
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        // Delay before setting isLoading to false to reduce visual bugs
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    fetchData();
  }, [selectedOption, setIsLoading, fetchFunction]);

  return data;
};

export const useFetchObject = (fetchFunction: (arg: string) => Promise<any | null>, arg: string) => {
  const { setIsLoading } = useLoadingContext();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await fetchFunction(arg);
        setData(fetchedData);
      } catch (error) {
        console.error(error);
        setData(null);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    fetchData();
  }, [arg, setIsLoading, fetchFunction]);

  return data;
};
