import React from 'react';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import { useFetchObject } from '../hooks/useFetchRequest';
import { fetchNewestAgent } from '../utilities/fetchAgents';
import NewestAgent, { NewestAgentProps } from '../components/NewestAgent';
import Carousel from '../components/Carousel';

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
      <Carousel />
      <FlexBasisFull />
      <NewestAgent displayName={displayName} killfeedPortrait={killfeedPortrait} role={role} />
    </>
  );
};

export default Homepage;
