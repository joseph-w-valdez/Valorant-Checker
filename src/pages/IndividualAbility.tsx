import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FlexBasisFull from '../components/FlexBasisFull';
import Header from '../components/Header';
import FullAgentPortrait from '../components/FullAgentPortrait';
import BackButton from '../components/BackButton';
import { normalizeAbilitySlot, onlyLettersAndNumbers } from '../utilities/stringConversions';
import { fetchAgent } from '../utilities/fetchAgents';
import { useFetchObject } from '../hooks/useFetchRequest';

const IndividualAbility: React.FC = () => {
  const navigate = useNavigate();
  const { agentName, abilityName } = useParams();
  const agentData = useFetchObject(fetchAgent, agentName);

  if (!agentData) {
    return null; // Don't try to render content until the fetch has completed
  }

  const abilityData = agentData.abilities.find(
    (ability: any) =>
      abilityName &&
      onlyLettersAndNumbers(ability.displayName.toLowerCase()) === onlyLettersAndNumbers(abilityName.toLowerCase())
  );

  const iconSrc = abilityData?.slot === 'Passive' ? agentData.displayIcon : abilityData?.displayIcon;

  if (!abilityData) {
    navigate('/not-found');
    return null; // Don't try to render content until the fetch has completed
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
