import { useState, useEffect } from "react";
import { getAllStudents } from "../../api/studentApi";



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
        ) : students.length === 0 ? (
          <p className="text-text-secondary">No students found.</p>
        ) : (
          <div className="bg-surface rounded-lg shadow overflow-hidden border border-slate-700">
            <table className="w-full text-left">
              <thead className="bg-background text-text-secondary text-sm">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">NIC</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Course Package</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-t border-slate-700">
                    <td className="p-3 text-text-primary">{student.userId?.name}</td>
                    <td className="p-3 text-text-secondary">{student.userId?.email}</td>
                    <td className="p-3 text-text-secondary">{student.nic}</td>
                    <td className="p-3 text-text-secondary">{student.phone}</td>
                    <td className="p-3 text-text-secondary">
                      {student.coursePackage?.name || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
  );
}

export default StudentListPage;