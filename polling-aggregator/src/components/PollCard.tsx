import { format, parseISO } from 'date-fns';
import type { Poll } from '../types';
import { getPartyColor } from '../data/polls';
import { Calendar, Users, BarChart2 } from 'lucide-react';

interface PollCardProps {
  poll: Poll;
}

export default function PollCard({ poll }: PollCardProps) {
  const sorted = [...poll.candidates].sort((a, b) => b.percentage - a.percentage);
  const leader = sorted[0];
  const maxPct = Math.max(...sorted.map((c) => c.percentage));

  return (
    <div className="glass-card p-5 hover:border-slate-700/50 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-100 group-hover:text-white transition-colors">
            {poll.pollster}
          </h3>
          {poll.sponsor && poll.sponsor !== poll.pollster && (
            <p className="text-xs text-slate-500 mt-0.5">Sponsored by {poll.sponsor}</p>
          )}
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: `${getPartyColor(leader.party)}20`,
            color: getPartyColor(leader.party),
          }}
        >
          {leader.name.split(' ').pop()} +{(leader.percentage - sorted[1].percentage).toFixed(1)}
        </span>
      </div>

      {poll.state && (
        <div className="mb-3">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300">
            {poll.state}
          </span>
        </div>
      )}

      <div className="space-y-3 mb-4">
        {sorted.map((candidate) => (
          <div key={candidate.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-slate-300">{candidate.name}</span>
              <span
                className="text-sm font-bold"
                style={{ color: getPartyColor(candidate.party) }}
              >
                {candidate.percentage}%
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full animate-bar-fill"
                style={{
                  width: `${(candidate.percentage / maxPct) * 100}%`,
                  backgroundColor: getPartyColor(candidate.party),
                  opacity: candidate === leader ? 1 : 0.6,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-800/50">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {format(parseISO(poll.date), 'MMM d, yyyy')}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {poll.sampleSize.toLocaleString()} {poll.methodology === 'Live phone' ? 'LV' : 'RV'}
        </span>
        <span className="flex items-center gap-1">
          <BarChart2 className="w-3 h-3" />
          ±{poll.marginOfError}%
        </span>
      </div>
    </div>
  );
}
