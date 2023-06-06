import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FlexBasisFull from '../components/FlexBasisFull';
import Header from '../components/Header';
import FullAgentPortrait from '../components/FullAgentPortrait';
import BackButton from '../components/BackButton';
import { normalizeAbilitySlot, onlyLettersAndNumbers } from '../utilities/stringConversions';
import { fetchAgent } from '../utilities/FetchAgents';

const IndividualAbility = () => {
  const { agentName, abilityName } = useParams();
  const [agentData, setAgentData] = useState(null);

  useEffect(() => {
    const getAgentData = async () => {
      const agentData = await fetchAgent(agentName);
      setAgentData(agentData);
    };

    getAgentData();
  }, [agentName]);

  if (!agentData) {
    return null; // Render a loading state or an error message
  }

  const abilityData = agentData.abilities.find(
    (ability) =>
      onlyLettersAndNumbers(ability.displayName.toLowerCase()) === onlyLettersAndNumbers(abilityName.toLowerCase())
  );

  const iconSrc = abilityData.slot === 'Passive' ? agentData.displayIcon : abilityData.displayIcon;

  if (!abilityData) {
    return null; // Render an error message or handle the case where the ability is not found
  }

  return (
    <div className='flex flex-wrap justify-center items-center'>
      <div className='flex flex-wrap justify-center items-center'>
        <BackButton />
        <Header text={abilityData.displayName} />
        <FlexBasisFull />
        <h3 className='mt-[-16px] text-lg sm:3xl'>({normalizeAbilitySlot(abilityData.slot)})</h3>
      </div>
      <FlexBasisFull />
      <div className='flex flex-wrap justify-center items-center position relative top-[50px]'>
        <div className='w-full max-w-[80vw] sm:w-1/3 flex flex-wrap justify-center'>
          <FullAgentPortrait agent={agentData} />
        </div>
        <div className='w-full max-w-[80vw] sm:w-1/2 flex flex-wrap justify-center items-center'>
          <div className='w-[150px] sm:w-[200px] h-fit mb-10'>
            <img src={iconSrc} alt={abilityData.description} className='object-contain w-full' />
          </div>
          <div className='w-full flex justify-center'>
            <p className='w-[400px]'>{abilityData.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualAbility;
