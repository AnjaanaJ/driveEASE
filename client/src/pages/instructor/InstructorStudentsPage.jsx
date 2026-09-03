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

      const instructor =
        instructorResponse.data.data || instructorResponse.data;

      // Get students assigned to this instructor
      const response = await axiosInstance.get(
        "/instructors/" + instructor._id + "/students"
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
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold">
          Loading assigned students...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6">
        My Assigned Students
      </h2>

      {message && (
        <p className="text-red-600 mb-4">
          {message}
        </p>
      )}

      {students.length === 0 ? (
        <div className="border border-gray-300 rounded-lg p-4">
          <p>No students are currently assigned to you.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-background text-text-primary">
                <th className="border border-gray-300 p-3">
                  Name
                </th>
                <th className="border border-gray-300 p-3">
                  Email
                </th>
                <th className="border border-gray-300 p-3">
                  NIC
                </th>
                <th className="border border-gray-300 p-3">
                  Phone
                </th>
                <th className="border border-gray-300 p-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="border border-gray-300 p-3">
                    {student.userId?.name || "N/A"}
                  </td>

                  <td className="border border-gray-300 p-3">
                    {student.userId?.email || "N/A"}
                  </td>

                  <td className="border border-gray-300 p-3">
                    {student.nic || "N/A"}
                  </td>

                  <td className="border border-gray-300 p-3">
                    {student.phone || "N/A"}
                  </td>

                  <td className="border border-gray-300 p-3">
                    {student.status || "N/A"}
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

export default InstructorStudentsPage;