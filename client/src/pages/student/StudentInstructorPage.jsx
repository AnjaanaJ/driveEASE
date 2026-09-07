import { useEffect, useState } from "react";
import { UserRound, Award, Clock3, CalendarDays } from "lucide-react";
import axiosInstance from "../../services/axiosInstance";

function StudentInstructorPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get("/instructors");

      const data = response.data?.data || response.data || [];

      // Only show active instructors to students
      const activeInstructors = Array.isArray(data)
        ? data.filter((instructor) => instructor.status === "Active")
        : [];

      setInstructors(activeInstructors);
    } catch (err) {
      console.error("Failed to load instructors:", err);
      setError(
        err.response?.data?.message ||
          "Could not load instructors. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-8">
          <span className="mb-4 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
            Student panel
          </span>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              instructors
            </span>
          </h1>

          <p className="mt-2 text-text-secondary">
            View our available instructors and their professional details.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-surface/70 p-8 text-center backdrop-blur-xl">
            <p className="text-text-secondary">Loading instructors...</p>
          </div>
        ) : instructors.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-surface/70 p-8 text-center backdrop-blur-xl">
            <UserRound className="mx-auto mb-4 h-10 w-10 text-text-secondary" />

            <h2 className="text-lg font-semibold text-white">
              No instructors available
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              There are currently no active instructors available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">

            {instructors.map((instructor) => (
              <section
                key={instructor._id}
                className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/[0.03] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-3xl sm:p-8"
              >
                {/* Top glow */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />

                {/* Instructor Header */}
                <div className="relative flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-[var(--color-primary)]/15">
                    <UserRound className="h-8 w-8 text-sky-300" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      Instructor
                    </p>

                    <h2 className="mt-1 truncate text-xl font-bold text-text-primary">
                      {instructor.user?.name || "Instructor"}
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
                      ID:{" "}
                      <span className="font-semibold text-accent">
                        {instructor.instructorId || "-"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="relative mt-5">
                  <span className="inline-flex items-center rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-300">
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
                    {instructor.status}
                  </span>
                </div>

                {/* Details */}
                <div className="relative mt-6 grid gap-4 sm:grid-cols-2">

                  <DetailItem
                    icon={<Award className="h-4 w-4" />}
                    label="Qualification"
                    value={instructor.qualification || "-"}
                  />

                  <DetailItem
                    icon={<Clock3 className="h-4 w-4" />}
                    label="Experience"
                    value={
                      instructor.experience !== undefined
                        ? `${instructor.experience} years`
                        : "-"
                    }
                  />

                  <DetailItem
                    icon={<UserRound className="h-4 w-4" />}
                    label="Instructor ID"
                    value={instructor.instructorId || "-"}
                  />

                  <DetailItem
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Availability"
                    value={
                      instructor.availability?.length
                        ? `${instructor.availability.length} schedule${
                            instructor.availability.length > 1 ? "s" : ""
                          }`
                        : "Not added"
                    }
                  />
                </div>

                {/* Availability */}
                {instructor.availability?.length > 0 && (
                  <div className="relative mt-6 border-t border-white/10 pt-5">
                    <h3 className="text-sm font-semibold text-white">
                      Available schedule
                    </h3>

                    <div className="mt-3 space-y-2">
                      {instructor.availability.map((slot, index) => (
                        <div
                          key={`${slot.day}-${index}`}
                          className="flex items-center justify-between rounded-xl border border-white/5 bg-background/35 px-4 py-3"
                        >
                          <span className="font-medium text-text-primary">
                            {slot.day}
                          </span>

                          <span className="text-sm text-text-secondary">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-background/35 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-secondary">
        <span className="text-accent">{icon}</span>
        {label}
      </div>

      <p className="mt-2 break-words font-medium text-text-primary">
        {value}
      </p>
    </div>
  );
}

export default StudentInstructorPage;