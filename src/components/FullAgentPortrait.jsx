import React from 'react';

const FullAgentPortrait = ({ agent }) => {

  return (
    <div className='relative w-[700px] h-[600px] overflow-hidden transform scale-100 lg:scale-125 mr-[10px]'>
      <div className='w-[400px] absolute overflow-hidden left-[-50px] top-[-34px]'>
        <img src={agent.background} alt={`${agent.displayName} background`} className='object-contain'/>
      </div>
      <div className='w-[600px] absolute top-[8px] left-[-134px] overflow-hidden'>
        <img src={agent.fullPortraitV2} alt={`${agent.displayName} portrait`} className='object-contain w-full' />
      </div>
    </div>
  );
};

export default FullAgentPortrait;
