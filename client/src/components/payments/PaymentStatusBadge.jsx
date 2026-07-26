function PaymentStatusBadge({ status }) {
  const styles = {
    Paid: 'bg-accent/10 text-accent border-accent/30',
    Pending: 'bg-secondary/10 text-secondary border-secondary/30',
    Overdue: 'bg-red-500/10 text-red-400 border-red-500/30',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${
        styles[status] || 'bg-text-secondary/10 text-text-secondary border-text-secondary/30'
      }`}
    >
      {status}
    </span>
  );
}

export default PaymentStatusBadge;