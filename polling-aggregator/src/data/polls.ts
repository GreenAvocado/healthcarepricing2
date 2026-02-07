import type { Poll, StatePolling, NationalAverage } from '../types';

export const nationalPolls: Poll[] = [
  {
    id: 'nat-001',
    pollster: 'Reuters/Ipsos',
    date: '2026-02-05',
    sampleSize: 1502,
    marginOfError: 2.5,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 43.2 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 45.8 },
      { name: 'Robert Kennedy Jr.', party: 'Independent', percentage: 4.1 },
    ],
    type: 'national',
    race: 'president',
    methodology: 'Online panel',
    sponsor: 'Reuters',
  },
  {
    id: 'nat-002',
    pollster: 'Quinnipiac University',
    date: '2026-02-04',
    sampleSize: 1289,
    marginOfError: 2.7,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 42.5 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 46.1 },
      { name: 'Robert Kennedy Jr.', party: 'Independent', percentage: 3.8 },
    ],
    type: 'national',
    race: 'president',
    methodology: 'Live phone',
    sponsor: 'Quinnipiac University',
  },
  {
    id: 'nat-003',
    pollster: 'Fox News',
    date: '2026-02-03',
    sampleSize: 1104,
    marginOfError: 3.0,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 44.8 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 44.2 },
      { name: 'Robert Kennedy Jr.', party: 'Independent', percentage: 4.5 },
    ],
    type: 'national',
    race: 'president',
    methodology: 'Live phone + online',
    sponsor: 'Fox News',
  },
  {
    id: 'nat-004',
    pollster: 'CNN/SSRS',
    date: '2026-02-02',
    sampleSize: 1210,
    marginOfError: 2.8,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 43.0 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 47.2 },
      { name: 'Robert Kennedy Jr.', party: 'Independent', percentage: 3.2 },
    ],
    type: 'national',
    race: 'president',
    methodology: 'Live phone',
    sponsor: 'CNN',
  },
  {
    id: 'nat-005',
    pollster: 'Monmouth University',
    date: '2026-02-01',
    sampleSize: 985,
    marginOfError: 3.1,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 42.1 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 46.5 },
      { name: 'Robert Kennedy Jr.', party: 'Independent', percentage: 4.0 },
    ],
    type: 'national',
    race: 'president',
    methodology: 'Live phone',
    sponsor: 'Monmouth University',
  },
  {
    id: 'nat-006',
    pollster: 'Emerson College',
    date: '2026-01-30',
    sampleSize: 1380,
    marginOfError: 2.6,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 44.0 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 45.0 },
      { name: 'Robert Kennedy Jr.', party: 'Independent', percentage: 4.8 },
    ],
    type: 'national',
    race: 'president',
    methodology: 'Online panel + text',
    sponsor: 'The Hill',
  },
  {
    id: 'nat-007',
    pollster: 'Morning Consult',
    date: '2026-01-28',
    sampleSize: 2005,
    marginOfError: 2.0,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 43.5 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 45.9 },
      { name: 'Robert Kennedy Jr.', party: 'Independent', percentage: 3.6 },
    ],
    type: 'national',
    race: 'president',
    methodology: 'Online panel',
    sponsor: 'Politico',
  },
  {
    id: 'nat-008',
    pollster: 'YouGov/The Economist',
    date: '2026-01-26',
    sampleSize: 1500,
    marginOfError: 2.5,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 42.8 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 46.3 },
      { name: 'Robert Kennedy Jr.', party: 'Independent', percentage: 4.2 },
    ],
    type: 'national',
    race: 'president',
    methodology: 'Online panel',
    sponsor: 'The Economist',
  },
  {
    id: 'nat-009',
    pollster: 'Marist/NPR/PBS',
    date: '2026-01-24',
    sampleSize: 1172,
    marginOfError: 2.9,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 43.7 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 46.0 },
      { name: 'Robert Kennedy Jr.', party: 'Independent', percentage: 3.5 },
    ],
    type: 'national',
    race: 'president',
    methodology: 'Live phone + online',
    sponsor: 'NPR/PBS NewsHour',
  },
  {
    id: 'nat-010',
    pollster: 'ABC News/Washington Post',
    date: '2026-01-22',
    sampleSize: 1005,
    marginOfError: 3.0,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 44.1 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 45.4 },
      { name: 'Robert Kennedy Jr.', party: 'Independent', percentage: 4.3 },
    ],
    type: 'national',
    race: 'president',
    methodology: 'Live phone',
    sponsor: 'ABC News/Washington Post',
  },
];

export const statePolls: Poll[] = [
  // Pennsylvania
  {
    id: 'pa-001',
    pollster: 'Franklin & Marshall',
    date: '2026-02-04',
    sampleSize: 820,
    marginOfError: 3.4,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 43.0 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 48.5 },
    ],
    type: 'state',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    race: 'president',
    methodology: 'Live phone + online',
  },
  // Michigan
  {
    id: 'mi-001',
    pollster: 'EPIC-MRA',
    date: '2026-02-03',
    sampleSize: 750,
    marginOfError: 3.6,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 43.8 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 46.2 },
    ],
    type: 'state',
    state: 'Michigan',
    stateAbbr: 'MI',
    race: 'president',
    methodology: 'Live phone',
  },
  // Wisconsin
  {
    id: 'wi-001',
    pollster: 'Marquette Law School',
    date: '2026-02-02',
    sampleSize: 801,
    marginOfError: 3.5,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 44.5 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 45.8 },
    ],
    type: 'state',
    state: 'Wisconsin',
    stateAbbr: 'WI',
    race: 'president',
    methodology: 'Live phone + online',
  },
  // Arizona
  {
    id: 'az-001',
    pollster: 'OH Predictive Insights',
    date: '2026-02-01',
    sampleSize: 680,
    marginOfError: 3.8,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 46.2 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 44.8 },
    ],
    type: 'state',
    state: 'Arizona',
    stateAbbr: 'AZ',
    race: 'president',
    methodology: 'Online panel',
  },
  // Georgia
  {
    id: 'ga-001',
    pollster: 'University of Georgia/AJC',
    date: '2026-01-31',
    sampleSize: 890,
    marginOfError: 3.3,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 46.5 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 44.0 },
    ],
    type: 'state',
    state: 'Georgia',
    stateAbbr: 'GA',
    race: 'president',
    methodology: 'Live phone + online',
  },
  // Nevada
  {
    id: 'nv-001',
    pollster: 'The Nevada Independent/OH Predictive',
    date: '2026-01-30',
    sampleSize: 620,
    marginOfError: 3.9,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 44.8 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 45.5 },
    ],
    type: 'state',
    state: 'Nevada',
    stateAbbr: 'NV',
    race: 'president',
    methodology: 'Online panel',
  },
  // North Carolina
  {
    id: 'nc-001',
    pollster: 'High Point University',
    date: '2026-01-29',
    sampleSize: 750,
    marginOfError: 3.6,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 47.0 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 43.5 },
    ],
    type: 'state',
    state: 'North Carolina',
    stateAbbr: 'NC',
    race: 'president',
    methodology: 'Live phone + online',
  },
  // Florida
  {
    id: 'fl-001',
    pollster: 'University of North Florida',
    date: '2026-01-28',
    sampleSize: 920,
    marginOfError: 3.2,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 49.2 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 42.8 },
    ],
    type: 'state',
    state: 'Florida',
    stateAbbr: 'FL',
    race: 'president',
    methodology: 'Live phone',
  },
  // Texas
  {
    id: 'tx-001',
    pollster: 'University of Texas/Texas Tribune',
    date: '2026-01-27',
    sampleSize: 1100,
    marginOfError: 3.0,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 50.5 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 42.0 },
    ],
    type: 'state',
    state: 'Texas',
    stateAbbr: 'TX',
    race: 'president',
    methodology: 'Online panel',
  },
  // Ohio
  {
    id: 'oh-001',
    pollster: 'Baldwin Wallace University',
    date: '2026-01-26',
    sampleSize: 780,
    marginOfError: 3.5,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 49.8 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 41.5 },
    ],
    type: 'state',
    state: 'Ohio',
    stateAbbr: 'OH',
    race: 'president',
    methodology: 'Live phone + online',
  },
  // Minnesota
  {
    id: 'mn-001',
    pollster: 'Star Tribune/MPR/KARE 11',
    date: '2026-01-25',
    sampleSize: 800,
    marginOfError: 3.5,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 42.0 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 48.5 },
    ],
    type: 'state',
    state: 'Minnesota',
    stateAbbr: 'MN',
    race: 'president',
    methodology: 'Live phone',
  },
  // New Hampshire
  {
    id: 'nh-001',
    pollster: 'University of New Hampshire',
    date: '2026-01-24',
    sampleSize: 580,
    marginOfError: 4.1,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 43.5 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 47.8 },
    ],
    type: 'state',
    state: 'New Hampshire',
    stateAbbr: 'NH',
    race: 'president',
    methodology: 'Online panel',
  },
  // Virginia
  {
    id: 'va-001',
    pollster: 'Roanoke College',
    date: '2026-01-23',
    sampleSize: 710,
    marginOfError: 3.7,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 42.8 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 49.2 },
    ],
    type: 'state',
    state: 'Virginia',
    stateAbbr: 'VA',
    race: 'president',
    methodology: 'Live phone + online',
  },
  // Colorado
  {
    id: 'co-001',
    pollster: 'Keating Research',
    date: '2026-01-22',
    sampleSize: 650,
    marginOfError: 3.8,
    candidates: [
      { name: 'J.D. Vance', party: 'Republican', percentage: 40.5 },
      { name: 'Josh Shapiro', party: 'Democrat', percentage: 50.8 },
    ],
    type: 'state',
    state: 'Colorado',
    stateAbbr: 'CO',
    race: 'president',
    methodology: 'Online panel',
  },
];

export const statePollingAverages: StatePolling[] = [
  { state: 'Pennsylvania', abbr: 'PA', leader: 'Shapiro', leaderParty: 'Democrat', margin: 5.5, totalPolls: 12, lastUpdated: '2026-02-04', electoralVotes: 19, rating: 'Lean D' },
  { state: 'Michigan', abbr: 'MI', leader: 'Shapiro', leaderParty: 'Democrat', margin: 2.4, totalPolls: 9, lastUpdated: '2026-02-03', electoralVotes: 15, rating: 'Lean D' },
  { state: 'Wisconsin', abbr: 'WI', leader: 'Shapiro', leaderParty: 'Democrat', margin: 1.3, totalPolls: 8, lastUpdated: '2026-02-02', electoralVotes: 10, rating: 'Tossup' },
  { state: 'Arizona', abbr: 'AZ', leader: 'Vance', leaderParty: 'Republican', margin: 1.4, totalPolls: 7, lastUpdated: '2026-02-01', electoralVotes: 11, rating: 'Tossup' },
  { state: 'Georgia', abbr: 'GA', leader: 'Vance', leaderParty: 'Republican', margin: 2.5, totalPolls: 10, lastUpdated: '2026-01-31', electoralVotes: 16, rating: 'Lean R' },
  { state: 'Nevada', abbr: 'NV', leader: 'Shapiro', leaderParty: 'Democrat', margin: 0.7, totalPolls: 6, lastUpdated: '2026-01-30', electoralVotes: 6, rating: 'Tossup' },
  { state: 'North Carolina', abbr: 'NC', leader: 'Vance', leaderParty: 'Republican', margin: 3.5, totalPolls: 8, lastUpdated: '2026-01-29', electoralVotes: 16, rating: 'Lean R' },
  { state: 'Florida', abbr: 'FL', leader: 'Vance', leaderParty: 'Republican', margin: 6.4, totalPolls: 11, lastUpdated: '2026-01-28', electoralVotes: 30, rating: 'Likely R' },
  { state: 'Texas', abbr: 'TX', leader: 'Vance', leaderParty: 'Republican', margin: 8.5, totalPolls: 9, lastUpdated: '2026-01-27', electoralVotes: 40, rating: 'Likely R' },
  { state: 'Ohio', abbr: 'OH', leader: 'Vance', leaderParty: 'Republican', margin: 8.3, totalPolls: 7, lastUpdated: '2026-01-26', electoralVotes: 17, rating: 'Likely R' },
  { state: 'Minnesota', abbr: 'MN', leader: 'Shapiro', leaderParty: 'Democrat', margin: 6.5, totalPolls: 6, lastUpdated: '2026-01-25', electoralVotes: 10, rating: 'Likely D' },
  { state: 'New Hampshire', abbr: 'NH', leader: 'Shapiro', leaderParty: 'Democrat', margin: 4.3, totalPolls: 5, lastUpdated: '2026-01-24', electoralVotes: 4, rating: 'Lean D' },
  { state: 'Virginia', abbr: 'VA', leader: 'Shapiro', leaderParty: 'Democrat', margin: 6.4, totalPolls: 7, lastUpdated: '2026-01-23', electoralVotes: 13, rating: 'Likely D' },
  { state: 'Colorado', abbr: 'CO', leader: 'Shapiro', leaderParty: 'Democrat', margin: 10.3, totalPolls: 5, lastUpdated: '2026-01-22', electoralVotes: 10, rating: 'Safe D' },
  { state: 'Iowa', abbr: 'IA', leader: 'Vance', leaderParty: 'Republican', margin: 7.2, totalPolls: 4, lastUpdated: '2026-01-21', electoralVotes: 6, rating: 'Likely R' },
  { state: 'Maine', abbr: 'ME', leader: 'Shapiro', leaderParty: 'Democrat', margin: 8.1, totalPolls: 3, lastUpdated: '2026-01-20', electoralVotes: 4, rating: 'Likely D' },
  { state: 'New Mexico', abbr: 'NM', leader: 'Shapiro', leaderParty: 'Democrat', margin: 7.5, totalPolls: 3, lastUpdated: '2026-01-19', electoralVotes: 5, rating: 'Likely D' },
];

export const nationalTrendData: NationalAverage[] = [
  { date: '2025-11-01', democrat: 44.2, republican: 44.8, independent: 4.5 },
  { date: '2025-11-15', democrat: 44.5, republican: 44.5, independent: 4.3 },
  { date: '2025-12-01', democrat: 44.8, republican: 44.2, independent: 4.4 },
  { date: '2025-12-15', democrat: 45.1, republican: 43.9, independent: 4.2 },
  { date: '2026-01-01', democrat: 45.3, republican: 43.5, independent: 4.1 },
  { date: '2026-01-08', democrat: 45.5, republican: 43.7, independent: 4.0 },
  { date: '2026-01-15', democrat: 45.4, republican: 43.8, independent: 4.1 },
  { date: '2026-01-22', democrat: 45.6, republican: 43.6, independent: 4.0 },
  { date: '2026-01-29', democrat: 45.9, republican: 43.4, independent: 3.9 },
  { date: '2026-02-05', democrat: 46.0, republican: 43.2, independent: 4.0 },
];

export function getPartyColor(party: string): string {
  switch (party) {
    case 'Democrat': return '#3b82f6';
    case 'Republican': return '#ef4444';
    case 'Independent': return '#f59e0b';
    default: return '#6b7280';
  }
}

export function getRatingColor(rating: string): string {
  switch (rating) {
    case 'Safe D': return '#1d4ed8';
    case 'Likely D': return '#3b82f6';
    case 'Lean D': return '#93c5fd';
    case 'Tossup': return '#a855f7';
    case 'Lean R': return '#fca5a5';
    case 'Likely R': return '#ef4444';
    case 'Safe R': return '#b91c1c';
    default: return '#6b7280';
  }
}
