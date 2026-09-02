import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getLessonById, updateLesson, cancelLesson } from "../../services/lessonApi";
import LessonStatusBadge from "../../components/lessons/LessonStatusBadge";

function LessonDetailPage() {
  const { id } = useParams();//reads the :id part from the URL
  const { user } = useAuth(); 

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [remarks, setRemarks] = useState("");

  const fetchLesson = async () => {
    try {
      const res = await getLessonById(id);
      setLesson(res.data);
      setProgress(res.data.progress || "");
      setRemarks(res.data.remarks || "");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load lesson.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [id]);//re-run if the id in the URL ever changes
  
  const currentUserId = user?._id || user?.id;
  const isOwner = lesson && currentUserId === lesson.studentId;
  const canCancel = lesson?.status === "Scheduled" && (isOwner || user?.role === "admin");
  const canReschedule = canCancel; // same rule for now
  const canMarkCompleted = lesson?.status === "Scheduled" && user?.role !== "student";

  const handleCancel = async () => {
    setActionLoading(true);
    setError("");
    setActionMessage("");
    try {
      await cancelLesson(id);
      setActionMessage("Lesson cancelled successfully.");
      await fetchLesson(); //re-fetch to show the updated status
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel lesson.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReschedule = async (e) => {
    e.preventDefault();
    if (!newDate || !newStartTime || !newEndTime) {
      setError("Please fill in the new date and time.");
      return;
    }

    setActionLoading(true);
    setError("");
    setActionMessage("");
    try {
      await updateLesson(id, { date: newDate, startTime: newStartTime, endTime: newEndTime });
      setActionMessage("Lesson rescheduled successfully.");
      setShowReschedule(false);
      await fetchLesson();
    } catch (err) {
      if (err.response?.status === 409) {
        setError("That time conflicts with another booking. Please choose a different time.");
      } else {
        setError(err.response?.data?.message || "Failed to reschedule lesson.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkCompleted = async () => {
    setActionLoading(true);
    setError("");
    setActionMessage("");
    try {
      await updateLesson(id, { status: "Completed" });
      setActionMessage("Lesson marked as completed.");
      await fetchLesson();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status.");
    } finally {
      setActionLoading(false);
    }
  };
  const handleSaveProgress = async (e) => {
    e.preventDefault();

    setActionLoading(true);
    setError("");
    setActionMessage("");

    try {
     await updateLesson(id, {
       progress,
       remarks,
    });

    setActionMessage("Progress and remarks updated successfully.");
    await fetchLesson();
    } catch (err) {
    setError(
      err.response?.data?.message ||
      "Failed to update progress and remarks."
    );
    } finally {
    setActionLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">

  <Link
    to={
      user?.role === "admin"
        ? "/admin/lessons"
        : user?.role === "instructor"
        ? "/instructor/lessons"
        : "/student/lessons"
    }
    className="text-[var(--color-accent)] text-sm hover:underline"
  >
    &larr; Back to all lessons
  </Link>
  
      <h1 className="text-2xl font-semibold text-white mt-4 mb-6">Lesson Details</h1>

      {loading && <p className="text-slate-400">Loading lesson...</p>}
      {error && <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded">{error}</p>}
      {actionMessage && <p className="bg-green-500/10 text-green-400 text-sm p-2 rounded mb-4">{actionMessage}</p>}

      {!loading && lesson && (
        <div className="max-w-md bg-[var(--color-surface)]/70 backdrop-blur-xl border border-white/20 p-6 rounded-2xl space-y-3 shadow-[0_0_30px_-5px_var(--color-accent)]">
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
          <div className="pt-3 border-t border-white/10">
            <h2 className="text-white font-medium mb-3">
              Lesson Progress & Remarks
            </h2>

            <form onSubmit={handleSaveProgress} className="space-y-3">

          <div>
            <label className="block text-slate-300 mb-1 text-sm">
              Progress
            </label>

            <textarea
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              placeholder="Enter student's lesson progress..."
              rows="3"
              disabled={user?.role !== "instructor"}
              className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 text-sm disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1 text-sm">
              Remarks
            </label>

            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks about the lesson..."
              rows="3"
              disabled={user?.role !== "instructor"}
              className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 text-sm disabled:opacity-60"
            />
          </div>

         {user?.role === "instructor" && (
         <button
           type="submit"
           disabled={actionLoading}
           className="w-full py-2 rounded-md text-sm text-white bg-[var(--color-accent)] hover:opacity-90 disabled:opacity-50"
         >
          {actionLoading
           ? "Saving..."
           : "Save Progress & Remarks"}
         </button>
         )}

            </form>
          </div>

        <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
            {canReschedule && (
              <button
                onClick={() => setShowReschedule(!showReschedule)}
                className="px-3 py-1.5 rounded-md text-sm bg-slate-800 text-white hover:bg-slate-700 transition"
              >
                {showReschedule ? "Cancel edit" : "Reschedule"}
              </button>
            )}
            {canCancel && (
              <button
                onClick={handleCancel}
                disabled={actionLoading}
                className="px-3 py-1.5 rounded-md text-sm bg-red-600/80 text-white hover:bg-red-600 transition disabled:opacity-50"
              >
                {actionLoading ? "Cancelling..." : "Cancel Lesson"}
              </button>
            )}
            {canMarkCompleted && (
              <button
                onClick={handleMarkCompleted}
                disabled={actionLoading}
                className="px-3 py-1.5 rounded-md text-sm bg-green-600/80 text-white hover:bg-green-600 transition disabled:opacity-50"
              >
                {actionLoading ? "Updating..." : "Mark Completed"}
              </button>
            )}
          </div>

          {/* Reschedule form */}
          {showReschedule && (
            <form onSubmit={handleReschedule} className="pt-3 border-t border-white/10 space-y-2">
              <div>
                <label className="block text-slate-300 mb-1 text-xs">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-md bg-slate-900/60 text-white border border-slate-700 text-sm"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-slate-300 mb-1 text-xs">Start Time</label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-md bg-slate-900/60 text-white border border-slate-700 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-slate-300 mb-1 text-xs">End Time</label>
                  <input
                    type="time"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-md bg-slate-900/60 text-white border border-slate-700 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-1.5 rounded-md text-sm text-white bg-[var(--color-accent)] hover:opacity-90 disabled:opacity-50"
              >
                {actionLoading ? "Saving..." : "Confirm Reschedule"}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
      
  );
}
export default LessonDetailPage;