
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function InstructorPerformancePage() {
  const { id } = useParams();
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    try {
      const res = await axiosInstance.get(
        `/instructors/${id}/performance`
      );

      setPerformance(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!performance) {
    return (
      <div className="min-h-screen p-8 md:p-12">
        <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
          <h2 className="text-2xl font-bold text-white">
            Loading performance...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-12">
      {/* Page Header */}
      <div className="mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 mb-4">
          Admin panel
        </span>

        <h1 className="text-4xl font-bold text-white mb-2">
          Instructor{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
            performance
          </span>
        </h1>

        <p className="text-slate-400">
          Review instructor activity and current performance information.
        </p>
      </div>

      {/* Performance Card */}
      <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Performance Overview
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Current statistics for this instructor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Students */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm text-slate-400 mb-2">
              Total Students
            </p>

            <p className="text-3xl font-bold text-white">
              {performance.totalStudents}
            </p>
          </div>

          {/* Availability Slots */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm text-slate-400 mb-2">
              Availability Slots
            </p>

            <p className="text-3xl font-bold text-white">
              {performance.availabilitySlots}
            </p>
          </div>

          {/* Status */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm text-slate-400 mb-2">
              Status
            </p>

            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                performance.status === "Approved"
                  ? "text-green-400 bg-green-500/10 border border-green-500/20"
                  : performance.status === "Rejected"
                    ? "text-red-400 bg-red-500/10 border border-red-500/20"
                    : "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20"
              }`}
            >
              {performance.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorPerformancePage;
