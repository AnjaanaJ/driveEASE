function StatCard({ label, value, accentColor = 'text-accent' }) {
  return (
    <div className="bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <p className="text-text-secondary text-xs mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accentColor}`}>{value}</p>
    </div>
  );
}

export default StatCard;