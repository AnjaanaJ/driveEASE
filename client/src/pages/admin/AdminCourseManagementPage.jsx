import { useState, useEffect } from "react";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../api/courseApi";
import CourseForm from "../../components/courses/CourseForm";

function AdminCourseManagementPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);

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

  const handleCreate = async (formData) => {
    await createCourse(formData);
    fetchCourses();
  };

  const handleUpdate = async (formData) => {
    if (!editingCourse?._id) return;
    await updateCourse(editingCourse._id, formData);
    setEditingCourse(null);
    fetchCourses();
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

  return (
    <div className="max-w-4xl mx-auto p-8">
      <span className="inline-block bg-surface border border-slate-700 text-accent text-xs px-3 py-1 rounded-full mb-4">
        Admin panel
      </span>
      <h1 className="text-3xl font-bold text-text-primary mb-1">
        Manage <span className="text-gradient-brand">course packages</span>
      </h1>
      <p className="text-text-secondary mb-8">
        Add, edit, and remove course packages available to students.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-900/40 text-red-300 rounded border border-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-text-secondary">Loading...</div>
      ) : (
        <div>
          <div className="bg-surface rounded-xl mb-8 border border-slate-700 overflow-hidden shadow-[0_0_25px_-5px_var(--color-primary)]">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-700">
              <span className="text-lg">🧾</span>
              <h2 className="text-lg font-semibold text-text-primary">
                {editingCourse ? "Edit course package" : "Add new course package"}
              </h2>
            </div>
            <div className="p-6">
              <CourseForm
                key={editingCourse?._id || "new"}
                initialData={editingCourse || {}}
                onSubmit={editingCourse ? handleUpdate : handleCreate}
                submitLabel={editingCourse ? "Update Course" : "Add Course"}
                onCancel={editingCourse ? () => setEditingCourse(null) : null}
              />
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-slate-700 overflow-hidden shadow-[0_0_25px_-5px_var(--color-primary)]">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-700">
              <span className="text-lg">📦</span>
              <h2 className="text-lg font-semibold text-text-primary">
                All course packages
              </h2>
            </div>

            {courses.length === 0 ? (
              <p className="text-text-secondary text-center py-10">
                No course packages found.
              </p>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-background text-text-secondary text-sm">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Lessons</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr
                      key={course._id}
                      className="border-t border-slate-700 hover:bg-background/50 transition"
                    >
                      <td className="p-4 text-text-primary font-medium">
                        {course.name}
                      </td>
                      <td className="p-4">
                        <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                          {course.type}
                        </span>
                      </td>
                      <td className="p-4 text-text-primary">
                        Rs. {course.price.toLocaleString()}
                      </td>
                      <td className="p-4 text-text-secondary">
                        {course.lessonCount}
                      </td>
                      <td className="p-4 space-x-3">
                        <button
                          onClick={() => setEditingCourse(course)}
                          className="text-accent hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCourseManagementPage;
