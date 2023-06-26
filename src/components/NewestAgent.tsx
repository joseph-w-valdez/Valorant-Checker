import React from 'react';
import { useNavigate } from 'react-router-dom';

export type NewestAgentProps = {
  displayName: string;
  killfeedPortrait: string;
  role: any;
};

const NewestAgent: React.FC<NewestAgentProps> = ({
  displayName, killfeedPortrait, role,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <button
        className='flex flex-wrap w-96 mx-10 my-4 border border-2 rounded hover:bg-white hover:bg-opacity-25'
        onClick={()=>navigate(`/agent/${displayName}`)}
      >
        <h1 className='w-full text-2xl'>Newest Agent!</h1>
        <h2 className='w-full text-lg bg-white text-black'>{displayName} - {role.displayName}</h2>
        <div className='flex items-center my-2'>
          <div className='w-[200px]'>
            <img src={killfeedPortrait} alt={`${displayName} Portrait`} className='object-contain'/>
          </div>
          <p>Click here to learn more!</p>
        </div>
      </button>
    </>
  );
};

export default NewestAgent;
