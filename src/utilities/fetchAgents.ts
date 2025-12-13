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

export const fetchNewestAgent = async () => {
  try {
    // Fetch all agents
    const response = await fetch('https://valorant-api.com/v1/agents');
    const data = await response.json();
    const playableAgents = data.data.filter((agent: any) => agent.isPlayableCharacter);
    
    if (playableAgents.length === 0) {
      return null;
    }

    // Sort agents by release date (newest first)
    // Agents with epoch date (1970-01-01) are treated as older
    const epochDate = new Date('1970-01-01T00:00:00Z').getTime();
    
    const sortedAgents = [...playableAgents].sort((a: any, b: any) => {
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : epochDate;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : epochDate;
      // Sort descending (newest first)
      return dateB - dateA;
    });

    // The first agent in the sorted array is the newest
    const newestAgent = sortedAgents[0];
    
    return newestAgent || null;
  } catch (error) {
    console.error(error);
    return null;
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
