
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function InstructorStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Get logged-in instructor profile
      const instructorResponse = await axiosInstance.get("/instructors/me");

      const instructor =
        instructorResponse.data.data || instructorResponse.data;

      // Get students assigned to this instructor
      const response = await axiosInstance.get(
        "/instructors/" + instructor._id + "/students"
      );

      setStudents(response.data.data || []);
    } catch (error) {
      console.error("Error fetching assigned students:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to load assigned students."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 md:p-12">
        <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
          <h2 className="text-2xl font-bold text-white">
            Loading assigned students...
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
          Instructor panel
        </span>

        <h1 className="text-4xl font-bold text-white mb-2">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
            assigned students
          </span>
        </h1>

        <p className="text-slate-400">
          View the students currently assigned to you.
        </p>
      </div>

      {/* Error Message */}
      {message && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {message}
        </div>
      )}

      {/* No Students */}
      {students.length === 0 ? (
        <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
          <p className="text-slate-400 text-center">
            No students are currently assigned to you.
          </p>
        </div>
      ) : (
        /* Students Table Card */
        <div className="rounded-3xl border border-white/20 bg-white/[0.03] overflow-hidden text-white shadow-2xl">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Assigned Students
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Students currently assigned to your instructor profile.
                </p>
              </div>

              <span className="rounded-full bg-white/[0.03] border border-white/20 px-3 py-1 text-sm text-slate-300">
                {students.length}{" "}
                {students.length === 1 ? "Student" : "Students"}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/[0.03] text-white">
                  <th className="border-b border-white/10 p-4 text-left font-semibold">
                    Name
                  </th>

                  <th className="border-b border-white/10 p-4 text-left font-semibold">
                    Email
                  </th>

                  <th className="border-b border-white/10 p-4 text-left font-semibold">
                    NIC
                  </th>

                  <th className="border-b border-white/10 p-4 text-left font-semibold">
                    Phone
                  </th>

                  <th className="border-b border-white/10 p-4 text-left font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student._id}
                    className="transition-colors hover:bg-white/10"
                  >
                    <td className="border-b border-white/10 p-4 text-white">
                      {student.userId?.name || "N/A"}
                    </td>

                    <td className="border-b border-white/10 p-4 text-slate-300">
                      {student.userId?.email || "N/A"}
                    </td>

                    <td className="border-b border-white/10 p-4 text-slate-300">
                      {student.nic || "N/A"}
                    </td>

                    <td className="border-b border-white/10 p-4 text-slate-300">
                      {student.phone || "N/A"}
                    </td>

                    <td className="border-b border-white/10 p-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                          student.status === "Approved"
                            ? "text-green-400 bg-green-500/10 border border-green-500/20"
                            : student.status === "Rejected"
                              ? "text-red-400 bg-red-500/10 border border-red-500/20"
                              : "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20"
                        }`}
                      >
                        {student.status || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstructorStudentsPage;

