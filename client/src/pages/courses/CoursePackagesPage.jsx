import Footer from "../../components/shared/Footer";
import { useState, useEffect } from "react";
import { getAllCourses } from "../../api/courseApi";
import CoursePackageCard from "../../components/courses/CoursePackageCard";

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
  const order = ["Beginner", "VIP", "Refresher"];
const sortedCourses = [...courses].sort(
  (a, b) => order.indexOf(a.type) - order.indexOf(b.type)
);

  return (
    <>
      {loading ? (
        <div className="p-8 text-center text-text-secondary">
          Loading course packages...
        </div>
      ) : error ? (
        <div className="p-8 text-center text-red-400">{error}</div>
      ) : (
        <div className="mx-auto max-w-6xl p-8 md:p-12">
          <div className="mb-10">
            <span className="mb-4 inline-block rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-medium text-sky-300">
              Course catalogue
            </span>
            <h1 className="mb-2 text-4xl font-bold text-white">
              <span>Course </span>
              <span className="text-gradient-brand">Packages</span>
            </h1>
            <p className="text-slate-400">
              Pick the driving package that fits your journey.
            </p>
          </div>

          {courses.length === 0 ? (
  <p className="text-text-secondary text-center">
    No course packages available yet.
  </p>
) : (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
    {sortedCourses.map((course) => (
      <CoursePackageCard key={course._id} course={course} />
    ))}
  </div>
)}
        </div>
      )}
    </>
  );
}

export default CoursePackagesPage;
