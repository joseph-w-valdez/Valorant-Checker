import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import { fetchBuddies } from '../utilities/FetchBuddies';
import DataTable from '../components/DataTable';
import BackButton from '../components/BackButton';
import { alphabetizeArray } from '../utilities/arrayManipulations';

type Buddy = {
  displayName: string;
};

const BuddiesList: React.FC = () => {
  const [buddies, setBuddies] = useState<Buddy[]>([]);

  useEffect(() => {
    const fetchBuddiesData = async () => {
      try {
        const data = await fetchBuddies();
        const sortedBuddies = alphabetizeArray(data.data);
        setBuddies(sortedBuddies);
      } catch (error) {
        console.error(error);
        setBuddies([]);
      }
    };

    fetchBuddiesData();
  }, []);

  return (
    <>
      <div className='flex items-center justify-center'>
        <BackButton />
        <Header text='Buddies' />
      </div>
      <FlexBasisFull />
      <DataTable data={buddies} selectedOption='' dataType='buddies' />
    </>
  );
};

export default BuddiesList;
