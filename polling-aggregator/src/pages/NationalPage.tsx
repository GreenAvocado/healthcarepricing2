import { useState } from 'react';
import { nationalPolls } from '../data/polls';
import PollCard from '../components/PollCard';
import TrendChart from '../components/TrendChart';
import SummaryCards from '../components/SummaryCards';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function NationalPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'spread'>('date');

  const filtered = nationalPolls
    .filter(
      (p) =>
        p.pollster.toLowerCase().includes(search.toLowerCase()) ||
        (p.sponsor && p.sponsor.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      const spreadA = Math.abs(a.candidates[0].percentage - a.candidates[1].percentage);
      const spreadB = Math.abs(b.candidates[0].percentage - b.candidates[1].percentage);
      return spreadB - spreadA;
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">National Polls</h1>
        <p className="text-slate-500 text-sm">
          2028 Presidential Election — Aggregated national polling data, updated daily
        </p>
      </div>

      <SummaryCards />
      <TrendChart />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search pollsters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'spread')}
            className="bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50"
          >
            <option value="date">Most Recent</option>
            <option value="spread">Largest Spread</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No polls found matching "{search}"
        </div>
      )}
    </div>
  );
}
