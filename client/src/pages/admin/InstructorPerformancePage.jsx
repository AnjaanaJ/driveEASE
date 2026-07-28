import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function InstructorPerformancePage() {
  const { id } = useParams();
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    try {
      const res = await axiosInstance.get(`/instructors/${id}/performance`);
      setPerformance(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!performance) return <h2 className="p-6">Loading...</h2>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Instructor Performance
      </h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">

        <p>
          <strong>Total Students:</strong>{" "}
          {performance.totalStudents}
        </p>

        <p>
          <strong>Availability Slots:</strong>{" "}
          {performance.availabilitySlots}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {performance.status}
        </p>

      </div>
    </div>
  );
}

export default InstructorPerformancePage;