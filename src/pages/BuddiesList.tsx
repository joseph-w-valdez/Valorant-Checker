import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import { fetchBuddies } from '../utilities/fetchBuddies';
import DataTable from '../components/DataTable';
import BackButton from '../components/BackButton';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import Subheader from '../components/Subheader';

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
      <div className='flex flex-wrap items-center justify-center'>
        <BackButton />
        <Header text='Buddies' />
      </div>
      <FlexBasisFull />
      <Subheader text={`There are currently ${buddies.length} buddies in game!`} />
      <FlexBasisFull />
      <DataTable data={buddies} selectedOption='' dataType='buddies' />
    </>
  );
};

export default BuddiesList;
