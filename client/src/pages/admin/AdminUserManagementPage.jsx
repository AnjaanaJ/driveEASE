import { useState, useEffect } from "react";
import { getAllUsers,approveUser,rejectUser,deleteUser,changeUserRole } from "../../api/adminApi";
import { getAllStudents } from "../../api/studentApi";
import ApprovalTable from "../../components/admin/ApprovalTable";

function AdminUserManagementPage() {
  const [users, setUsers] = useState([]);
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, studentsData] = await Promise.all([
          getAllUsers(),
          getAllStudents(),
        ]);
        setUsers(usersData);
        setStudentProfiles(studentsData);
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
      prevUsers.map((u) => (u._id === id ? { ...u, ...updatedFields } : u))
    );
  };

  const handleApprove = async (id) => {
    try {
      await approveUser(id);
      updateUserInList(id, { isApproved: true });
    } catch (err) {
      alert("Failed to approve user. Please try again.");
    }
  };

  const handleViewDetails = (user) => {
    if (user.role !== "student") {
      setSelectedStudent(null);
      return;
    }

    const profile = studentProfiles.find((student) => student.userId?._id === user._id);
    setSelectedStudent(profile || null);
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
    const confirmed = window.confirm("Are you sure you want to delete this user? This cannot be undone.");
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
      alert(err.response?.data?.message || "Failed to change role. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-8 text-white">Loading users...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen p-8 md:p-12">
      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 mb-4">
      Admin panel
      </span>
       <h1 className="text-4xl font-bold text-white mb-2">
        User <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">management</span>
      </h1>
      <p className="text-slate-400 mb-8">
        Review, approve, and manage student, instructor, and admin accounts.
      </p>
      <ApprovalTable users={users}
      onApprove={handleApprove}
      onReject={handleReject}
      onDelete={handleDelete}
      onChangeRole={handleChangeRole}
      onViewDetails={handleViewDetails}
      />

      {selectedStudent && (
        <div className="mt-8 rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
          <h2 className="text-lg font-semibold mb-4">Student request review</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div>
              <p className="text-slate-400 mb-1">Applicant</p>
              <p className="font-medium text-white">{selectedStudent.userId?.name || "Unknown"}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Email</p>
              <p className="font-medium text-white">{selectedStudent.userId?.email || "Unknown"}</p>
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
              <p className="font-medium text-white">{selectedStudent.address || "Not provided"}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-1">Course package</p>
              <p className="font-medium text-white">{selectedStudent.coursePackage?.name || "Not selected"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default AdminUserManagementPage;