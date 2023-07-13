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


const agents: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('No Filter');
  const [agentRoleDescription, setAgentRoleDescription] = useState<string>('');
  const handleFilterBoxChange = useHandleFilterBoxChange(setSelectedOption)

  useEffect(() => {
    setSelectedOption('No Filter');
  }, []);


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
    </>
  );
};

export default agents;
