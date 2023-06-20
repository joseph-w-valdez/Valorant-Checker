import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import { fetchSprays } from '../utilities/fetchSprays';
import DataTable from '../components/DataTable';
import BackButton from '../components/BackButton';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import Subheader from '../components/Subheader';
import { useLoadingContext } from '../contexts/LoadingContext';

type Spray = {
  displayName: string;
};

const SpraysList: React.FC = () => {
  const [sprays, setSprays] = useState<Spray[]>([]);
  const { isLoading, setIsLoading } = useLoadingContext();

  useEffect(() => {
    const fetchSpraysData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchSprays();
        const sortedSprays = alphabetizeArray(data.data);
        setSprays(sortedSprays);
      } catch (error) {
        console.error(error);
        setSprays([]);
      } finally {
        setIsLoading(false)
      }
    };

    fetchSpraysData();
  }, []);

  return (
    <>
      <div className='flex items-center justify-center'>
        <BackButton />
        <Header text='Sprays' />
      </div>
      {!isLoading && (<>
        <FlexBasisFull />
        <Subheader text={`There are currently ${sprays.length} sprays in game!`} />
      </>)}
      <FlexBasisFull />
      <DataTable data={sprays} selectedOption='' dataType='sprays' />
    </>
  );
};

export default SpraysList;
