import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import FullAgentPortrait from '../components/FullAgentPortrait';
import BackButton from '../components/BackButton';
import { normalizeAbilitySlot } from '../utilities/stringConversions';
import { scrollToTop } from '../utilities/scrollToTop';

const IndividualAgent = ({ setSelectedOption }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const agent = location.state.data;

  useEffect(() => {
    scrollToTop();
    console.log('tried to scroll to top')
  }, [location]);

  const handleRoleClick = (role) => {
    setSelectedOption(role.displayName);
    navigate('/agents-list');
  };

  const handleAbilityClick = (ability) => {
    navigate('/individual-ability', {
      state: {
        data: {
          agent: agent,
          ability: ability,
        },
      },
    });
  };

  return (
    <>
      <div className='flex items-center'>
        <BackButton />
        <Header text={agent.displayName} />
      </div>
      <FlexBasisFull />
      <div className='flex flex-wrap justify-center mt-[-16px]'>
        <div
          className='flex flex-wrap items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-25 p-1'
          onClick={() => handleRoleClick(agent.role)}
        >
          <h3 className='text-lg sm:3xl'>{agent.role.displayName}</h3>
          <div className='w-6 ml-2'>
            <img
              src={agent.role.displayIcon}
              alt={agent.role.displayName}
              className='object-contain w-full'
            />
          </div>
        </div>
        <FlexBasisFull />
        <h4 className='mt-2'>{`Codename: ${agent.developerName}`}</h4>
        <FlexBasisFull />
        <div className='flex flex-wrap justify-center items-center'>
          <div className='w-full max-w-[80vw] sm:w-1/3 flex flex-wrap justify-center'>
            <FullAgentPortrait agent={agent} />
          </div>
          <div className='w-full max-w-[80vw] sm:w-1/2 flex flex-wrap justify-center'>
            <div className='w-full max-w-[100vw] sm:w-1/2 text-left mb-4'>
              <p>{agent.description}</p>
            </div>
            <FlexBasisFull />
            <div className='mt-4 flex flex-wrap'>
              {agent.abilities?.map((ability, index) => (
                <div
                  key={index}
                  className='w-1/2 p-2 flex flex-wrap justify-center cursor-pointer mb-6 hover:scale-125'
                  onClick={() => handleAbilityClick(ability)}
                >
                  <h4 className='w-full'>{ability.displayName} ({normalizeAbilitySlot(ability.slot)})</h4>
                  {ability.slot === 'Passive' ? (
                    <img
                      src={agent.displayIcon}
                      alt={ability.displayName}
                      className='object-contain w-28'
                    />
                  ) : (
                    <img
                      src={ability.displayIcon}
                      alt={ability.displayName}
                      className='object-contain w-28'
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualAgent;
