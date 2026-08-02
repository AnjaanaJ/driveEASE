import { useState, useEffect } from "react";
import {
  getAllStudents,
  approveStudent,
  rejectStudent,
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

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-semibold text-text-primary mb-6">
        All Students
      </h1>

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
        <StudentTable
          students={students}
          showActions={true}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

export default StudentListPage;
