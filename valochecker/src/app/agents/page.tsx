'use client'
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Header from '@/components/Header';
import FlexBasisFull from '@/components/FlexBasisFull';
import FilterTable from '@/components/FilterTable';
import Subheader from '@/components/Subheader';
import { agentRoles } from '@/data/agentRoles';
import { fetchAgents } from '@/utilities/fetchAgents';
import { useHandleFilterBoxChange } from '@/hooks/useHandleFilterBoxChange';
import { useFetchArray } from '@/hooks/useFetchRequest'
import { normalizeSelectedOption } from '@/utilities/stringConversions';


const agents: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('No Filter');
  const [agentRoleDescription, setAgentRoleDescription] = useState<string>('');
  const handleFilterBoxChange = useHandleFilterBoxChange(setSelectedOption)

  useEffect(() => {
    setSelectedOption('No Filter');
  }, []);

  useEffect(() => {
    const agentRole = agentRoles.find((role) => role.category === selectedOption);
    if (agentRole) {
      setAgentRoleDescription(agentRole.description || '');
    } else {
      setAgentRoleDescription('');
    }
  }, [selectedOption]);

  if (!agents) return null;

  return (
    <>
      <div className='flex flex-wrap items-center justify-center'>
          <Header text='Agents' />
      </div>
       <FlexBasisFull />
       {agents && agents.length > 0 && (
        <>
          <FlexBasisFull />
          <Subheader
            text={`There ${agents.length === 1 ? 'is' : 'are'} currently ${agents.length} ${normalizeSelectedOption(
              selectedOption
            )} ${agents.length === 1 ? 'agent' : 'agents'}!`}
          />
        </>
      )}
      <FlexBasisFull />
      <FilterTable
        selectedOption={selectedOption}
        handleOptionChange={handleFilterBoxChange}
        filterData={agentRoles}
      />
      <FlexBasisFull />
      {selectedOption && selectedOption !== 'No Filter' && (
        <div className='mt-2'>
          <p className=''>{agentRoleDescription}</p>
        </div>
      )}
    </>
  );
};

export default agents;
