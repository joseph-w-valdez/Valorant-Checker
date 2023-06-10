declare module 'FetchAgents.ts' {
  export const fetchAgents: (selectedOption: string) => Promise<any[]>;
  export const fetchAgent: (agentName: string) => Promise<any | null>;
}
