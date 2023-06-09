import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import FullAgentPortrait from '../components/FullAgentPortrait';
import BackButton from '../components/BackButton';
import { normalizeAbilitySlot, onlyLettersAndNumbers } from '../utilities/stringConversions';
import { fetchAgent } from '../utilities/FetchAgents';
import { LoadingContext } from '../contexts/LoadingContext';

const IndividualAgent = ({ setSelectedOption }) => {
  const navigate = useNavigate();
  const { agentName } = useParams();
  const { setIsLoading } = useContext(LoadingContext);
  const [agentData, setAgentData] = useState(null);

  const handleRoleClick = (role) => {
    setSelectedOption(role.displayName);
    navigate('/agents-list');
  };

  const handleAbilityClick = (ability) => {
    const abilityName = onlyLettersAndNumbers(ability.displayName);
    navigate(`/agent/${agentName}/${abilityName}`);
  };

  useEffect(() => {
    const getAgentData = async () => {
      try {
        setIsLoading(true);
        const agentData = await fetchAgent(agentName);
        setAgentData(agentData);
        if (agentData === null) {
          navigate('/not-found');
        };
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    };

    getAgentData();
  }, [agentName, setIsLoading]);

  if (!agentData) {
    return null; // Don't try to render content, if it's empty
  }

  return (
    <>
      <div className='flex items-center'>
        <BackButton />
        <Header text={agentData.displayName} />
      </div>
      <FlexBasisFull />
      <div className='flex flex-wrap justify-center mt-[-16px]'>
        <div
          className='flex flex-wrap items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-25 p-1'
          onClick={() => handleRoleClick(agentData.role)}
        >
          <h3 className='text-lg sm:3xl'>{agentData.role.displayName}</h3>
          <div className='w-6 ml-2'>
            <img
              src={agentData.role.displayIcon}
              alt={agentData.role.displayName}
              className='object-contain w-full'
            />
          </div>
        </div>
        <FlexBasisFull />
        <h4 className='mt-2'>{`Codename: ${agentData.developerName}`}</h4>
        <FlexBasisFull />
        <div className='flex flex-wrap justify-center items-center relative top-[75px]'>
          <div className='w-full max-w-[80vw] sm:w-1/3 flex flex-wrap justify-center mb-10'>
            <FullAgentPortrait agent={agentData} />
          </div>
          <div className='w-full max-w-[80vw] sm:w-1/2 flex flex-wrap justify-center'>
            <div className='w-full max-w-[100vw] text-left mb-4'>
              <p>{agentData.description}</p>
            </div>
            <FlexBasisFull />
            <div className='mt-4 flex flex-wrap'>
              {agentData.abilities?.map((ability, index) => (
                <div
                  key={index}
                  className='w-1/2 p-2 flex flex-wrap justify-center cursor-pointer mb-6 hover:scale-125'
                  onClick={() => handleAbilityClick(ability)}
                >
                  <h4 className='w-full'>{ability.displayName} ({normalizeAbilitySlot(ability.slot)})</h4>
                  {ability.slot === 'Passive' ? (
                    <img
                      src={agentData.displayIcon}
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
