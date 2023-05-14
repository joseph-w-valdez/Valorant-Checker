import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import FullAgentPortrait from '../components/FullAgentPortrait';

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
      <FullAgentPortrait agent={agent} />
      <FlexBasisFull />
      <div className='w-96 text-left'>
        <p>{agent.description}</p>
      </div>
      <FlexBasisFull />
      <div className='mt-4 flex flex-wrap'>
        {agent.abilities?.map((ability, index) => (
            <div key={index} className='w-1/2 flex flex-wrap justify-center cursor-pointer'>
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
