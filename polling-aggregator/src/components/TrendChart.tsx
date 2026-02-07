import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { nationalTrendData } from '../data/polls';

export default function TrendChart() {
  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold mb-1">National Polling Average</h2>
      <p className="text-sm text-slate-500 mb-6">
        Trend over the last 3 months based on aggregated polling data
      </p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={nationalTrendData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="date"
              tickFormatter={(val) => format(parseISO(val), 'MMM d')}
              stroke="#475569"
              fontSize={12}
            />
            <YAxis
              domain={[38, 50]}
              stroke="#475569"
              fontSize={12}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                fontSize: '13px',
              }}
              labelFormatter={(val) => format(parseISO(val as string), 'MMM d, yyyy')}
              formatter={(value?: number, name?: string) => [
                `${(value ?? 0).toFixed(1)}%`,
                (name ?? '').charAt(0).toUpperCase() + (name ?? '').slice(1),
              ]}
            />
            <Legend
              formatter={(value) => (
                <span className="text-sm capitalize text-slate-300">{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="democrat"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="republican"
              stroke="#ef4444"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="independent"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
              activeDot={{ r: 4, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
