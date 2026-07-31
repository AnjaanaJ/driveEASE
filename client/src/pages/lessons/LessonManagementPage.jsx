import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getAllLessons,
  getLessonsByStudent,
  getLessonsByInstructor,
  bookLesson,
  updateLesson,
  cancelLesson,
} from "../../services/lessonApi";
import CalendarView from "../../components/lessons/CalendarView";
import TimeSlotPicker from "../../components/lessons/TimeSlotPicker";
import LessonTable from "../../components/lessons/LessonTable";
import LessonStatusBadge from "../../components/lessons/LessonStatusBadge";
import NotificationBell from "../../components/lessons/NotificationBell";

function LessonManagementPage() {
  const { user } = useAuth();
  const currentUserId = user?._id || user?.id;

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [expandedLessonId, setExpandedLessonId] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");

  const fetchLessons = async () => {
    try {
      let res;
      if (user.role === "admin") res = await getAllLessons();
      else if (user.role === "instructor") res = await getLessonsByInstructor(currentUserId);
      else res = await getLessonsByStudent(currentUserId);
      setLessons(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load lessons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchLessons();
  }, [user]);

  // Group lessons by date,used for the admin/instructor "lessons on this day" view
  const lessonsByDate = {};
  lessons.forEach((l) => {
    const key = l.date?.split("T")[0];
    if (!key) return;
    if (!lessonsByDate[key]) lessonsByDate[key] = [];
    lessonsByDate[key].push(l);
  });

  const handleSlotSelect = (slot) => {
    const [hour] = slot.split(":");
    const endHour = String(Number(hour) + 1).padStart(2, "0");
    setSelectedSlot(slot);
    setSelectedEndTime(`${endHour}:00`);
  };

  const [selectedEndTime, setSelectedEndTime] = useState("");

   const expandedLesson = lessons.find((l) => l._id === expandedLessonId);
   const currentUserRole = user?.role;
   const isOwner = expandedLesson && currentUserId === expandedLesson.studentId;
   const canCancel = expandedLesson?.status === "Scheduled" && (isOwner || currentUserRole === "admin");
   const canReschedule = canCancel;
   const canMarkCompleted = expandedLesson?.status === "Scheduled" && currentUserRole !== "student";

   const handleCancelLesson = async () => {
    setActionLoading(true);
    setActionError("");
    setActionMessage("");
    try {
        await cancelLesson(expandedLessonId);
        setActionMessage("Lesson cancelled successfully.");
        await fetchLessons();
    } catch (err) {
        setActionError(err.response?.data?.message || "Failed to cancel lesson.");
    } finally {
        setActionLoading(false);
    }
    };

    const handleRescheduleLesson = async (e) => {
        e.preventDefault();
        if (!newDate || !newStartTime || !newEndTime) {
            setActionError("Please fill in the new date and time.");
            return;
    }

    const chosenDate = new Date(newDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosenDate < today) {
        setActionError("Cannot reschedule to a past date.");
        return;
    }

    if (newEndTime <= newStartTime) {
        setActionError("End time must be after start time.");
        return;
    }
    const [startH, startM] = newStartTime.split(":").map(Number);
    const [endH, endM] = newEndTime.split(":").map(Number);
    const durationMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    if (durationMinutes > 60) {
        setActionError("Lesson duration cannot exceed 1 hours.");
        return;
    }
    setActionLoading(true);
    setActionError("");
    setActionMessage("");
    try {
        await updateLesson(expandedLessonId, { date: newDate, startTime: newStartTime, endTime: newEndTime });
        setActionMessage("Lesson rescheduled successfully.");
        setShowReschedule(false);
        await fetchLessons();
    } catch (err) {
        if (err.response?.status === 409) {
            setActionError("That time conflicts with another booking.");
        } else {
            setActionError(err.response?.data?.message || "Failed to reschedule lesson.");
        }
    } finally {
        setActionLoading(false);
    }
    };

    const handleMarkCompletedLesson = async () => {
        setActionLoading(true);
        setActionError("");
        setActionMessage("");
    try {
        await updateLesson(expandedLessonId, { status: "Completed" });
        setActionMessage("Lesson marked as completed.");
        await fetchLessons();
    } catch (err) {
        setActionError(err.response?.data?.message || "Failed to update status.");
    } finally {
        setActionLoading(false);
    }
};

    const handleConfirmBooking = async () => {
        if (!selectedDate || !selectedSlot || !instructorId || !vehicleId) {
            setError("Please select instructor, vehicle, and a time slot.");
            return;
        }
        const chosenDate = new Date(selectedDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
            if (chosenDate < today) {
                setError("Booking date cannot be in the past.");
                return;
            }
            setSubmitting(true);
            setError("");
            setSuccessMsg("");
            try {
                await bookLesson({
                    studentId: currentUserId,
                    instructorId,
                    vehicleId,
                    date: selectedDate,
                    startTime: selectedSlot,
                    endTime: selectedEndTime,
            });
                setSuccessMsg("Lesson booked successfully!");
                setSelectedSlot("");
                await fetchLessons();
                } catch (err) {
                    if (err.response?.status === 409) {
                        setError("That slot is already booked. Please choose another.");
                    } else {
                        setError(err.response?.data?.message || "Failed to book lesson.");
                    }
                } finally {
                    setSubmitting(false);
                }
    };

    const roleLabel =
    user?.role === "admin" ? "Admin panel" : user?.role === "instructor" ? "Instructor panel" : "Student panel";

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-6 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full border border-[var(--color-accent)]/40 text-[var(--color-accent)] text-xs font-medium mb-3">
              {roleLabel}
            </span>
            <h1 className="text-3xl font-bold text-white">
              Lesson <span className="text-gradient-brand">booking</span>
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Book, reschedule, and manage driving lessons with real-time availability.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />
            {user?.role === "student" && (
              <button
                onClick={() => {
                  if (!selectedDate) setSelectedDate(new Date().toISOString().split("T")[0]);
                  setTimeout(
                    () => document.getElementById("confirm-booking-section")?.scrollIntoView({ behavior: "smooth" }),
                    100
                  );
                }}
                className="px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:opacity-90 transition"
              >
                + New Booking
              </button>
            )}
          </div>
        </div>

        {error && <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded">{error}</p>}
        {successMsg && <p className="bg-green-500/10 text-green-400 text-sm p-2 rounded">{successMsg}</p>}

        {/* Calendar */}
        {loading ? (
          <p className="text-slate-400">Loading calendar...</p>
        ) : (
          <CalendarView
            lessons={lessons}
            onSelectDate={setSelectedDate}
            selectedDate={selectedDate}
            onSelectLesson={(id) => {
                setExpandedLessonId(id);
                setTimeout(() => document.getElementById("lesson-detail-section")?.scrollIntoView({ behavior: "smooth" }), 100);
             }}
            />
        )}

        {/* Admin/Instructor,view lessons on selected date */}
        {selectedDate && user?.role !== "student" && (
          <div className="bg-[var(--color-surface)]/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_30px_-5px_var(--color-accent)]">
            <h2 className="text-white font-medium mb-4">Lessons on {selectedDate}</h2>
            {(lessonsByDate[selectedDate] || []).length === 0 ? (
              <p className="text-slate-400 text-sm">No lessons on this date.</p>
            ) : (
              <ul className="divide-y divide-white/10">
                {lessonsByDate[selectedDate].map((l) => (
                  <li key={l._id} className="py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                    <button
                        onClick={() => setExpandedLessonId(expandedLessonId === l._id ? null : l._id)}
                        className="text-[var(--color-accent)] hover:underline font-medium"
                    >
                        {l.startTime} - {l.endTime}
                    </button>
                    <span className="text-slate-400">
                      Student: {typeof l.studentId === "object" && l.studentId !== null ? l.studentId?.userId?.name || l.studentId?.nic || l.studentId?._id : l.studentId || "—"}
                    </span>
                    <span className="text-slate-400">
                      Instructor: {typeof l.instructorId === "object" && l.instructorId !== null ? l.instructorId?.user?.name || l.instructorId?._id : l.instructorId || "—"}
                      </span>
                    <LessonStatusBadge status={l.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        
        {expandedLesson && (
            <div id="lesson-detail-section" className="bg-[var(--color-surface)]/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_30px_-5px_var(--color-accent)] space-y-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-white font-medium">Lesson Detail</h2>
                    <button onClick={() => setExpandedLessonId(null)} className="text-slate-400 hover:text-white text-sm">✕ Close</button>
                </div>

        {actionMessage && <p className="bg-green-500/10 text-green-400 text-sm p-2 rounded">{actionMessage}</p>}
        {actionError && <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded">{actionError}</p>}


        <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Status</span>
                <LessonStatusBadge status={expandedLesson.status} />
        </div>
        <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Date</span>
            <span className="text-white">{expandedLesson.date?.split("T")[0]}</span>
        </div>
        <div className="flex justify-between">
            <span className="text-slate-400 text-sm">Time</span>
            <span className="text-white">{expandedLesson.startTime} - {expandedLesson.endTime}</span>
        </div>


        <div className="flex justify-between">
          <span className="text-slate-400 text-sm">Student ID</span>
          <span className="text-white text-sm">
            {typeof expandedLesson.studentId === "object" && expandedLesson.studentId !== null
            ? expandedLesson.studentId?.userId?.name || expandedLesson.studentId?.nic || expandedLesson.studentId?._id
            : expandedLesson.studentId || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 text-sm">Instructor ID</span>
          <span className="text-white text-sm">
            {typeof expandedLesson.instructorId === "object" && expandedLesson.instructorId !== null
            ? expandedLesson.instructorId?.user?.name || expandedLesson.instructorId?.licenseNumber || expandedLesson.instructorId?._id
            : expandedLesson.instructorId || "—"}
          </span>
        </div>

        <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
            {canReschedule && (
                <button onClick={() => setShowReschedule(!showReschedule)} className="px-3 py-1.5 rounded-md text-sm bg-slate-800 text-white hover:bg-slate-700 transition">
                    {showReschedule ? "Cancel edit" : "Reschedule"}
                </button>
            )}
            {canCancel && (
                <button onClick={handleCancelLesson} disabled={actionLoading} className="px-3 py-1.5 rounded-md text-sm bg-red-600/80 text-white hover:bg-red-600 transition disabled:opacity-50">
                    {actionLoading ? "Cancelling..." : "Cancel Lesson"}
                </button>
            )}
            {canMarkCompleted && (
                <button onClick={handleMarkCompletedLesson} disabled={actionLoading} className="px-3 py-1.5 rounded-md text-sm bg-green-600/80 text-white hover:bg-green-600 transition disabled:opacity-50">
                    {actionLoading ? "Updating..." : "Mark Completed"}
                </button>
            )}
        </div>

        {showReschedule && (
            <form onSubmit={handleRescheduleLesson} className="pt-3 border-t border-white/10 space-y-2">
                <div>
                    <label className="block text-slate-300 mb-1 text-xs">New Date</label>
                    <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full px-2 py-1.5 rounded-md bg-slate-900/60 text-white border border-slate-700 text-sm" />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 text-xs">New Time Slot</label>
                  <TimeSlotPicker
                    date={newDate}
                    instructorId={expandedLesson?.instructorId?._id || expandedLesson?.instructorId}
                    vehicleId={expandedLesson?.vehicleId?._id || expandedLesson?.vehicleId}
                    selectedSlot={newStartTime}
                    onSelectSlot={(slot) => {
                      const [h, m] = slot.split(":").map(Number);
                      let endH = h, endM = m + 30;
                      if (endM >= 60) { endM = 0; endH += 1; }
                        setNewStartTime(slot);
                        setNewEndTime(`${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`);
                      }}
                  />
                </div>
                <button type="submit" disabled={actionLoading} className="w-full py-1.5 rounded-md text-sm text-white bg-[var(--color-accent)] hover:opacity-90 disabled:opacity-50">
                    {actionLoading ? "Saving..." : "Confirm Reschedule"}
                </button>
            </form>
            )}
        </div>
        )}

        {/* Student,book a new lesson */}
        {selectedDate && user?.role === "student" && (
          <div id="confirm-booking-section" className="bg-[var(--color-surface)]/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-5 shadow-[0_0_30px_-5px_var(--color-accent)]">
            <h2 className="text-white font-medium">Available time slots for {selectedDate}</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1 text-sm">Instructor</label>
                <select value={instructorId} onChange={(e) => setInstructorId(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700">
                  <option value="">Select instructor</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 text-sm">Vehicle</label>
                <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700">
                  <option value="">Select vehicle</option>
                </select>
              </div>
            </div>

            <TimeSlotPicker
              date={selectedDate}
              instructorId={instructorId}
              vehicleId={vehicleId}
              selectedSlot={selectedSlot}
              onSelectSlot={handleSlotSelect}
            />

            {selectedSlot && (
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <button
                  onClick={handleConfirmBooking}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:opacity-90 disabled:opacity-50 transition"
                >
                  {submitting ? "Booking..." : "Confirm Booking"}
                </button>
                <button
                  onClick={() => setSelectedSlot("")}
                  className="px-6 py-2 rounded-md text-white font-medium bg-slate-800 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
              </div>
            )}
        </div>
        )}

        {/*Upcoming Lessons*/}
        <div className="bg-[var(--color-surface)]/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-[0_0_30px_-5px_var(--color-accent)]">
          <h2 className="text-white font-medium mb-4">Upcoming Lessons</h2>
          {loading && <p className="text-slate-400">Loading lessons...</p>}
          {!loading && lessons.length === 0 && <p className="text-slate-400">No lessons found.</p>}
          {!loading && lessons.length > 0 && (
            <LessonTable
                lessons={lessons}
                onSelectLesson={(id) => {
                setExpandedLessonId(id);
                setTimeout(() => document.getElementById("lesson-detail-section")?.scrollIntoView({ behavior: "smooth" }), 100);
                }}
            />
        )}
        </div>
      </div>
    </div>
  );
}


export default LessonManagementPage;