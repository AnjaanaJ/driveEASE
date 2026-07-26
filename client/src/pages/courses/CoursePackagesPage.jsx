import { useState, useEffect } from "react";
import { getAllCourses } from "../../api/courseApi";

function CoursePackagesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        setError("Failed to load course packages");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading course packages...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Course Packages</h1>
      <p className="text-slate-500 mb-8">Choose the driving package that suits you best</p>

      {courses.length === 0 ? (
        <p className="text-slate-500">No course packages available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border border-slate-200 rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <span className="inline-block bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {course.type}
              </span>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">{course.name}</h2>
              <p className="text-slate-500 text-sm mb-4">{course.description}</p>
              <div className="text-2xl font-bold text-slate-800 mb-1">
                Rs. {course.price.toLocaleString()}
              </div>
              <div className="text-sm text-slate-500">{course.lessonCount} lessons</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CoursePackagesPage;