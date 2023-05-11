import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FilterTable from '../components/FilterTable';
import DataTable from '../components/DataTable';
import FlexBasisFull from '../components/FlexBasisFull';

const AgentsList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();
        setAgents(data.data.filter(agent => agent.isPlayableCharacter));
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    console.log('Agents List', agents);
  }, [agents]);

  return (
    <>
      <Header text={'Agents'} />
      <FlexBasisFull />
      <FilterTable />
      <FlexBasisFull />
      <DataTable data={agents}/>
    </>
  );
};

export default AgentsList;
