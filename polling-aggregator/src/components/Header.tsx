import { NavLink } from 'react-router-dom';
import { BarChart3, TrendingUp, Map, Info } from 'lucide-react';

export default function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight gradient-text">
                PollTracker
              </h1>
              <p className="text-[10px] text-slate-500 -mt-0.5 tracking-wider uppercase">
                2028 Election
              </p>
            </div>
          </NavLink>

          <nav className="flex items-center gap-2">
            <NavLink to="/" className={linkClass} end>
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">National</span>
            </NavLink>
            <NavLink to="/states" className={linkClass}>
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">States</span>
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
