import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';

const IndividualAgent = () => {
  const location = useLocation();
  const agent = location.state.data;
  console.log('agent data', agent);


  return (
    <div className='mt-4'>
    <Header text={agent.displayName}/>
    <FlexBasisFull />
    <div className='flex flex-wrap items-center justify-center'>
      <h3>{agent.role.displayName}</h3>
      <div className='w-6 ml-2'>
        <img src={agent.role.displayIcon} alt={agent.role.displayName} className='object-contain w-full'/>
      </div>
      <FlexBasisFull />
      <h4 className='mt-2'>{`Codename: ${agent.developerName}`}</h4>
      <FlexBasisFull />
      <div className='relative w-[700px] h-[700px]'>
        <div className='w-[500px] absolute'>
          <img src={agent.background} alt={`${agent.displayName} background`} />
        </div>
        <div className='w-[600px] absolute top-[80px] left-[-40px]'>
          <img src={agent.fullPortraitV2} alt={`${agent.displayName} portrait`} className='object-contain w-full' />
        </div>
      </div>
      <FlexBasisFull />
      <div className='w-96 text-left'>
        <p>{agent.description}</p>
      </div>
      <FlexBasisFull />
      <div className='mt-4 flex flex-wrap'>
        {agent.abilities?.map((ability, index) => (
            <div key={index} className='w-1/2 flex flex-wrap justify-center'>
              <h4 className='w-full'>{ability.displayName}</h4>
              <img src={ability.displayIcon} alt={ability.displayName} className='object-contain w-28' />
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};

export default IndividualAgent;
