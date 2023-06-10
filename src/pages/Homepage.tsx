import React from 'react';
import Header from '../components/Header';

const Homepage: React.FC = () => {
  return (
    <>
      <Header text={'Homepage'} />
      <div className="basis-full"></div>
      <div className="logo-frame w-96 mx-10"><img src="../assets/images/valorant-logo.webp" alt="Valorant Logo" /></div>
    </>
  );
};

export default Homepage;
