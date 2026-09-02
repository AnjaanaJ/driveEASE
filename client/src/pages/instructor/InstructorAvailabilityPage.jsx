import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function InstructorAvailabilityPage() {
  const [instructorId, setInstructorId] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      setError("");

      const profileResponse = await axiosInstance.get("/instructors/me");

      const instructor =
        profileResponse.data?.data ||
        profileResponse.data?.instructor;

      if (!instructor?._id) {
        throw new Error("Instructor ID not found");
      }

      setInstructorId(instructor._id);

      const response = await axiosInstance.get(
        `/instructors/${instructor._id}/availability`
      );

      setAvailability(response.data?.data || []);
    } catch (err) {
      console.error("Error fetching availability:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load availability"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedAvailability = [...availability];

    updatedAvailability[index] = {
      ...updatedAvailability[index],
      [field]: value,
    };

    setAvailability(updatedAvailability);
  };

  const addSlot = () => {
    setAvailability([
      ...availability,
      {
        day: "Monday",
        startTime: "09:00",
        endTime: "10:00",
      },
    ]);

    setMessage("");
    setError("");
  };

  const removeSlot = (index) => {
    const updatedAvailability = availability.filter(
      (_, slotIndex) => slotIndex !== index
    );

    setAvailability(updatedAvailability);
    setMessage("");
    setError("");
  };

  const saveAvailability = async () => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      if (!instructorId) {
        throw new Error("Instructor ID not found");
      }

      await axiosInstance.put(
        `/instructors/${instructorId}/availability`,
        {
          availability,
        }
      );

      setMessage("Availability updated successfully.");
    } catch (err) {
      console.error("Error updating availability:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update availability"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading availability...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Availability</h1>

      <p>
        Set the days and times when you are available for driving lessons.
      </p>

      {message && (
        <p style={{ color: "green" }}>
          {message}
        </p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {availability.length === 0 && (
        <p>No availability has been set.</p>
      )}

      {availability.map((slot, index) => (
        <div
          key={index}
          style={{
            marginBottom: "15px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <div>
            <label>Day: </label>

            <select
              value={slot.day}
              onChange={(e) =>
                handleChange(index, "day", e.target.value)
              }
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: "10px" }}>
            <label>Start Time: </label>

            <input
              type="time"
              value={slot.startTime}
              onChange={(e) =>
                handleChange(index, "startTime", e.target.value)
              }
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <label>End Time: </label>

            <input
              type="time"
              value={slot.endTime}
              onChange={(e) =>
                handleChange(index, "endTime", e.target.value)
              }
            />
          </div>

          <button
            type="button"
            onClick={() => removeSlot(index)}
            style={{ marginTop: "10px" }}
          >
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addSlot}>
        Add Availability
      </button>

      <button
        type="button"
        onClick={saveAvailability}
        disabled={saving}
        style={{ marginLeft: "10px" }}
      >
        {saving ? "Saving..." : "Save Availability"}
      </button>
    </div>
  );
}

export default InstructorAvailabilityPage;