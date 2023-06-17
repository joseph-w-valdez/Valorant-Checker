import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import { fetchSprays } from '../utilities/fetchSprays';
import DataTable from '../components/DataTable';
import BackButton from '../components/BackButton';
import { alphabetizeArray } from '../utilities/arrayManipulations';

type Spray = {
  displayName: string;
};

const SpraysList: React.FC = () => {
  const [sprays, setSprays] = useState<Spray[]>([]);

  useEffect(() => {
    const fetchSpraysData = async () => {
      try {
        const data = await fetchSprays();
        const sortedSprays = alphabetizeArray(data.data);
        setSprays(sortedSprays);
      } catch (error) {
        console.error(error);
        setSprays([]);
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
      <FlexBasisFull />
      <DataTable data={sprays} selectedOption='' dataType='sprays' />
    </>
  );
};

export default SpraysList;
