import { useEffect, useState } from 'react';
import { getInstructorDashboard } from '../../api/dashboardApi';
import StatCard from '../../components/dashboard/StatCard';

function InstructorAnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const instructorId = '650000000000000000000099';

    getInstructorDashboard(instructorId)
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
          Instructor <span className="text-gradient-brand">analytics</span>
        </h1>
        <p className="text-text-secondary mb-8">Your assigned students and upcoming lessons.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <StatCard label="Assigned students" value={data?.totalAssignedStudents ?? 0} />
          <StatCard label="Upcoming lessons" value={data?.upcomingLessons?.length ?? 0} />
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/15 to-accent/15 rounded-3xl blur-xl" />
          <div className="relative bg-surface/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <h2 className="text-lg font-bold text-text-primary mb-4">Upcoming lessons</h2>
            {data?.upcomingLessons?.length === 0 ? (
              <p className="text-text-secondary text-sm">No upcoming lessons scheduled.</p>
            ) : (
              <ul className="space-y-2">
                {data.upcomingLessons.map((lesson) => (
                  <li key={lesson._id} className="text-text-secondary text-sm border-b border-white/5 pb-2">
                    {new Date(lesson.date).toLocaleDateString()} — {lesson.startTime} to {lesson.endTime}
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

export default InstructorAnalyticsPage;