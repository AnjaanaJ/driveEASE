import { useState, useEffect, useRef } from "react";
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
  const formSectionRef = useRef(null);

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
      if (editingCourse?._id === id) setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      setError("Failed to delete course");
    }
  };
  const handleSelectRow = (course) => {
    setEditingCourse(course);
    formSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const typeBadgeColors = {
    Beginner: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    Refresher: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    VIP: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  };

  const totalCourses = courses.length;
  const totalLessons = courses.reduce(
    (sum, c) => sum + (c.lessonCount || 0),
    0,
  );
  const avgPrice = totalCourses
    ? Math.round(
        courses.reduce((sum, c) => sum + (c.price || 0), 0) / totalCourses,
      )
    : 0;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 mb-4">
        Admin panel
      </span>
      <h1 className="text-3xl font-bold text-text-primary mb-1">
        Manage <span className="text-gradient-brand">course packages</span>
      </h1>
      <p className="text-text-secondary mb-8">
        Add, edit, and remove course packages available to students.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-surface border border-slate-700 rounded-2xl p-5">
          <p className="text-text-secondary text-sm mb-1">Total packages</p>
          <p className="text-2xl font-bold text-text-primary">{totalCourses}</p>
        </div>
        <div className="bg-surface border border-slate-700 rounded-2xl p-5">
          <p className="text-text-secondary text-sm mb-1">
            Total lessons offered
          </p>
          <p className="text-2xl font-bold text-text-primary">{totalLessons}</p>
        </div>
        <div className="bg-surface border border-slate-700 rounded-2xl p-5">
          <p className="text-text-secondary text-sm mb-1">Average price</p>
          <p className="text-2xl font-bold text-text-primary">
            Rs. {avgPrice.toLocaleString()}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/40 text-red-300 rounded border border-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-text-secondary">Loading...</div>
      ) : (
        <div>
                    <div
            ref={formSectionRef}
            className="relative rounded-3xl border border-white/20 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 mb-8 overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-lg font-semibold text-white">
                  🧾{" "}
                  {editingCourse ? "Edit course package" : "Add new course package"}
                </h3>
                {editingCourse && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Editing: {editingCourse.name}
                  </span>
                )}
              </div>

              <CourseForm
                key={editingCourse?._id || "new"}
                initialData={editingCourse || {}}
                onSubmit={editingCourse ? handleUpdate : handleCreate}
                submitLabel={editingCourse ? "Update Course" : "Add Course"}
                onCancel={editingCourse ? () => setEditingCourse(null) : null}
              />
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/20 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />

            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-4">
                📦 All course packages{" "}
                <span className="text-slate-400 font-normal text-sm">
                  ({courses.length})
                </span>
              </h3>

              {courses.length === 0 ? (
                <div className="text-center py-14">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-slate-400">No course packages found.</p>
                  <p className="text-slate-500 text-sm mt-1">
                    Add your first package using the form above.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-white border-separate border-spacing-y-3">
                    <thead>
                      <tr className="text-gray-400 uppercase text-xs tracking-wider">
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-center">Type</th>
                        <th className="px-6 py-3 text-center">Price</th>
                        <th className="px-6 py-3 text-center">Lessons</th>
                        <th className="px-6 py-3 text-center">Features</th>
                        <th className="px-6 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => {
                        const isSelected = editingCourse?._id === course._id;
                        return (
                          <tr
                            key={course._id}
                            onClick={() => handleSelectRow(course)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-[var(--color-primary)]/15 hover:bg-[var(--color-primary)]/20"
                                : "bg-[var(--color-background)]/50 hover:bg-white/5"
                            }`}
                          >
                            <td className="px-6 py-5 rounded-l-2xl align-middle font-medium">
                              {course.name}
                            </td>
                            <td className="px-6 py-5 align-middle text-center">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                  typeBadgeColors[course.type] ||
                                  "bg-sky-500/15 text-sky-300 border-sky-500/30"
                                }`}
                              >
                                {course.type}
                              </span>
                            </td>
                            <td className="px-6 py-5 align-middle text-center text-gray-300">
                              Rs. {course.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-5 align-middle text-center text-gray-300">
                              {course.lessonCount}
                            </td>
                            <td className="px-6 py-5 align-middle text-center text-gray-300">
                              {course.features?.length
                                ? `${course.features.length} listed`
                                : "— none —"}
                            </td>
                            <td className="px-6 py-5 rounded-r-2xl align-middle">
                              <div className="flex flex-wrap justify-center items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectRow(course);
                                  }}
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(course._id);
                                  }}
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCourseManagementPage;
