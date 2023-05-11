import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterTable from '../components/FilterTable';
import DataTable from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { agentRoles } from '../data/agent-roles';

const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const [selectedOption, setSelectedOption] = useState('No Filter');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();
        let filteredAgents = data.data.filter(agent => agent.isPlayableCharacter);
        if (selectedOption !== 'No Filter') {
          filteredAgents = filteredAgents.filter(agent => agent.role.displayName === selectedOption);
        }
        setAgents(filteredAgents);
        console.log('data', agents)
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgents();
  }, [selectedOption]); // Run the effect whenever selectedOption changes

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption((prevState) =>
      prevState === option && option !== 'No Filter' ? 'No Filter' : option
    );
  };

  return (
    <>
      <Header text={'Agents'} />
      <FlexBasisFull />
      <FilterTable selectedOption={selectedOption} handleOptionChange={handleOptionChange} filterData={agentRoles}/>
      <FlexBasisFull />
      <DataTable data={agents} selectedOption={selectedOption} />
    </>
  );
};

export default AgentsList;
