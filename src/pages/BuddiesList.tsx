import React from 'react';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import { fetchBuddies } from '../utilities/fetchBuddies';
import DataTable from '../components/DataTable';
import Subheader from '../components/Subheader';
import useFetchRequest from '../hooks/useFetchRequest'

const BuddiesList: React.FC = () => {
  const buddies = useFetchRequest(fetchBuddies, '');

  return (
    <>
      <div className='flex flex-wrap items-center justify-center'>
        <Header text='Buddies' />
      </div>
      <FlexBasisFull />
      {buddies && (
        <>
          <Subheader text={`There are currently ${buddies.length} buddies!`} />
          <FlexBasisFull />
        </>
      )}
      <DataTable data={buddies} selectedOption='' dataType='buddies' />
    </>
  );
};

export default BuddiesList;
