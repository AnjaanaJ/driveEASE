import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#06B6B4', '#1E75FE', '#A34BF1', '#F59E0B'];

function VehicleUsageChart({ data }) {
  return (
    <div className="bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-text-primary mb-4">Vehicle usage</h2>
      {data.length === 0 ? (
        <p className="text-text-secondary text-sm">No vehicle data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={(entry) => `${entry._id}: ${entry.count}`}
            >
              {data.map((entry, index) => (
                <Cell key={entry._id} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#131C31', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Legend wrapperStyle={{ color: '#94A3B8', fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default VehicleUsageChart;