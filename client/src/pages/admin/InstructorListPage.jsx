import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { Link } from "react-router-dom";

function InstructorListPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const res = await axiosInstance.get("/instructors");
      setInstructors(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="p-5">Loading...</h2>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">
        Instructor Management
      </h2>

      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">NIC</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">License</th>
            <th className="border p-2">Experience</th>
            <th className="border p-2">Qualification</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {instructors.map((ins) => (
            <tr key={ins._id}>
              <td className="border p-2">{ins.nic}</td>
              <td className="border p-2">{ins.phone}</td>
              <td className="border p-2">{ins.licenseNumber}</td>
              <td className="border p-2">{ins.experience}</td>
              <td className="border p-2">{ins.qualification}</td>
              <td className="border p-2">{ins.status}</td>
              <td className="border p-2">
                <div className="flex gap-2">

                  <Link
                    to={`/admin/instructors/${ins._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                    View
                  </Link>

                  <Link
                    to={`/admin/instructors/${ins._id}/performance`}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                    Performance
                  </Link>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InstructorListPage;