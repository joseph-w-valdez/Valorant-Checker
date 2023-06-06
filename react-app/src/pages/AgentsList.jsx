import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterTable from '../components/FilterTable';
import DataTable from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';
import { agentRoles } from '../data/agentRoles';
import { scrollToTop } from '../utilities/scrollToTop';
import { useLocation } from 'react-router-dom';
import { fetchAgents } from '../utilities/FetchAgents';

const AgentsList = ({ selectedOption, setSelectedOption }) => {
  const [agents, setAgents] = useState([]);
  const [agentRoleDescription, setAgentRoleDescription] = useState('');
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location]);

  useEffect(() => {
    const agentRole = agentRoles.find(role => role.category === selectedOption);
    if (agentRole) {
      setAgentRoleDescription(agentRole.description);
    } else {
      setAgentRoleDescription('');
    }
  }, [selectedOption]);

  useEffect(() => {
    fetchAgents(selectedOption)
      .then(filteredAgents => {
        setAgents(filteredAgents);
      })
      .catch(error => {
        console.error(error);
        setAgents([]);
      });
  }, [selectedOption]);

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
      <FilterTable selectedOption={selectedOption} handleOptionChange={handleOptionChange} filterData={agentRoles} />
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
