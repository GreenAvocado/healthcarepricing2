export interface Candidate {
  name: string;
  party: 'Democrat' | 'Republican' | 'Independent';
  percentage: number;
}

export interface Poll {
  id: string;
  pollster: string;
  date: string;
  sampleSize: number;
  marginOfError: number;
  candidates: Candidate[];
  type: 'national' | 'state';
  state?: string;
  stateAbbr?: string;
  race: 'president' | 'senate' | 'governor';
  methodology: string;
  sponsor?: string;
}

export interface StatePolling {
  state: string;
  abbr: string;
  leader: string;
  leaderParty: 'Democrat' | 'Republican' | 'Independent';
  margin: number;
  totalPolls: number;
  lastUpdated: string;
  electoralVotes: number;
  rating: 'Safe D' | 'Likely D' | 'Lean D' | 'Tossup' | 'Lean R' | 'Likely R' | 'Safe R';
}

export interface NationalAverage {
  date: string;
  democrat: number;
  republican: number;
  independent?: number;
}
