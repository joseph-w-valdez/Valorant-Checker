import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FlexBasisFull from '../components/FlexBasisFull';
import Header from '../components/Header';
import FullAgentPortrait from '../components/FullAgentPortrait';
import BackButton from '../components/BackButton';
import { normalizeAbilitySlot } from '../utilities/stringConversions';
import { scrollToTop } from '../utilities/scrollToTop';

const IndividualAbility = () => {
  const location = useLocation();
  const ability = location.state.data.ability;
  console.log(ability)
  const agent = location.state.data.agent;
  const iconSrc = ability.slot === 'Passive' ? agent.displayIcon : ability.displayIcon;

  useEffect(() => {
    scrollToTop();
  }, [location]);

  return (
    <div className='flex flex-wrap justify-center items-center'>
      <div className='flex flex-wrap justify-center items-center'>
        <BackButton />
        <Header text={ability.displayName} />
        <FlexBasisFull />
        <h3 className='mt-[-16px] text-lg sm:3xl'>{normalizeAbilitySlot(ability.slot)}</h3>
      </div>
      <FlexBasisFull />
      <div className='flex flex-wrap justify-center items-center position relative top-[50px]'>
        <div className='w-full max-w-[80vw] sm:w-1/3 flex flex-wrap justify-center'>
          <FullAgentPortrait agent={agent} />
        </div>
        <div className='w-full max-w-[80vw] sm:w-1/2 flex flex-wrap justify-center items-center'>
          <div className='w-[200px] h-fit mb-10'>
            <img src={iconSrc} alt={ability.description} className='object-contain w-full' />
          </div>
          <div className='w-full flex justify-center'>
            <p className='w-[400px]'>{ability.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualAbility;
