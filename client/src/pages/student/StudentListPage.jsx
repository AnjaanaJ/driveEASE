import { useState, useEffect } from "react";
import {
  getAllStudents,
  approveStudent,
  rejectStudent,
  deleteStudent,
} from "../../api/studentApi";
import { getAllCourses } from "../../api/courseApi";
import StudentTable from "../../components/students/StudentTable";

function StudentListPage() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Separate state for each filter input
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [course, setCourse] = useState("");

  const fetchStudents = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await getAllStudents(filters);
      setStudents(data);
    } catch (err) {
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  // Load the course list once, for the course filter dropdown
  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (err) {
      // Not critical if this fails - dropdown will just be empty
      console.error("Failed to load courses for filter dropdown");
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchStudents({ search, status, course });
  };
  // When a dropdown changes, re-fetch immediately (no need to click Search)
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
      await approveStudent(id);
      fetchStudents({ search, status, course });
    } catch (err) {
      setError("Failed to approve student");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectStudent(id);
      fetchStudents({ search, status, course });
    } catch (err) {
      setError("Failed to reject student");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student record? This cannot be undone."))
      return;
    try {
      await deleteStudent(id);
      fetchStudents({ search, status, course }); 
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
        <select
          value={status}
          onChange={handleStatusChange}
          className="bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
        >
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={course}
          onChange={handleCourseChange}
          className="bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
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
            onDelete={handleDelete}
          />
      )}
    </div>
  );
}

export default StudentListPage;
