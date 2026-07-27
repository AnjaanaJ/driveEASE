import { useState, useEffect } from "react";
import { getAllUsers,approveUser,rejectUser,deleteUser,changeUserRole } from "../../api/adminApi";
import ApprovalTable from "../../components/admin/ApprovalTable";
import Footer from "../../components/shared/Footer";

function AdminUserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
      <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
      <ApprovalTable users={users}
      onApprove={handleApprove}
      onReject={handleReject}
      onDelete={handleDelete}
      onChangeRole={handleChangeRole}
      />
    </div>
    
  );
}

export default AdminUserManagementPage;