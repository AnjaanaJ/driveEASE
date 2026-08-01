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
      <h1 className="text-2xl font-semibold text-text-primary mb-6">
        Manage Course Packages
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-900/40 text-red-300 rounded border border-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-text-secondary">Loading...</div>
      ) : (
        <>
          <div className="bg-surface p-6 rounded-lg shadow mb-8 border border-slate-700">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              {editingCourse ? "Edit Course Package" : "Add New Course Package"}
            </h2>

            <CourseForm
              key={editingCourse?._id || "new"}
              initialData={editingCourse || {}}
              onSubmit={editingCourse ? handleUpdate : handleCreate}
              submitLabel={editingCourse ? "Update Course" : "Add Course"}
              onCancel={editingCourse ? () => setEditingCourse(null) : null}
            />
          </div>

          <div className="bg-surface rounded-lg shadow overflow-hidden border border-slate-700">
            <table className="w-full text-left">
              <thead className="bg-background text-text-secondary text-sm">
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
                  <tr key={course._id} className="border-t border-slate-700">
                    <td className="p-3 text-text-primary">{course.name}</td>
                    <td className="p-3 text-text-secondary">{course.type}</td>
                    <td className="p-3 text-text-primary">
                      Rs. {course.price.toLocaleString()}
                    </td>
                    <td className="p-3 text-text-secondary">
                      {course.lessonCount}
                    </td>
                    <td className="p-3 space-x-3">
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
          </div>
        </>
      )}
    </div>
  );
}

export default AdminCourseManagementPage;
