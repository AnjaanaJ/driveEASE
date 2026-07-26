import { useState, useEffect } from "react";
import { getAllLessons } from "../../services/lessonApi";
import LessonTable from "../../components/lessons/LessonTable";

function LessonListPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await getAllLessons();
        setLessons(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load lessons.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []); // empty array = run once, when the page first loads

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <h1 className="text-2xl font-semibold text-white mb-6">All Lessons</h1>

      {loading && <p className="text-slate-400">Loading lessons...</p>}
      {error && <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded">{error}</p>}
      {!loading && !error && lessons.length === 0 && (
        <p className="text-slate-400">No lessons found.</p>
      )}
      {!loading && !error && lessons.length > 0 && <LessonTable lessons={lessons} />}
    </div>
  );
}

export default LessonListPage;