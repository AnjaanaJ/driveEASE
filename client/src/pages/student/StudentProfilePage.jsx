import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getStudentByUserId,
  updateStudent,
  getStudentAttendance,
} from "../../api/studentApi";
import AttendanceTable from "../../components/students/AttendanceTable";
import DocumentUploader from "../../components/students/DocumentUploader";

const statusStyles = {
  Approved: {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-400/25",
    panel: "bg-emerald-500/10 border-emerald-400/20 text-emerald-100",
    detail: "Your registration is approved. Your attendance and documents are available below.",
  },
  Rejected: {
    badge: "bg-red-500/15 text-red-300 border-red-400/25",
    panel: "bg-red-500/10 border-red-400/20 text-red-100",
    detail: "Your registration was not approved. Please contact the driving school for more information.",
  },
  Pending: {
    badge: "bg-amber-500/15 text-amber-300 border-amber-400/25",
    panel: "bg-amber-500/10 border-amber-400/20 text-amber-100",
    detail: "Your registration is awaiting admin approval. Attendance and document upload will unlock after approval.",
  },
};

function StudentProfilePage() {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ phone: "", address: "", preferredVehicleType: "", preferredTransmission: "" });

  const fetchProfile = async () => {
    try {
      const data = await getStudentByUserId(user?.id || user?._id);
      setStudent(data);
      setFormData({
        phone: data.phone || "",
        address: data.address || "",
        preferredVehicleType: data.preferredVehicleType || "",
        preferredTransmission: data.preferredTransmission || "",
      });

      if (data?.status === "Approved" && data?._id) {
        const attendanceData = await getStudentAttendance(data._id);
        setAttendance(Array.isArray(attendanceData) ? attendanceData : []);
      }
    } catch (err) {
      setError("Could not load your profile. It may not be created yet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id || user?._id) fetchProfile();
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === "preferredVehicleType" && value !== "Car" ? { preferredTransmission: "" } : {}),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const updated = await updateStudent(student._id, formData);
      setStudent(updated.student);
      setSuccess("Profile updated successfully.");
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background p-8 text-text-secondary">Loading profile...</div>;
  }

  if (error && !student) {
    return (
      <div className="min-h-screen bg-background px-6 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-surface/70 p-8 text-center backdrop-blur-xl">
          <p className="mb-4 text-red-300">{error}</p>
          <a href="/student/register-profile" className="font-medium text-accent transition hover:text-white">
            Complete your registration &rarr;
          </a>
        </div>
      </div>
    );
  }

  const profileStatus = statusStyles[student.status] || statusStyles.Pending;
  const isApproved = student.status === "Approved";
  const initials = (user?.name || "Student")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
            My <span className="text-gradient-brand">profile</span>
          </h1>
          <p className="mt-2 text-text-secondary">Your personal details, learning preferences, and records in one place.</p>
        </div>

        {(success || error) && (
          <div className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${success ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200" : "border-red-400/25 bg-red-500/10 text-red-200"}`}>
            {success || error}
          </div>
        )}

        <div className="relative mb-6">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/15 to-accent/15 blur-xl" />
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/70 p-6 backdrop-blur-xl sm:p-8">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl font-bold text-white shadow-lg shadow-primary/20">
                  {initials}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Student account</p>
                  <h2 className="mt-1 text-xl font-bold text-text-primary">{user?.name || "Student"}</h2>
                  <p className="mt-1 text-sm text-text-secondary">{user?.email || "Student account"}</p>
                </div>
              </div>
              <div className="sm:text-right">
                <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-sm font-semibold ${profileStatus.badge}`}>
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
                  {student.status || "Pending"}
                </span>
                <p className="mt-2 max-w-xs text-sm text-text-secondary">{profileStatus.detail}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/70 p-6 transition duration-300 hover:border-primary/30 hover:bg-surface hover:shadow-2xl hover:shadow-primary/15 backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-white">Personal details</h2>
                <p className="mt-1 text-sm text-text-secondary">Your registered contact information.</p>
              </div>
              {!editing && (
                <button onClick={() => setEditing(true)} className="rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/60">
                  Edit profile
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-text-secondary">Phone number</label>
                  <input id="phone" type="text" name="phone" value={formData.phone} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-text-primary outline-none transition placeholder:text-text-secondary focus:border-accent focus:ring-2 focus:ring-accent/20" />
                </div>
                <div>
                  <label htmlFor="address" className="mb-2 block text-sm font-medium text-text-secondary">Address</label>
                  <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows="3" className="w-full resize-none rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-text-primary outline-none transition placeholder:text-text-secondary focus:border-accent focus:ring-2 focus:ring-accent/20" />
                </div>
                <div>
                  <label htmlFor="preferredVehicleType" className="mb-2 block text-sm font-medium text-text-secondary">Preferred vehicle type</label>
                  <select id="preferredVehicleType" name="preferredVehicleType" value={formData.preferredVehicleType} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20">
                    <option value="">Select a vehicle type</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                  </select>
                </div>
                {formData.preferredVehicleType === "Car" && (
                  <div>
                    <label htmlFor="preferredTransmission" className="mb-2 block text-sm font-medium text-text-secondary">Car transmission</label>
                    <select id="preferredTransmission" name="preferredTransmission" value={formData.preferredTransmission} onChange={handleChange} required className="w-full rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20">
                      <option value="">Select transmission</option>
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                  </div>
                )}
                <div className="flex gap-3">
                  <button type="submit" className="rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">Save changes</button>
                  <button type="button" onClick={() => setEditing(false)} className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-text-primary transition hover:bg-white/5">Cancel</button>
                </div>
              </form>
            ) : (
              <dl className="grid gap-4 sm:grid-cols-2">
                <DetailItem label="NIC" value={student.nic} />
                <DetailItem label="Phone" value={student.phone} />
                <div className="sm:col-span-2"><DetailItem label="Address" value={student.address || "Not added yet"} /></div>
              </dl>
            )}
          </section>

          <section className="rounded-3xl border border-white/10 bg-surface/70 p-6 transition duration-300 hover:border-primary/30 hover:bg-surface hover:shadow-2xl hover:shadow-primary/15 backdrop-blur-xl sm:p-8">
            <h2 className="text-xl font-extrabold text-white">Learning overview</h2>
            <p className="mt-1 text-sm text-text-secondary">Your selected package and learning setup.</p>
            <div className="mt-6 space-y-4">
              <OverviewItem label="Course package" value={student.coursePackage?.name || "Not assigned yet"} />
              <OverviewItem label="Preferred vehicle" value={student.preferredVehicleType ? `${student.preferredVehicleType}${student.preferredTransmission ? ` · ${student.preferredTransmission}` : ""}` : "Not selected yet"} />
              <OverviewItem label="Assigned instructor" value={student.assignedInstructor?.name || "Not yet assigned"} />
              <OverviewItem label="Attendance records" value={attendance.length} />
              <OverviewItem label="Uploaded documents" value={student.documents?.length || 0} />
              <OverviewItem label="Member since" value={student.createdAt ? new Date(student.createdAt).toLocaleDateString() : "-"} />
            </div>
          </section>
        </div>

        {isApproved && (
          <div className="mt-6 space-y-6">
            <AttendanceTable attendance={attendance} editable={false} />
            <div className="space-y-6">
              <DocumentUploader studentId={student._id} onUploadSuccess={fetchProfile} />
              {student.documents?.length > 0 && (
                <section className="rounded-xl border border-slate-700 bg-surface p-5">
                  <h2 className="text-lg font-semibold text-text-primary">My documents</h2>
                  <ul className="mt-3 space-y-2">
                     {student.documents.map((doc, index) => (
                      <li key={`${doc.fileName}-${index}`} className="flex items-center gap-2 rounded-lg bg-background/50 px-3 py-2 text-sm text-text-secondary">
                        <span className="text-accent">&#128196;</span>
                        
                          < a href={`http://localhost:5000${doc.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline hover:text-white transition"
                        >
                          {doc.fileName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailItem({ label, value, accent = false }) {
  return <div className="rounded-2xl border border-white/5 bg-background/35 p-4"><dt className="text-xs font-medium uppercase tracking-wider text-text-secondary">{label}</dt><dd className={`mt-2 break-words font-medium ${accent ? "text-accent" : "text-text-primary"}`}>{value}</dd></div>;
}

function OverviewItem({ label, value }) {
  return <div className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0"><span className="text-sm text-text-secondary">{label}</span><span className="font-semibold text-text-primary">{value}</span></div>;
}

export default StudentProfilePage;
