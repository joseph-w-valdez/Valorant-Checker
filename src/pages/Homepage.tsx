import React from 'react';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';

const Homepage: React.FC = () => {
  return (
    <>
      <div className='flex flex-wrap items-center justify-center'>
          <Header text='Homepage' />
      </div>
      <FlexBasisFull />
      <div className="basis-full"></div>
      <div className="logo-frame w-96 mx-10"><img src="../assets/images/valorant-logo.webp" alt="Valorant Logo" /></div>
    </>
  );
};

export default Homepage;
