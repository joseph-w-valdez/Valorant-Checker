export const fetchAgents = async (selectedOption: string): Promise<any[]> => {
  try {
    const response = await fetch('https://valorant-api.com/v1/agents');
    const data = await response.json();
    let filteredAgents = data.data.filter((agent: any) => agent.isPlayableCharacter);
    if (selectedOption !== 'No Filter') {
      filteredAgents = filteredAgents.filter((agent: any) => agent.role.displayName === selectedOption);
    }
    return filteredAgents;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchAgent = async (agentName: string): Promise<any | null> => {
  try {
    const adjustedAgentName = agentName === 'Kayo' ? 'KAY/O' : agentName;
    const response = await fetch(`https://valorant-api.com/v1/agents?developerName=${adjustedAgentName}`);
    const data = await response.json();
    const agent = data.data.find((agent: any) => agent.isPlayableCharacter && agent.displayName.toLowerCase() === adjustedAgentName.toLowerCase());
    return agent || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
