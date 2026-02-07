import { statePollingAverages } from '../data/polls';
import { getRatingColor } from '../data/polls';
import type { StatePolling } from '../types';

function StateCard({ state }: { state: StatePolling }) {
  const color = getRatingColor(state.rating);
  return (
    <div
      className="glass-card p-4 hover:scale-[1.02] transition-transform cursor-pointer"
      style={{ borderColor: `${color}40` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {state.abbr}
          </span>
          <span className="text-sm font-medium text-slate-200">{state.state}</span>
        </div>
        <span className="text-xs text-slate-500">{state.electoralVotes} EV</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span
            className="text-lg font-bold"
            style={{ color }}
          >
            {state.leader} +{state.margin.toFixed(1)}
          </span>
        </div>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {state.rating}
        </span>
      </div>
      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
        <span>{state.totalPolls} polls</span>
        <span>Updated {state.lastUpdated}</span>
      </div>
    </div>
  );
}

export default function ElectoralMap() {
  const demEV = statePollingAverages
    .filter((s) => s.leaderParty === 'Democrat')
    .reduce((sum, s) => sum + s.electoralVotes, 0);
  const repEV = statePollingAverages
    .filter((s) => s.leaderParty === 'Republican')
    .reduce((sum, s) => sum + s.electoralVotes, 0);

  // Remaining EVs not polled (safe states assumed)
  const demBase = 183; // safe D states not listed
  const repBase = 125; // safe R states not listed
  const totalDem = demEV + demBase;
  const totalRep = repEV + repBase;

  const tossups = statePollingAverages.filter((s) => s.rating === 'Tossup');
  const leanD = statePollingAverages.filter((s) => s.rating === 'Lean D' || s.rating === 'Likely D');
  const safeD = statePollingAverages.filter((s) => s.rating === 'Safe D');
  const leanR = statePollingAverages.filter((s) => s.rating === 'Lean R' || s.rating === 'Likely R');
  const safeR = statePollingAverages.filter((s) => s.rating === 'Safe R');

  return (
    <div>
      {/* Electoral vote counter */}
      <div className="glass-card p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Electoral Vote Estimate</h2>
        <div className="flex items-center gap-4 mb-3">
          <div className="text-right flex-1">
            <span className="text-3xl font-black text-blue-400">{totalDem}</span>
            <p className="text-xs text-slate-500 mt-1">Shapiro (D)</p>
          </div>
          <div className="flex-[2] h-8 rounded-full overflow-hidden flex bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-1000"
              style={{ width: `${(totalDem / 538) * 100}%` }}
            />
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-1000"
              style={{ width: `${(totalRep / 538) * 100}%` }}
            />
          </div>
          <div className="flex-1">
            <span className="text-3xl font-black text-red-400">{totalRep}</span>
            <p className="text-xs text-slate-500 mt-1">Vance (R)</p>
          </div>
        </div>
        <div className="text-center">
          <span className="text-xs text-slate-500">270 needed to win</span>
          <div className="relative h-px bg-slate-800 mt-2">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-500 border-2 border-slate-950"
              style={{ left: `${(270 / 538) * 100}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>
        </div>
      </div>

      {/* State grid by category */}
      {tossups.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            Toss-Up States
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tossups.map((s) => <StateCard key={s.abbr} state={s} />)}
          </div>
        </div>
      )}

      {leanD.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Lean / Likely Democrat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {leanD.map((s) => <StateCard key={s.abbr} state={s} />)}
          </div>
        </div>
      )}

      {safeD.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-700" />
            Safe Democrat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {safeD.map((s) => <StateCard key={s.abbr} state={s} />)}
          </div>
        </div>
      )}

      {leanR.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            Lean / Likely Republican
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {leanR.map((s) => <StateCard key={s.abbr} state={s} />)}
          </div>
        </div>
      )}

      {safeR.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-800" />
            Safe Republican
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {safeR.map((s) => <StateCard key={s.abbr} state={s} />)}
          </div>
        </div>
      )}
    </div>
  );
}
