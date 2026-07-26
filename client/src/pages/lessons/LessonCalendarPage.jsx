import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllLessons, getLessonsByStudent, getLessonsByInstructor } from "../../services/lessonApi";
import CalendarView from "../../components/lessons/CalendarView";

function LessonCalendarPage() {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      const currentUserId = user?._id || user?.id;
      try {
        let res;
        if (user.role === "admin") {
          res = await getAllLessons();
        } else if (user.role === "instructor") {
          res = await getLessonsByInstructor(currentUserId);
        } else {
          res = await getLessonsByStudent(currentUserId);
        }
        setLessons(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load lessons.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchLessons();
  }, [user]);
  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <h1 className="text-2xl font-semibold text-white mb-6">Lesson Calendar</h1>

      {loading && <p className="text-slate-400">Loading calendar...</p>}
      {error && <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">{error}</p>}

      {!loading && !error && <CalendarView lessons={lessons} />}
    </div>
  );
}

export default LessonCalendarPage;