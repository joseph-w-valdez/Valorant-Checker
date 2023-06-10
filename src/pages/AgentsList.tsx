import React, { useEffect, useState, ChangeEvent } from 'react';
import Header from '../components/Header';
import FilterTable from '../components/FilterTable';
import DataTable from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { agentRoles } from '../data/agentRoles';
import { fetchAgents } from '../utilities/FetchAgents';
import { useLoadingContext } from '../contexts/LoadingContext';

const AgentsList: React.FC = () => {
  const { setIsLoading } = useLoadingContext();
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('No Filter');
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
      <DataTable data={agents} selectedOption={selectedOption} dataType='agents' />
    </>
  );
};

export default AgentsList;
