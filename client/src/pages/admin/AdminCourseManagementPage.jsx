import { useState, useEffect } from "react";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../api/courseApi";

function AdminCourseManagementPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "Beginner",
    description: "",
    price: "",
    lessonCount: "",
  });

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (err) {
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: "", type: "Beginner", description: "", price: "", lessonCount: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editingId) {
        await updateCourse(editingId, formData);
      } else {
        await createCourse(formData);
      }
      resetForm();
      fetchCourses();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);
    setFormData({
      name: course.name,
      type: course.type,
      description: course.description || "",
      price: course.price,
      lessonCount: course.lessonCount,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course package?")) return;
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (err) {
      setError("Failed to delete course");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">
        Manage Course Packages
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8 space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">
          {editingId ? "Edit Course Package" : "Add New Course Package"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2"
            >
              <option value="Beginner">Beginner</option>
              <option value="Refresher">Refresher</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Price (Rs.)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Lesson Count</label>
            <input
              type="number"
              name="lessonCount"
              value={formData.lessonCount}
              onChange={handleChange}
              required
              min="1"
              className="w-full border border-slate-300 rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded px-3 py-2"
            rows={2}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
          >
            {editingId ? "Update Course" : "Add Course"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-slate-200 text-slate-700 px-4 py-2 rounded hover:bg-slate-300 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Course List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-slate-600 text-sm">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Price</th>
              <th className="p-3">Lessons</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="border-t border-slate-100">
                <td className="p-3">{course.name}</td>
                <td className="p-3">{course.type}</td>
                <td className="p-3">Rs. {course.price.toLocaleString()}</td>
                <td className="p-3">{course.lessonCount}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-cyan-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCourseManagementPage;