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
        `/lessons/instructor/${instructorId}`
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
    return <p>Loading lessons...</p>;
  }

  return (
    <div>
      <h1>My Lessons</h1>

      {message && <p>{message}</p>}

      {lessons.length === 0 ? (
        <p>No lessons assigned to you.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Student</th>
              <th>Vehicle</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson._id}>
                <td>
                  {new Date(lesson.date).toLocaleDateString()}
                </td>

                <td>
                  {lesson.startTime} - {lesson.endTime}
                </td>

                <td>{lesson.status}</td>

                <td>
                  {lesson.studentId?.userId?.name ||
                    lesson.studentId?.nic ||
                    lesson.studentId?._id ||
                    "N/A"}
                </td>

                <td>
                  {lesson.vehicleId?.registrationNumber ||
                    lesson.vehicleId?._id ||
                    "N/A"}
                </td>

                <td>
                  <button
                    onClick={() =>
                      navigate(`/instructor/lessons/${lesson._id}`)
                    }
                  >
                    View Lesson
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InstructorLessonsPage;