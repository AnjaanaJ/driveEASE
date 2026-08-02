import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getStudentByUserId, updateStudent, getStudentAttendance } from "../../api/studentApi";
import AttendanceTable from "../../components/students/AttendanceTable";

function StudentProfilePage() {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getStudentByUserId(user.id);
        setStudent(data);
        setFormData({ phone: data.phone, address: data.address || "" });

        if (data?._id) {
          const attendanceData = await getStudentAttendance(data._id);
          setAttendance(Array.isArray(attendanceData) ? attendanceData : []);
        }
      } catch (err) {
        setError("Could not load your profile. It may not be created yet.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const updated = await updateStudent(student._id, formData);
      setStudent(updated.student);
      setSuccess("Profile updated successfully");
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <div className="p-8 text-text-secondary">Loading profile...</div>;
  }

  if (error && !student) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <a
          href="/student/register-profile"
          className="text-accent hover:underline"
        >
          Complete your registration →
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-surface border border-slate-700 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6 text-text-primary">
        My Profile
      </h1>

      {success && (
        <div className="mb-4 p-3 bg-green-900/40 text-green-300 rounded border border-green-700">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-900/40 text-red-300 rounded border border-red-700">
          {error}
        </div>
      )}

      {!editing ? (
        <div className="space-y-3">
          <div>
            <span className="text-text-secondary text-sm">NIC</span>
            <p className="text-text-primary">{student.nic}</p>
          </div>
          <div>
            <span className="text-text-secondary text-sm">Phone</span>
            <p className="text-text-primary">{student.phone}</p>
          </div>
          <div>
            <span className="text-text-secondary text-sm">Address</span>
            <p className="text-text-primary">{student.address || "—"}</p>
          </div>
          <div>
            <span className="text-text-secondary text-sm">Course Package</span>
            <p className="text-text-primary">
              {student.coursePackage?.name || "—"}
            </p>
          </div>

          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition"
          >
            Edit Profile
          </button>
          <div className="mt-6">
            <AttendanceTable attendance={attendance} editable={false} />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-slate-700 text-text-primary px-4 py-2 rounded hover:bg-slate-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default StudentProfilePage;
