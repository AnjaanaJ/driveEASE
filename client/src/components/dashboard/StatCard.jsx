function StatCard({ label, value, accentColor = 'text-accent' }) {
  return (
    <div className="relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-lg" />
    <div className="relative bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-h-[160px] flec-col justify-center">
      <p className="text-text-secondary text-xs mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accentColor}`}>{value}</p>
    </div>
    </div>
  );
}

export default StatCard;