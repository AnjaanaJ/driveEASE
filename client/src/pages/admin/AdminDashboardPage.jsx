import { useEffect, useState } from 'react';
import { getAdminDashboard } from '../../api/dashboardApi';
import StatCard from '../../components/dashboard/StatCard';
import RevenueChart from '../../components/dashboard/RevenueChart';
import VehicleUsageChart from '../../components/dashboard/VehicleUsageChart';

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then((res) => setStats(res.data))
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

  if (!stats) {
    return (
      <div className="min-h-screen bg-background p-8">
        <p className="text-red-400">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <span className="inline-block bg-surface/70 border border-white/10 text-accent text-xs px-3 py-1 rounded-full mb-4">
          Admin panel
        </span>

        <h1 className="text-3xl font-bold text-text-primary mb-1">
          Admin <span className="text-gradient-brand">dashboard</span>
        </h1>
        <p className="text-text-secondary mb-8">Overview of students, instructors, bookings, and revenue.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard label="Total students" value={stats.totalStudents} />
          <StatCard label="Total instructors" value={stats.totalInstructors} />
          <StatCard label="Total bookings" value={stats.totalBookings} />
          <StatCard label="Total revenue" value={`LKR ${stats.totalRevenue}`} accentColor="text-primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={stats.revenueChartData} />
          <VehicleUsageChart data={stats.vehicleStatusBreakdown} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;