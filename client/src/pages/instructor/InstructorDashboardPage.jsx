import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function InstructorDashboardPage() {
  const [instructors, setInstructors] = useState([]);

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

  const fetchInstructors = async () => {
    try {
      const response = await axiosInstance.get("/instructors");
      setInstructors(response.data.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axiosInstance.post("/instructors", formData);

    fetchInstructors();

    setFormData({
      user: "",
      phone: "",
      nic: "",
      licenseNumber: "",
      experience: "",
      qualification: "",
    });

    alert("Instructor added successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to add instructor");
  }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Instructor Dashboard</h1>

      <form onSubmit={handleSubmit}>
  <input
    type="text"
    name="user"
    placeholder="User ID"
    value={formData.user}
    onChange={handleChange}
  />

  <input
    type="text"
    name="phone"
    placeholder="Phone"
    value={formData.phone}
    onChange={handleChange}
  />

  <input
    type="text"
    name="nic"
    placeholder="NIC"
    value={formData.nic}
    onChange={handleChange}
  />

  <input
    type="text"
    name="licenseNumber"
    placeholder="License Number"
    value={formData.licenseNumber}
    onChange={handleChange}
  />

  <input
    type="number"
    name="experience"
    placeholder="Experience"
    value={formData.experience}
    onChange={handleChange}
  />

  <input
    type="text"
    name="qualification"
    placeholder="Qualification"
    value={formData.qualification}
    onChange={handleChange}
  />

  <button type="submit">
    Add Instructor
  </button>
</form>

<br />

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Phone</th>
            <th>NIC</th>
            <th>License No</th>
            <th>Experience</th>
            <th>Qualification</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor._id}>
              <td>{instructor.phone}</td>
              <td>{instructor.nic}</td>
              <td>{instructor.licenseNumber}</td>
              <td>{instructor.experience}</td>
              <td>{instructor.qualification}</td>
              <td>{instructor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InstructorDashboardPage;