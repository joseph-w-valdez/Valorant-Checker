import React from 'react';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import { useFetchObject } from '../hooks/useFetchRequest';
import { fetchNewestAgent } from '../utilities/fetchAgents';
import NewestAgent, { NewestAgentProps } from '../components/NewestAgent';

const Homepage: React.FC = () => {
  const newestAgent = useFetchObject(fetchNewestAgent);

  if (!newestAgent) return null;

  const { displayName, killfeedPortrait, role } = newestAgent as NewestAgentProps;

  return (
    <>
      <div className='flex flex-wrap items-center justify-center'>
        <Header text='Welcome!' />
      </div>
      <FlexBasisFull />
      <div className="basis-full"></div>
      <div className="logo-frame w-96 mx-10">
        <img src="../assets/images/valorant-logo.webp" alt="Valorant Logo" />
      </div>
      <FlexBasisFull />
      <NewestAgent displayName={displayName} killfeedPortrait={killfeedPortrait} role={role} />
    </>
  );
};

export default Homepage;
