import { useEffect, useState } from 'react';
import { getStudentDashboard } from '../../api/dashboardApi';
import StatCard from '../../components/dashboard/StatCard';

function StudentDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = '650000000000000000000001';

    getStudentDashboard(studentId)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <p className="text-text-secondary">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-1">
          My <span className="text-gradient-brand">dashboard</span>
        </h1>
        <p className="text-text-secondary mb-8">Your lessons and payment overview.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard label="Total lessons" value={data?.totalLessons ?? 0} />
          <StatCard label="Completed lessons" value={data?.completedLessons ?? 0} />
          <StatCard
            label="Outstanding balance"
            value={`LKR ${data?.outstandingBalance ?? 0}`}
            accentColor={data?.outstandingBalance > 0 ? 'text-red-400' : 'text-accent'}
          />
        </div>

        <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-lg"/>
        <div className="relative bg-surface/70 backdrop-blur-x1 border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-bold text-text-primary mb-4">Recent payments</h2>
          {data?.recentPayments?.length === 0 ? (
            <p className="text-text-secondary text-sm">No payments found.</p>
          ) : (
            <ul className="space-y-2">
              {data.recentPayments.map((p) => (
                <li key={p._id} className="text-text-secondary text-sm border-b border-white/5 pb-2 flex justify-between">
                  <span>{p.invoiceRef}</span>
                  <span>LKR {p.amount} — {p.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardPage;