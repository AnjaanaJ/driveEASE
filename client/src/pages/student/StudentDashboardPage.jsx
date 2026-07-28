import { useEffect, useState } from 'react';
import { getStudentDashboard } from '../../api/dashboardApi';

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
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl" />
            <div className="relative bg-surface/70 backdrop-blur-xl border border-white/10 rounded-3xl p-12 min-h-[220px] flex flex-col justify-center">
            <p className="text-text-secondary text-sm mb-2">Total lessons</p>
            <p className="text-5xl font-bold text-accent">{data?.totalLessons ?? 0}</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl" />
          <div className="relative bg-surface/70 backdrop-blur-xl border border-white/10 rounded-3xl p-12 min-h-[220px] flex flex-col justify-center">
            <p className="text-text-secondary text-sm mb-2">Completed lessons</p>
            <p className="text-5xl font-bold text-accent">{data?.completedLessons ?? 0}</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl" />
          <div className="relative bg-surface/70 backdrop-blur-xl border border-white/10 rounded-3xl p-12 min-h-[220px] flex flex-col justify-center">
            <p className="text-text-secondary text-sm mb-2">Outstanding balance</p>
            <p className={`text-5xl font-bold ${data?.outstandingBalance > 0 ? 'text-red-400' : 'text-accent'}`}>
              LKR {data?.outstandingBalance ?? 0}
            </p>
          </div>
        </div>
        </div>

        <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/15 to-accent/15 rounded-3xl blur-xl"/>
        <div className="relative bg-surface/70 backdrop-blur-x1 border border-white/10 rounded-3xl p-10">
          <h2 className="text-xl font-bold text-text-primary mb-5">Recent payments</h2>
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