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

  const fetchData = async (option: string) => {
    try {
      setIsLoading(true);
      const filteredAgents = await fetchAgents(option);
      setAgents(filteredAgents);
    } catch (error) {
      console.error(error);
      setAgents([]);
    } finally {
      // Delay before setting isLoading to false to reduce visual bugs
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    const fetchDataOnInitialLoad = async () => {
      setIsLoading(true);
      // Delay before fetching data for the initial load with "No Filter" option
      fetchData(selectedOption);
    };

    fetchDataOnInitialLoad();
  }, [selectedOption]);

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

  const handleOptionChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedOption((prevOption) =>
      prevOption === option && option !== 'No Filter' ? 'No Filter' : option
    );
    fetchData(option);
  };

  if (isLoading && !agents) return null;

  return (
    <>
      <div className='flex flex-wrap items-center justify-center'>
          <Header text='Agents' />
      </div>
      <FlexBasisFull />
      {!isLoading && agents.length > 0 && (
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
        handleOptionChange={handleOptionChange}
        filterData={agentRoles}
      />
      <FlexBasisFull />
      {selectedOption && selectedOption !== 'No Filter' && (
        <div className='mt-2'>
          <p className=''>{agentRoleDescription}</p>
        </div>
      )}
      {Boolean(selectedOption) && agents.length > 0 && (
        <>
          <FlexBasisFull />
          <DataTable data={alphabetizeArray(agents)} selectedOption={selectedOption} dataType='agents' />
        </>
      )}
    </>
  );
};

export default AgentsList;
