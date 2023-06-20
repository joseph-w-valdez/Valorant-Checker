import React, { useEffect, useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import Header from '../components/Header';
import FilterTable from '../components/FilterTable';
import DataTable from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { agentRoles } from '../data/agentRoles';
import { fetchAgents } from '../utilities/fetchAgents';
import { useLoadingContext } from '../contexts/LoadingContext';
import { alphabetizeArray } from '../utilities/arrayManipulations';
import Subheader from '../components/Subheader';
import { normalizeSelectedOption } from '../utilities/stringConversions';

type AgentsListProps = {
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
};

const AgentsList: React.FC<AgentsListProps> = ({ selectedOption, setSelectedOption }) => {
  const { isLoading, setIsLoading } = useLoadingContext();
  const [agents, setAgents] = useState<any[]>([]);
  const [agentRoleDescription, setAgentRoleDescription] = useState<string>('');

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const filteredAgents = await fetchAgents(selectedOption);
        setAgents(filteredAgents);
      } catch (error) {
        console.error(error);
        setAgents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedOption, setIsLoading]);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedOption((prevState) =>
      prevState === option && option !== 'No Filter' ? 'No Filter' : option
    );
  };

  return (
    <>
      <Header text={'Agents'} />
      {!isLoading && (<>
        <FlexBasisFull />
        <Subheader
          text={`There ${agents.length === 1 ? 'is' : 'are'} currently ${agents.length} ${normalizeSelectedOption(selectedOption)} ${agents.length === 1 ? 'agent' : 'agents'} in game!`} />
      </>)}
      <FlexBasisFull />
      <FilterTable
        selectedOption={selectedOption}
        handleOptionChange={handleOptionChange}
        filterData={agentRoles}
      />
      <FlexBasisFull />
      {selectedOption && selectedOption !== 'No Filter' && (
        <div className='mt-2'>
          <p className=''>{agentRoleDescription}</p>
        </div>
      )}
      <DataTable data={alphabetizeArray(agents)} selectedOption={selectedOption} dataType='agents' />
    </>
  );
};

export default AgentsList;
