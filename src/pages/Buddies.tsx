import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import { fetchBuddies } from '../utilities/FetchBuddies';

const BuddiesList: React.FC = () => {
  const [buddies, setBuddies] = useState([]);

  useEffect(() => {
    const fetchBuddiesData = async () => {
      try {
        const data = await fetchBuddies();
        setBuddies(data);
      } catch (error) {
        console.error(error);
        setBuddies([]);
      }
    };

    fetchBuddiesData();
  }, []);

  console.log('buddies', buddies);

  return (
    <>
      <Header text={'Buddies'} />
      <FlexBasisFull />
    </>
  );
};

export default BuddiesList;
