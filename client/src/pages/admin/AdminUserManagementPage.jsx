import { useState, useEffect } from "react";
import { getAllUsers } from "../../api/adminApi";
import ApprovalTable from "../../components/admin/ApprovalTable";

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

  if (loading) {
    return <div className="p-8 text-white">Loading users...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
      <ApprovalTable users={users} />
    </div>
  );
}

export default AdminUserManagementPage;