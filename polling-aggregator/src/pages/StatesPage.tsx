import { useState } from 'react';
import { statePolls } from '../data/polls';
import ElectoralMap from '../components/ElectoralMap';
import PollCard from '../components/PollCard';
import { Search } from 'lucide-react';

export default function StatesPage() {
  const [search, setSearch] = useState('');

  const filtered = statePolls
    .filter(
      (p) =>
        (p.state && p.state.toLowerCase().includes(search.toLowerCase())) ||
        p.pollster.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">State Polls</h1>
        <p className="text-slate-500 text-sm">
          Electoral college projections and state-by-state polling
        </p>
      </div>

      <ElectoralMap />

      <div>
        <h2 className="text-lg font-semibold mb-4">Individual State Polls</h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by state or pollster..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      </div>
    </div>
  );
}
