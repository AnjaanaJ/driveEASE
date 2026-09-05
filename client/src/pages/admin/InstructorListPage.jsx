
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
      <div className="min-h-screen p-8 md:p-12">
        <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
          <h2 className="text-2xl font-bold text-white">
            Loading instructors...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-12">
      {/* Page Header */}
      <div className="mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 mb-4">
          Admin panel
        </span>

        <h1 className="text-4xl font-bold text-white mb-2">
          Instructor{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
            management
          </span>
        </h1>

        <p className="text-slate-400">
          Add, review, and manage driving instructors.
        </p>
      </div>

      {/* Add Instructor */}
      <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl mb-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Add New Instructor
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Enter the instructor's professional and contact information.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* User ID */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                User ID
              </label>

              <input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder="Enter User ID"
                required
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* NIC */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                NIC
              </label>

              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                placeholder="Enter NIC"
                required
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* License Number */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                License Number
              </label>

              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="Enter License Number"
                required
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
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
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                Qualification
              </label>

              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Enter Qualification"
                required
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Add Button */}
          <button
            type="submit"
            className="mt-6 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary)]/20 text-sky-300 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/30 transition-colors"
          >
            Add Instructor
          </button>
        </form>
      </div>

      {/* Instructor List */}
      <div className="rounded-3xl border border-white/20 bg-white/[0.03] overflow-hidden text-white shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Instructors
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                View and manage registered instructors.
              </p>
            </div>

            <span className="rounded-full bg-white/[0.03] border border-white/20 px-3 py-1 text-sm text-slate-300">
              {instructors.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/[0.03] text-white">
                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  NIC
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Phone
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  License
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Experience
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Qualification
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Status
                </th>

                <th className="border-b border-white/10 p-4 text-left font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {instructors.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="border-b border-white/10 p-8 text-center text-slate-400"
                  >
                    No instructors found.
                  </td>
                </tr>
              ) : (
                instructors.map((instructor) => (
                  <tr
                    key={instructor._id}
                    className="transition-colors hover:bg-white/10"
                  >
                    <td className="border-b border-white/10 p-4 text-white">
                      {instructor.nic}
                    </td>

                    <td className="border-b border-white/10 p-4 text-slate-300">
                      {instructor.phone}
                    </td>

                    <td className="border-b border-white/10 p-4 text-slate-300">
                      {instructor.licenseNumber}
                    </td>

                    <td className="border-b border-white/10 p-4 text-slate-300">
                      {instructor.experience}
                    </td>

                    <td className="border-b border-white/10 p-4 text-slate-300">
                      {instructor.qualification}
                    </td>

                    <td className="border-b border-white/10 p-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                          instructor.status === "Approved"
                            ? "text-green-400 bg-green-500/10 border border-green-500/20"
                            : instructor.status === "Rejected"
                              ? "text-red-400 bg-red-500/10 border border-red-500/20"
                              : "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20"
                        }`}
                      >
                        {instructor.status}
                      </span>
                    </td>

                    <td className="border-b border-white/10 p-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={"/admin/instructors/" + instructor._id}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-primary)]/20 text-sky-300 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/30 transition-colors"
                        >
                          View
                        </Link>

                        <Link
                          to={
                            "/admin/instructors/" +
                            instructor._id +
                            "/performance"
                          }
                          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-primary)]/20 text-sky-300 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/30 transition-colors"
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
    </div>
  );
}

export default InstructorListPage;
