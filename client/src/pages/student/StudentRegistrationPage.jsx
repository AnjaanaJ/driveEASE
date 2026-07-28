import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../../api/studentApi";


function StudentRegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    nic: "",
    phone: "",
    address: "",
    coursePackage: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createStudent(formData);
      navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (

      <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-surface border border-slate-700 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-6 text-text-primary">
          Student Registration
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              User ID
            </label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              NIC
            </label>
            <input
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              required
              placeholder="200012345678"
              className="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="0771234567"
              className="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Course Package ID
            </label>
            <input
              type="text"
              name="coursePackage"
              value={formData.coursePackage}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
  );
}

export default StudentRegistrationPage;
