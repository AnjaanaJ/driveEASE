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

  return (
    <>
      {loading ? (
        <div className="p-8 text-center text-text-secondary">
          Loading course packages...
        </div>
      ) : error ? (
        <div className="p-8 text-center text-red-400">{error}</div>
      ) : (
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="text-center mb-14">
            <span className="inline-block bg-surface border border-slate-700 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Choose your path
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="text-text-primary">Course </span>
              <span className="text-gradient-brand">Packages</span>
            </h1>
            <p className="text-text-secondary text-lg">
              Pick the driving package that fits your journey
            </p>
          </div>

          {courses.length === 0 ? (
            <p className="text-text-secondary text-center">
              No course packages available yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course) => (
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
