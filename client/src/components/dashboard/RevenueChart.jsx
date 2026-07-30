import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function RevenueChart({ data }) {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-lg" />
      <div className="relative bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
      <h2 className="text-lg font-bold text-text-primary mb-4">Revenue overview</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="label" stroke="#94A3B8" fontSize={12} />
          <YAxis stroke="#94A3B8" fontSize={12} />
          <Tooltip
            contentStyle={{ background: '#131C31', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            labelStyle={{ color: '#F8FAFC' }}
          />
          <Bar dataKey="revenue" fill="#1E75FE" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;