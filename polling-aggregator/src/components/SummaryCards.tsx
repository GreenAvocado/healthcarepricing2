import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';
import { nationalPolls, nationalTrendData } from '../data/polls';

export default function SummaryCards() {
  const latest = nationalTrendData[nationalTrendData.length - 1];
  const previous = nationalTrendData[nationalTrendData.length - 2];
  const demChange = latest.democrat - previous.democrat;
  const repChange = latest.republican - previous.republican;
  const spread = latest.democrat - latest.republican;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 text-blue-400 mb-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Shapiro (D)</span>
        </div>
        <span className="text-2xl font-black text-blue-400">{latest.democrat}%</span>
        <span className={`text-xs ml-2 ${demChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {demChange >= 0 ? '▲' : '▼'} {Math.abs(demChange).toFixed(1)}
        </span>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <TrendingDown className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Vance (R)</span>
        </div>
        <span className="text-2xl font-black text-red-400">{latest.republican}%</span>
        <span className={`text-xs ml-2 ${repChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {repChange >= 0 ? '▲' : '▼'} {Math.abs(repChange).toFixed(1)}
        </span>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center gap-2 text-purple-400 mb-2">
          <Activity className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Spread</span>
        </div>
        <span className="text-2xl font-black" style={{ color: spread > 0 ? '#3b82f6' : '#ef4444' }}>
          {spread > 0 ? 'D' : 'R'}+{Math.abs(spread).toFixed(1)}
        </span>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center gap-2 text-emerald-400 mb-2">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Total Polls</span>
        </div>
        <span className="text-2xl font-black text-emerald-400">{nationalPolls.length}</span>
        <span className="text-xs text-slate-500 ml-2">national</span>
      </div>
    </div>
  );
}
