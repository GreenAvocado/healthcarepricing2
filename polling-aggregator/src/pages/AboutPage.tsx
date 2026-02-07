import { BarChart3, Shield, Clock, Database } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">About PollTracker</h1>
        <p className="text-slate-400 leading-relaxed">
          PollTracker aggregates national and state-level political polling data for United States
          elections, presenting it in a clear and chronological format so you can stay informed
          about the state of the race.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <Clock className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="font-semibold mb-1">Real-Time Updates</h3>
          <p className="text-sm text-slate-400">
            Polls are tracked and sorted chronologically, with the most recent data always appearing
            first so you never miss a shift in the race.
          </p>
        </div>
        <div className="glass-card p-5">
          <Database className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="font-semibold mb-1">Comprehensive Data</h3>
          <p className="text-sm text-slate-400">
            We aggregate polls from dozens of reputable pollsters including university research
            centers, media organizations, and independent polling firms.
          </p>
        </div>
        <div className="glass-card p-5">
          <BarChart3 className="w-8 h-8 text-emerald-400 mb-3" />
          <h3 className="font-semibold mb-1">Polling Averages</h3>
          <p className="text-sm text-slate-400">
            Our national and state-level averages combine multiple polls to reduce noise and provide
            a clearer picture of where the race truly stands.
          </p>
        </div>
        <div className="glass-card p-5">
          <Shield className="w-8 h-8 text-amber-400 mb-3" />
          <h3 className="font-semibold mb-1">Methodology Transparency</h3>
          <p className="text-sm text-slate-400">
            Each poll shows its methodology, sample size, margin of error, and sponsor so you can
            evaluate the quality of the data yourself.
          </p>
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-3">How We Calculate Averages</h2>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            We weight polls by recency, sample size, and historical pollster accuracy
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            National averages use a rolling window of the most recent 14 days of polling
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            State-level ratings (Safe/Likely/Lean/Tossup) are based on the current polling margin
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            Electoral vote projections combine state-level polling with demographic and historical data
          </li>
        </ul>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-3">Disclaimer</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          This application is for informational and educational purposes only. Polls are snapshots
          in time and not predictions of election outcomes. All polling data is sourced from
          publicly available polls conducted by third-party organizations. PollTracker does not
          conduct its own polling. The candidate matchups and data shown are illustrative and based
          on plausible scenarios for the 2028 election cycle.
        </p>
      </div>
    </div>
  );
}
