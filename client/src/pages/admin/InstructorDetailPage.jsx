import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function InstructorDetailPage() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const res = await axiosInstance.get(`/instructors/${id}`);
      setInstructor(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!instructor) return <h2 className="p-6">Loading...</h2>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Instructor Details
      </h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-3">

        <p><strong>NIC:</strong> {instructor.nic}</p>

        <p><strong>Phone:</strong> {instructor.phone}</p>

        <p><strong>License Number:</strong> {instructor.licenseNumber}</p>

        <p><strong>Experience:</strong> {instructor.experience} Years</p>

        <p><strong>Qualification:</strong> {instructor.qualification}</p>

        <p><strong>Status:</strong> {instructor.status}</p>

      </div>
    </div>
  );
}

export default InstructorDetailPage;