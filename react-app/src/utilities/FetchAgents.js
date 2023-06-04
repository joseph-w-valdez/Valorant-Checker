import { useEffect } from 'react';

const FetchAgents = ({ selectedOption, setAgents }) => {
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
  }, [selectedOption, setAgents]);

  return null; // Render nothing or a loading spinner if desired
};

export default FetchAgents;

export const fetchAgent = async (agentName) => {
  try {
    const adjustedAgentName = agentName === 'Kayo' ? 'KAY/O' : agentName;
    const response = await fetch(`https://valorant-api.com/v1/agents?developerName=${adjustedAgentName}`);
    const data = await response.json();
    const agent = data.data.find(agent => agent.isPlayableCharacter && agent.displayName.toLowerCase() === adjustedAgentName.toLowerCase());
    return agent || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
