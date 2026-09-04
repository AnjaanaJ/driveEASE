import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function InstructorLessonPage() {
  const { id } = useParams();

  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Scheduled");

  useEffect(() => {
    fetchLesson();
  }, [id]);

  const fetchLesson = async () => {
    try {
      const response = await axiosInstance.get(`/lessons/${id}`);

      const data = response.data;

      setLesson(data);
      setProgress(data.progress || "");
      setRemarks(data.remarks || "");
      setStatus(data.status || "Scheduled");
    } catch (error) {
      console.error("Error fetching lesson:", error);
      setMessage("Failed to load lesson.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      const response = await axiosInstance.put(`/lessons/${id}`, {
        status,
        progress,
        remarks,
      });

      setLesson(response.data.data || response.data);
      setMessage("Progress and remarks saved successfully.");
    } catch (error) {
      console.error("Error saving progress:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to save progress and remarks."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this lesson?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancelling(true);
      setMessage("");

      const response = await axiosInstance.delete(`/lessons/${id}`);

      setLesson(response.data.lesson);
      setStatus(response.data.lesson.status);

      setMessage("Lesson cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling lesson:", error);

      setMessage(
        error.response?.data?.message ||
          "Failed to cancel lesson."
      );
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold">
          Loading lesson...
        </h2>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="p-5">
        <p>Lesson not found.</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6">
        Lesson Details
      </h2>

      {/* Lesson Information */}
      <div className="border border-gray-300 rounded-lg p-6 max-w-3xl mb-8">
        <h3 className="text-xl font-semibold mb-5">
          Lesson Information
        </h3>

        <div className="space-y-5">
          <div>
            <p className="text-gray-600 mb-1">Status</p>
            <p className="text-lg font-medium">
              {lesson.status}
            </p>
          </div>

          <div>
            <p className="text-gray-600 mb-1">Date</p>
            <p className="text-lg font-medium">
              {new Date(lesson.date).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-gray-600 mb-1">Time</p>
            <p className="text-lg font-medium">
              {lesson.startTime} - {lesson.endTime}
            </p>
          </div>

          <div>
            <p className="text-gray-600 mb-1">Student ID</p>
            <p className="text-lg font-medium">
              {lesson.studentId?._id || lesson.studentId || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-600 mb-1">Instructor ID</p>
            <p className="text-lg font-medium">
              {lesson.instructorId?._id ||
                lesson.instructorId ||
                "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Status */}
      <div className="border border-gray-300 rounded-lg p-6 max-w-3xl mb-8">
        <h3 className="text-xl font-semibold mb-5">
          Lesson Status
        </h3>

        <label className="block text-gray-600 mb-2">
          Current Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-md bg-background text-text-primary"
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Lesson Progress & Remarks */}
      <div className="border border-gray-300 rounded-lg p-6 max-w-3xl mb-8">
        <h3 className="text-xl font-semibold mb-6">
          Lesson Progress & Remarks
        </h3>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">
            Progress
          </label>

          <textarea
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            rows="5"
            placeholder="Enter lesson progress..."
            className="border border-gray-300 rounded px-3 py-2 w-full resize-y"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">
            Remarks
          </label>

          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows="5"
            placeholder="Enter remarks..."
            className="border border-gray-300 rounded px-3 py-2 w-full resize-y"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Progress & Remarks"}
          </button>

          {lesson.status !== "Cancelled" && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
            >
              {cancelling ? "Cancelling..." : "Cancel Lesson"}
            </button>
          )}
        </div>
      </div>

      {/* Message */}
      {message && (
        <p
          className={
            message.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default InstructorLessonPage;