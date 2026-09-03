
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function InstructorListPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    user: "",
    phone: "",
    nic: "",
    licenseNumber: "",
    experience: "",
    qualification: "",
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  // GET - Fetch all instructors
  const fetchInstructors = async () => {
    try {
      const response = await axiosInstance.get("/instructors");

      setInstructors(response.data.data || []);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // POST - Add new instructor
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosInstance.post("/instructors", formData);

      alert("Instructor added successfully!");

      setFormData({
        user: "",
        phone: "",
        nic: "",
        licenseNumber: "",
        experience: "",
        qualification: "",
      });

      await fetchInstructors();
    } catch (error) {
      console.error("Error adding instructor:", error);

      if (error.response && error.response.data) {
        alert(
          error.response.data.message ||
            "Failed to add instructor."
        );
      } else {
        alert("Failed to add instructor.");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-5">

      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-6">
        Instructor Management
      </h2>

      {/* Add Instructor */}
      <div className="border border-gray-300 rounded-lg p-5 mb-8">

        <h3 className="text-xl font-semibold mb-4">
          Add New Instructor
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* User ID */}
            <div>
              <label className="block mb-1 font-medium">
                User ID
              </label>

              <input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder="Enter User ID"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* NIC */}
            <div>
              <label className="block mb-1 font-medium">
                NIC
              </label>

              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                placeholder="Enter NIC"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* License Number */}
            <div>
              <label className="block mb-1 font-medium">
                License Number
              </label>

              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="Enter License Number"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block mb-1 font-medium">
                Experience
              </label>

              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Years of Experience"
                min="0"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="block mb-1 font-medium">
                Qualification
              </label>

              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Enter Qualification"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

          </div>

          {/* Add Button */}
          <button
            type="submit"
            className="mt-5 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Add Instructor
          </button>

        </form>
      </div>

      {/* Instructor List */}
      <h3 className="text-xl font-semibold mb-4">
        Instructors
      </h3>

      <div className="overflow-x-auto">

        <table className="table-auto border-collapse border border-gray-300 w-full">

          <thead>
            <tr className="bg-background text-text-primary">
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

            {instructors.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="border p-4 text-center"
                >
                  No instructors found.
                </td>
              </tr>
            ) : (
              instructors.map((instructor) => (
                <tr key={instructor._id}>

                  <td className="border p-2">
                    {instructor.nic}
                  </td>

                  <td className="border p-2">
                    {instructor.phone}
                  </td>

                  <td className="border p-2">
                    {instructor.licenseNumber}
                  </td>

                  <td className="border p-2">
                    {instructor.experience}
                  </td>

                  <td className="border p-2">
                    {instructor.qualification}
                  </td>

                  <td className="border p-2">
                    {instructor.status}
                  </td>

                  <td className="border p-2">

                    <div className="flex gap-2">

                      <Link
                        to={"/admin/instructors/" + instructor._id}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        View
                      </Link>

                      <Link
                        to={
                        "/admin/instructors/" +
                        instructor._id +
                        "/performance"
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                      Performance
                      </Link>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default InstructorListPage;

