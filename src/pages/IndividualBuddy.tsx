import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import FlexBasisFull from '../components/FlexBasisFull';
import Header from '../components/Header';
import { useFetchObject } from '../hooks/useFetchRequest';
import { fetchBuddy } from '../utilities/fetchBuddies';

const IndividualBuddy = () => {
  const { buddyName } = useParams();
  const buddyData = useFetchObject(fetchBuddy, buddyName)

  if (!buddyData) {
    return null; // Don't try to render content until the fetch has completed
  }

  return (
    <>
      <div>
        <div className='flex items-center justify-center'>
          <BackButton />
          <Header text={buddyData.displayName} />
        </div>
        <FlexBasisFull />
        <div className="flex flex-wrap items-center justify-center">
          <div className={`w-[128px] my-8 `}>
            <img src={buddyData.displayIcon} alt={buddyData.displayName} className='object-contain w-full' />
          </div>
        </div>
        <FlexBasisFull />
      </div>
      <FlexBasisFull />
    </>
  );
};

export default IndividualBuddy;
