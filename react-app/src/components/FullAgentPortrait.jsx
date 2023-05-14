import React from 'react';

const FullAgentPortrait = ({ agent }) => {

  return (
    <div className='relative w-[700px] h-[700px] overflow-hidden'>
      <div className='w-[500px] absolute overflow-hidden left-[120px]'>
        <img src={agent.background} alt={`${agent.displayName} background`} className='object-contain'/>
      </div>
      <div className='w-[600px] absolute top-[80px] left-[75px] overflow-hidden'>
        <img src={agent.fullPortraitV2} alt={`${agent.displayName} portrait`} className='object-contain w-full' />
      </div>
    </div>
  );
};

export default FullAgentPortrait;
