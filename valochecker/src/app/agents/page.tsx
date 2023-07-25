'use client'
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import DataTable from '@/components/DataTable';
import FlexBasisFull from '@/components/FlexBasisFull';
import FilterTable from '@/components/FilterTable';
import Subheader from '@/components/Subheader';
import { agentRoles } from '@/data/agentRoles';
import { fetchAgents } from '@/utilities/fetchAgents';
import { useFetchArray } from '@/hooks/useFetchRequest';
import { alphabetizeArray } from '@/utilities/arrayManipulations';
import { normalizeSelectedOption } from '@/utilities/stringConversions';
import { handleFilterBoxChange } from '@/utilities/filterboxChange';

export default function Agents() {
  const [selectedOption, setSelectedOption] = useState('No Filter');
  const [agentRoleDescription, setAgentRoleDescription] = useState('');

  const handleChange = handleFilterBoxChange(setSelectedOption);

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

  const agents = useFetchArray({
    fetchFunction: fetchAgents,
    selectedOption: selectedOption,
  });

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
        handleOptionChange={handleChange}
        filterData={agentRoles}
      />
      <FlexBasisFull />
      {selectedOption && selectedOption !== 'No Filter' && (
        <div className='mt-2'>
          <p className=''>{agentRoleDescription}</p>
        </div>
      )}
      {Boolean(selectedOption) && agents && agents.length > 0 && (
        <>
          <FlexBasisFull />
          <DataTable data={alphabetizeArray(agents)} selectedOption={selectedOption} dataType='agents' />
        </>
      )}
    </>
  );
};
