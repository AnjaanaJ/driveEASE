import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createStudent,
  getStudentAttendance,
  getStudentByUserId,
} from "../../api/studentApi";
import StudentForm from "../../components/students/StudentForm";
import AttendanceTable from "../../components/students/AttendanceTable";
import { useAuth } from "../../context/AuthContext";

function StudentRegistrationPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get("course") || "";
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRegistration = async () => {
      if (!user?.id && !user?._id) return;

      try {
        const profile = await getStudentByUserId(user.id || user._id);
        setStudent(profile);

        if (profile.status === "Approved") {
          const records = await getStudentAttendance(profile._id);
          setAttendance(Array.isArray(records) ? records : []);
        }
      } catch (err) {
        if (err.response?.status !== 404) {
          setError("Could not load your registration details.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadRegistration();
  }, [user]);

  const handleRegister = async (formData) => {
    const payload = {
      ...formData,
      userId: formData.userId || user?._id || user?.id,
    };

    await createStudent(payload);
    navigate("/student/profile");
  };

  if (loading) {
    return (
      <div className="p-8 text-text-secondary">Loading registration...</div>
    );
  }

  if (student) {
    const isApproved = student.status === "Approved";
    const isRejected = student.status === "Rejected";

    return (
      <div className="max-w-2xl mx-auto mt-10 mb-10 p-8">
        <span className="inline-block bg-surface border border-slate-700 text-accent text-xs px-3 py-1 rounded-full mb-4">
          Student portal
        </span>
        <h1 className="text-3xl font-bold text-text-primary mb-1">
          My <span className="text-gradient-brand">registration</span>
        </h1>
        <p className="text-text-secondary mb-6">
          Your submitted registration details.
        </p>

        <div className="rounded-xl bg-surface border border-slate-700 overflow-hidden shadow-[0_0_25px_-5px_var(--color-primary)]">
          <div className="p-6">
            {isApproved ? (
              <div className="mb-6 p-4 bg-green-900/40 text-green-200 rounded border border-green-700">
                <p className="font-semibold">
                  Your registration has been approved.
                </p>
                <p className="mt-1 text-sm text-green-300">
                  Your attendance history is now available below.
                </p>
              </div>
            ) : isRejected ? (
              <div className="mb-6 p-4 bg-red-900/40 text-red-200 rounded border border-red-700">
                <p className="font-semibold">
                  Your registration was not approved.
                </p>
                <p className="mt-1 text-sm text-red-300">
                  Please contact the driving school for more information.
                </p>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-amber-900/40 text-amber-200 rounded border border-amber-700">
                <p className="font-semibold">
                  Your registration is awaiting admin approval.
                </p>
                <p className="mt-1 text-sm text-amber-300">
                  Attendance history will be available after approval.
                </p>
              </div>
            )}

            {error && <p className="mb-4 text-red-300">{error}</p>}

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-text-secondary">NIC</dt>
                <dd className="text-text-primary">{student.nic}</dd>
              </div>
              <div>
                <dt className="text-sm text-text-secondary">Phone</dt>
                <dd className="text-text-primary">{student.phone}</dd>
              </div>
              <div>
                <dt className="text-sm text-text-secondary">Address</dt>
                <dd className="text-text-primary">{student.address || "—"}</dd>
              </div>
              <div>
                <dt className="text-sm text-text-secondary">Course Package</dt>
                <dd className="text-text-primary">
                  {student.coursePackage?.name || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-text-secondary">Submitted on</dt>
                <dd className="text-text-primary">
                  {new Date(student.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-text-secondary">Status</dt>
                <dd>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      isApproved
                        ? "bg-green-500/20 text-green-400"
                        : isRejected
                          ? "bg-red-500/20 text-red-400"
                          : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {student.status}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {isApproved && (
            <div className="border-t border-slate-700 p-6">
              <AttendanceTable attendance={attendance} editable={false} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-8">
      <span className="inline-block bg-surface border border-slate-700 text-accent text-xs px-3 py-1 rounded-full mb-4">
        Student portal
      </span>
      <h1 className="text-3xl font-bold text-text-primary mb-1">
        Student <span className="text-gradient-brand">registration</span>
      </h1>
      <p className="text-text-secondary mb-6">
        Complete your profile to get started.
      </p>

      <div className="rounded-xl bg-surface border border-slate-700 overflow-hidden shadow-[0_0_25px_-5px_var(--color-primary)] p-6">
        {error && <p className="mb-4 text-red-300">{error}</p>}

        <StudentForm
          initialData={{
            userId: user?._id || user?.id || "",
            coursePackage: preselectedCourse,
          }}
          onSubmit={handleRegister}
          submitLabel="Register"
          showUserId={false}
        />
      </div>
    </div>
  );
}
export default StudentRegistrationPage;
