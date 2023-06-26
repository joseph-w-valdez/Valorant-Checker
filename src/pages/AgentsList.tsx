import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Header from '../components/Header';
import FilterTable from '../components/FilterTable';
import DataTable from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { agentRoles } from '../data/agentRoles';
import { fetchAgents } from '../utilities/fetchAgents';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import Subheader from '../components/Subheader';
import { normalizeSelectedOption } from '../utilities/stringConversions';
import { useHandleFilterBoxChange } from '../hooks/useHandleFilterBoxChange';
import { useFetchArray } from '../hooks/useFetchRequest'

type AgentsListProps = {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
};

const AgentsList: React.FC<AgentsListProps> = ({ selectedOption, setSelectedOption }) => {
  const [agentRoleDescription, setAgentRoleDescription] = useState<string>('');
  const agents = useFetchArray(fetchAgents, selectedOption);

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

  const handleFilterBoxChange = useHandleFilterBoxChange(setSelectedOption)

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
      {Boolean(selectedOption) && agents && agents.length > 0 && (
        <>
          <FlexBasisFull />
          <DataTable data={alphabetizeArray(agents)} selectedOption={selectedOption} dataType='agents' />
        </>
      )}
    </>
  );
};

export default AgentsList;
