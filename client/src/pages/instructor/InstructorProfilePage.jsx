import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function InstructorProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/instructors/me");

        setProfile(response.data.data);
      } catch (err) {
        console.error("Error fetching instructor profile:", err);
        setError("Failed to load instructor profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 md:p-12">
        <p className="text-text-secondary">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8 md:p-12">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background p-8 md:p-12">
        <p className="text-text-secondary">
          No profile information found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 md:p-12">
      <div className="max-w-4xl mx-auto">

        {/* Page Header */}
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 mb-4">
          Instructor panel
        </span>

        <h1 className="text-4xl font-bold text-white mb-2">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
            Profile
          </span>
        </h1>

        <p className="text-slate-400 mb-8">
          View your instructor information and account details.
        </p>

        {/* Profile Glass Card */}
        <div className="relative rounded-3xl border border-white/20 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 overflow-hidden">

          {/* Top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Blue glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />

          <div className="relative">

            <h2 className="text-xl font-semibold text-white mb-7">
              Instructor Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Phone */}
              <div className="rounded-2xl border border-white/10 bg-[var(--color-background)]/50 p-5">
                <p className="text-slate-400 text-sm mb-2">
                  Phone
                </p>

                <p className="text-white text-lg font-medium">
                  {profile.phone || "N/A"}
                </p>
              </div>

              {/* NIC */}
              <div className="rounded-2xl border border-white/10 bg-[var(--color-background)]/50 p-5">
                <p className="text-slate-400 text-sm mb-2">
                  NIC
                </p>

                <p className="text-white text-lg font-medium">
                  {profile.nic || "N/A"}
                </p>
              </div>

              {/* License Number */}
              <div className="rounded-2xl border border-white/10 bg-[var(--color-background)]/50 p-5">
                <p className="text-slate-400 text-sm mb-2">
                  License Number
                </p>

                <p className="text-white text-lg font-medium">
                  {profile.licenseNumber || "N/A"}
                </p>
              </div>

              {/* Experience */}
              <div className="rounded-2xl border border-white/10 bg-[var(--color-background)]/50 p-5">
                <p className="text-slate-400 text-sm mb-2">
                  Experience
                </p>

                <p className="text-white text-lg font-medium">
                  {profile.experience || "N/A"}
                </p>
              </div>

              {/* Qualification */}
              <div className="rounded-2xl border border-white/10 bg-[var(--color-background)]/50 p-5">
                <p className="text-slate-400 text-sm mb-2">
                  Qualification
                </p>

                <p className="text-white text-lg font-medium">
                  {profile.qualification || "N/A"}
                </p>
              </div>

              {/* Status */}
              <div className="rounded-2xl border border-white/10 bg-[var(--color-background)]/50 p-5">
                <p className="text-slate-400 text-sm mb-2">
                  Status
                </p>

                <p
                  className={`text-lg font-medium ${
                    profile.status === "Approved"
                      ? "text-emerald-400"
                      : profile.status === "Rejected"
                        ? "text-rose-400"
                        : "text-amber-400"
                  }`}
                >
                  {profile.status || "N/A"}
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default InstructorProfilePage;