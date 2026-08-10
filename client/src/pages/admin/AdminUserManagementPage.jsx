import { useState, useEffect } from "react";
import {
  getAllUsers,
  approveUser,
  rejectUser,
  deleteUser,
  changeUserRole,
} from "../../api/adminApi";
import {
  getAllStudents,
  getStudentAttendance,
  approveStudent,
  rejectStudent,
} from "../../api/studentApi";
import { getAllCourses } from "../../api/courseApi";
import ApprovalTable from "../../components/admin/ApprovalTable";
import AttendanceTable from "../../components/students/AttendanceTable";

function AdminUserManagementPage() {
  const [users, setUsers] = useState([]);
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentAttendance, setSelectedStudentAttendance] = useState(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Student filter state (only affects the Students section below)
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [course, setCourse] = useState("");

  const fetchStudents = async (filters = {}) => {
    try {
      const data = await getAllStudents(filters);
      setStudentProfiles(data);
    } catch (err) {
      // Not critical enough to block the whole page - just log it
      console.error("Failed to load student profiles");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, studentsData, coursesData] = await Promise.all([
          getAllUsers(),
          getAllStudents(),
          getAllCourses(),
        ]);
        setUsers(usersData);
        setStudentProfiles(studentsData);
        setCourses(coursesData);
      } catch (err) {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const updateUserInList = (id, updatedFields) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u._id === id ? { ...u, ...updatedFields } : u)),
    );
  };
  // --- Student filter handlers ---
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchStudents({ search, status, course });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    fetchStudents({ search, status: value, course });
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setCourse(value);
    fetchStudents({ search, status, course: value });
  };

  const handleApprove = async (id) => {
    try {
      await approveUser(id);
      updateUserInList(id, { isApproved: true });
    } catch (err) {
      alert("Failed to approve user. Please try again.");
    }
  };

  const handleViewDetails = async (user) => {
    if (user.role !== "student") {
      setSelectedStudent(null);
      setSelectedStudentAttendance([]);
      return;
    }

    const profile = studentProfiles.find(
      (student) => student.userId?._id === user._id,
    );
    setSelectedStudent(profile || null);
    setSelectedStudentAttendance([]);

    if (profile?._id) {
      try {
        const attendanceData = await getStudentAttendance(profile._id);
        setSelectedStudentAttendance(
          Array.isArray(attendanceData) ? attendanceData : [],
        );
      } catch (err) {
        setSelectedStudentAttendance([]);
      }
    }
  };
  const handleApproveStudentProfile = async (id) => {
    try {
      await approveStudent(id);
      setSelectedStudent((prev) =>
        prev ? { ...prev, status: "Approved" } : prev,
      );
      setStudentProfiles((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: "Approved" } : s)),
      );
    } catch (err) {
      alert("Failed to approve student profile. Please try again.");
    }
  };

  const handleRejectStudentProfile = async (id) => {
    try {
      await rejectStudent(id);
      setSelectedStudent((prev) =>
        prev ? { ...prev, status: "Rejected" } : prev,
      );
      setStudentProfiles((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: "Rejected" } : s)),
      );
    } catch (err) {
      alert("Failed to reject student profile. Please try again.");
    }
  };
  const handleReject = async (id) => {
    try {
      await rejectUser(id);
      updateUserInList(id, { isApproved: false });
    } catch (err) {
      alert("Failed to reject user. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user? This cannot be undone.",
    );
    if (!confirmed) return;

    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user. Please try again.");
    }
  };
  const handleChangeRole = async (id, role) => {
    try {
      await changeUserRole(id, role);
      updateUserInList(id, { role });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to change role. Please try again.",
      );
    }
  };

  if (loading) {
    return <div className="p-8 text-white">Loading users...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }
  // Only students whose profile matches the current filter should show up
  // in the "Students" section of ApprovalTable. Admins/Instructors are
  // untouched.
  const studentUserIds = new Set(
    studentProfiles.map((s) => s.userId?._id).filter(Boolean),
  );
  const nonStudentUsers = users.filter((u) => u.role !== "student");
  const filteredStudentUsers = users.filter(
    (u) => u.role === "student" && studentUserIds.has(u._id),
  );

  return (
    <div className="min-h-screen p-8 md:p-12">
      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 mb-4">
        Admin panel
      </span>
      <h1 className="text-4xl font-bold text-white mb-2">
        User{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
          management
        </span>
      </h1>
      <p className="text-slate-400 mb-8">
        Review, approve, and manage student, instructor, and admin accounts.
      </p>

      
      <ApprovalTable
        users={[...nonStudentUsers, ...filteredStudentUsers]}
        studentProfiles={studentProfiles}
        onApprove={handleApprove}
        onReject={handleReject}
        onApproveStudentProfile={handleApproveStudentProfile}
        onRejectStudentProfile={handleRejectStudentProfile}
        onDelete={handleDelete}
        onChangeRole={handleChangeRole}
        onViewDetails={handleViewDetails}
      studentFilterBar={
      <form
        onSubmit={handleSearchSubmit}
        className="mb-6 flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
      >
        <input
          type="text"
          placeholder="Search students by NIC or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-primary)]"
        />
        <select
          value={status}
          onChange={handleStatusChange}
          className="bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-primary)]"
        >
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={course}
          onChange={handleCourseChange}
          className="bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-primary)]"
        >
          <option value="">All courses</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary)]/20 text-sky-300 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/30 transition-colors"
        >
          Search
        </button>
      </form>
      }
      />

      {selectedStudent && (
        <div className="mt-8 rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
          <h2 className="text-lg font-semibold mb-4">Student request review</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div>
              <p className="text-slate-400 mb-1">Applicant</p>
              <p className="font-medium text-white">
                {selectedStudent.userId?.name || "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Email</p>
              <p className="font-medium text-white">
                {selectedStudent.userId?.email || "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">NIC</p>
              <p className="font-medium text-white">{selectedStudent.nic}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Phone</p>
              <p className="font-medium text-white">{selectedStudent.phone}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Address</p>
              <p className="font-medium text-white">
                {selectedStudent.address || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Course package</p>
              <p className="font-medium text-white">
                {selectedStudent.coursePackage?.name || "Not selected"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-slate-400 text-sm">Profile status:</span>
            <span
              className={
                selectedStudent.status === "Approved"
                  ? "text-green-400 font-medium"
                  : selectedStudent.status === "Rejected"
                    ? "text-red-400 font-medium"
                    : "text-yellow-400 font-medium"
              }
            >
              {selectedStudent.status || "Pending"}
            </span>
          </div>

          <div className="mt-6">
            <AttendanceTable
              attendance={selectedStudentAttendance}
              editable={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUserManagementPage;
