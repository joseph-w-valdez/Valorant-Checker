import React from 'react';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import { fetchSprays } from '../utilities/fetchSprays';
import DataTable from '../components/DataTable';
import Subheader from '../components/Subheader';
import useFetchRequest from '../hooks/useFetchRequest'

const SpraysList: React.FC = () => {
  const sprays = useFetchRequest(fetchSprays, '');

  return (
    <>
      <div className='flex items-center justify-center'>
        <Header text='Sprays' />
      </div>
      {sprays && (<>
        <FlexBasisFull />
        <Subheader text={`There are currently ${sprays.length} sprays!`} />
      </>)}
      <FlexBasisFull />
      <DataTable data={sprays} selectedOption='' dataType='sprays' />
    </>
  );
};

export default SpraysList;
