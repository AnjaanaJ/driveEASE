import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getLessonById } from "../../services/lessonApi";
import LessonStatusBadge from "../../components/lessons/LessonStatusBadge";

function LessonDetailPage() {
  const { id } = useParams(); // reads the :id part from the URL

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await getLessonById(id);
        setLesson(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load lesson.");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]); // re-run if the id in the URL ever changes

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <Link to="/lessons" className="text-[var(--color-accent)] text-sm hover:underline">
        &larr; Back to all lessons
      </Link>

      <h1 className="text-2xl font-semibold text-white mt-4 mb-6">Lesson Detail</h1>

      {loading && <p className="text-slate-400">Loading lesson...</p>}
      {error && <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded">{error}</p>}

      {!loading && !error && lesson && (
        <div className="max-w-md bg-[var(--color-surface)]/70 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Status</span>
            <LessonStatusBadge status={lesson.status} />
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Date</span>
            <span className="text-white">{lesson.date?.split("T")[0]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Time</span>
            <span className="text-white">{lesson.startTime} - {lesson.endTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Student ID</span>
            <span className="text-white text-sm">{lesson.studentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Instructor ID</span>
            <span className="text-white text-sm">{lesson.instructorId}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonDetailPage;