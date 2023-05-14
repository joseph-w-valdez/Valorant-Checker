import React from 'react';

const FullAgentPortrait = ({ agent }) => {
  return (
    <div className='relative w-[700px] h-[700px]'>
      <div className='w-[500px] absolute'>
        <img src={agent.background} alt={`${agent.displayName} background`} />
      </div>
      <div className='w-[600px] absolute top-[80px] left-[-40px]'>
        <img src={agent.fullPortraitV2} alt={`${agent.displayName} portrait`} className='object-contain w-full' />
      </div>
    </div>
  );
};

export default FullAgentPortrait;
