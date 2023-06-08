import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import FilterTable from '../components/FilterTable';
import DataTable from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { agentRoles } from '../data/agentRoles';
import { fetchAgents } from '../utilities/FetchAgents';
import { LoadingContext } from '../contexts/LoadingContext';

const AgentsList = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const [agents, setAgents] = useState([]);
  const [selectedOption, setSelectedOption] = useState('No Filter');
  const [agentRoleDescription, setAgentRoleDescription] = useState('');

  useEffect(() => {
    setSelectedOption('No Filter');
  }, []);

  useEffect(() => {
    const agentRole = agentRoles.find((role) => role.category === selectedOption);
    if (agentRole) {
      setAgentRoleDescription(agentRole.description);
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

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption((prevState) =>
      prevState === option && option !== 'No Filter'
        ? 'No Filter'
        : option
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
