import { useState, useEffect } from "react";
import {
  getAllStudents,
  approveStudent,
  rejectStudent,
  deleteStudent,
} from "../../api/studentApi";
import StudentTable from "../../components/students/StudentTable";

function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchStudents = async (searchTerm = "") => {
    try {
      setLoading(true);
      const data = await getAllStudents(searchTerm);
      setStudents(data);
    } catch (err) {
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchStudents(search);
  };
  const handleApprove = async (id) => {
    try {
      await approveStudent(id);
      fetchStudents(search);
    } catch (err) {
      setError("Failed to approve student");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectStudent(id);
      fetchStudents(search);
    } catch (err) {
      setError("Failed to reject student");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student record? This cannot be undone.")) return;
    try {
      await deleteStudent(id);
      fetchStudents(search);
    } catch (err) {
      setError("Failed to delete student");
    }
  };

   return (
    <div className="max-w-5xl mx-auto p-8">
      <span className="inline-block bg-surface border border-slate-700 text-accent text-xs px-3 py-1 rounded-full mb-4">
        Admin panel
      </span>
      <h1 className="text-3xl font-bold text-text-primary mb-1">
        Student <span className="text-gradient-brand">management</span>
      </h1>
      <p className="text-text-secondary mb-8">
        View, search, and manage student profile approvals.
      </p>

      <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Search by NIC or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-900/40 text-red-300 rounded border border-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-text-secondary">Loading...</div>
      ) : (
        <div className="rounded-xl overflow-hidden shadow-[0_0_25px_-5px_var(--color-primary)]">
          <StudentTable
            students={students}
            showActions={true}
            onApprove={handleApprove}
            onReject={handleReject}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default StudentListPage;
