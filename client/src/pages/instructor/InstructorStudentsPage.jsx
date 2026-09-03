import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function InstructorStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Get logged-in instructor profile
      const instructorResponse = await axiosInstance.get("/instructors/me");

      const instructor = instructorResponse.data.data || instructorResponse.data;

      // Get students assigned to this instructor
      const response = await axiosInstance.get(
        `/instructors/${instructor._id}/students`
      );

      setStudents(response.data.data || []);
    } catch (error) {
      console.error("Error fetching assigned students:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to load assigned students."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading assigned students...</p>;
  }

  return (
    <div>
      <h1>My Assigned Students</h1>

      {message && <p>{message}</p>}

      {students.length === 0 ? (
        <p>No students are currently assigned to you.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>NIC</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.userId?.name || "N/A"}</td>
                <td>{student.userId?.email || "N/A"}</td>
                <td>{student.nic || "N/A"}</td>
                <td>{student.phone || "N/A"}</td>
                <td>{student.status || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InstructorStudentsPage;