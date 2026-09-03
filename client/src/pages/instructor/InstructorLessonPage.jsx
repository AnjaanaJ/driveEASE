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
    return <p>Loading lesson...</p>;
  }

  if (!lesson) {
    return <p>Lesson not found.</p>;
  }

  return (
    <div>
      <h1>Lesson Details</h1>

      <p>
        <strong>Status:</strong> {lesson.status}
      </p>

      <p>
        <strong>Date:</strong> {lesson.date}
      </p>

      <p>
        <strong>Time:</strong> {lesson.startTime} - {lesson.endTime}
      </p>

      <p>
        <strong>Student ID:</strong>{" "}
        {lesson.studentId?._id || lesson.studentId}
      </p>

      <p>
        <strong>Instructor ID:</strong>{" "}
        {lesson.instructorId?._id || lesson.instructorId}
      </p>

      <hr />
      <hr />

        <h2>Lesson Status</h2>

       <select
         value={status}
         onChange={(e) => setStatus(e.target.value)}
       >
        <option value="Scheduled">Scheduled</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <h2>Lesson Progress & Remarks</h2>

      <div>
        <label>
          <strong>Progress</strong>
        </label>

        <br />

        <textarea
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          rows="5"
          cols="50"
          placeholder="Enter lesson progress..."
        />
      </div>

      <br />

      <div>
        <label>
          <strong>Remarks</strong>
        </label>

        <br />

        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows="5"
          cols="50"
          placeholder="Enter remarks..."
        />
      </div>

      <br />

      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Progress & Remarks"}
      </button>
      {lesson.status !== "Cancelled" && (
     <button
         onClick={handleCancel}
        disabled={cancelling}
     >
       {cancelling ? "Cancelling..." : "Cancel Lesson"}
     </button>
     )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default InstructorLessonPage;