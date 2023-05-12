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
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgents();
  }, [selectedOption]); // Run the effect whenever selectedOption changes

  const handleOptionChange = (event) => {
  // Get the selected option value from the clicked filter box
  const option = event.target.value;
  // Update the selected option state based on the previous state
  setSelectedOption((prevState) =>
    // If the selected option is the same as the previous state
    prevState === option && option !== 'No Filter'
      ? 'No Filter' // Reset the selected option to 'No Filter'
      : option // Otherwise, update the selected option to the new value
  );
};

  return (
    <>
      <Header text={'Agents'} />
      <FlexBasisFull />
      <FilterTable selectedOption={selectedOption} handleOptionChange={handleOptionChange} filterData={agentRoles} />
      <FlexBasisFull />
      <DataTable data={agents} selectedOption={selectedOption}  dataType='agents' />
    </>
  );
};

export default AgentsList;
