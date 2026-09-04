
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function InstructorLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      // Get logged-in instructor profile
      const instructorResponse = await axiosInstance.get("/instructors/me");

      const instructor =
        instructorResponse.data.data || instructorResponse.data;

      const instructorId = instructor._id;

      // Get lessons belonging to this instructor
      const response = await axiosInstance.get(
        "/lessons/instructor/" + instructorId
      );

      setLessons(response.data);
    } catch (error) {
      console.error("Error fetching instructor lessons:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to load instructor lessons."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold">
          Loading lessons...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-5">

      <h2 className="text-2xl font-bold mb-6">
        My Lessons
      </h2>

      {message && (
        <p className="text-red-600 mb-4">
          {message}
        </p>
      )}

      {lessons.length === 0 ? (
        <div className="border border-gray-300 rounded-lg p-4">
          <p>No lessons assigned to you.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="table-auto border-collapse border border-gray-300 w-full">

            <thead>
              <tr className="bg-background text-text-primary">

                <th className="border border-gray-300 p-3">
                  Date
                </th>

                <th className="border border-gray-300 p-3">
                  Time
                </th>

                <th className="border border-gray-300 p-3">
                  Status
                </th>

                <th className="border border-gray-300 p-3">
                  Student
                </th>

                <th className="border border-gray-300 p-3">
                  Vehicle
                </th>

                <th className="border border-gray-300 p-3">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {lessons.map((lesson) => (
                <tr key={lesson._id}>

                  <td className="border border-gray-300 p-3">
                    {new Date(lesson.date).toLocaleDateString()}
                  </td>

                  <td className="border border-gray-300 p-3">
                    {lesson.startTime} - {lesson.endTime}
                  </td>

                  <td className="border border-gray-300 p-3">
                    {lesson.status}
                  </td>

                  <td className="border border-gray-300 p-3">
                    {lesson.studentId?.userId?.name ||
                      lesson.studentId?.nic ||
                      lesson.studentId?._id ||
                      "N/A"}
                  </td>

                  <td className="border border-gray-300 p-3">
                    {lesson.vehicleId?.registrationNumber ||
                      lesson.vehicleId?._id ||
                      "N/A"}
                  </td>

                  <td className="border border-gray-300 p-3">

                    <button
                      onClick={() =>
                        navigate("/instructor/lessons/" + lesson._id)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View Lesson
                    </button>

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

export default InstructorLessonsPage;

