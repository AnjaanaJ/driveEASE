import { useState, useEffect } from "react";
import { getAllCourses } from "../../api/courseApi";

function StudentForm({ initialData = {}, onSubmit, submitLabel = "Save", showUserId = true }) {
  const [formData, setFormData] = useState({
    userId: initialData.userId || "",
    nic: initialData.nic || "",
    phone: initialData.phone || "",
    address: initialData.address || "",
    coursePackage: initialData.coursePackage || "",
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const selectedCourse = courses.find((c) => c._id === formData.coursePackage);

  // Load the list of course packages once, for the dropdown options
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load course packages");
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="mb-4 p-3 bg-red-900/40 text-red-300 rounded border border-red-700">
          {error}
        </div>
      )}

      {showUserId && (
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            User ID
          </label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          NIC
        </label>
        <input
          type="text"
          name="nic"
          value={formData.nic}
          onChange={handleChange}
          required
          placeholder="200012345678"
          className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="0771234567"
          className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
        />
      </div>

      <div>
  <label className="block text-sm font-medium text-text-secondary mb-1">
    Course Package
  </label>
  <select
    name="coursePackage"
    value={formData.coursePackage}
    onChange={handleChange}
    className="w-full bg-background border border-slate-600 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent"
  >
    <option value="">-- Select a course package --</option>
    {courses.map((course) => (
      <option key={course._id} value={course._id}>
        {course.name} ({course.type}) - Rs. {course.price}
      </option>
    ))}
  </select>

  {selectedCourse && (
    <div className="mt-3 p-4 bg-background border border-slate-700 rounded-lg">
      <p className="text-text-primary font-semibold mb-1">
        {selectedCourse.name}
      </p>
      <p className="text-text-secondary text-sm mb-2">
        {selectedCourse.description}
      </p>
      <div className="flex justify-between text-sm">
        <span className="text-accent font-semibold">
          Rs. {selectedCourse.price.toLocaleString()}
        </span>
        <span className="text-text-secondary">
          {selectedCourse.lessonCount} lessons
        </span>
      </div>
    </div>
  )}
</div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 rounded hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default StudentForm;