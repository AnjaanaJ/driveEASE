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
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold">
          Loading availability...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">
        My Availability
      </h2>

      <p className="mb-5">
        Set the days and times when you are available for driving lessons.
      </p>

      {message && (
        <p className="text-green-600 mb-4">
          {message}
        </p>
      )}

      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      {availability.length === 0 && (
        <div className="border border-gray-300 rounded-lg p-4 mb-5">
          <p>No availability has been set.</p>
        </div>
      )}

      {availability.map((slot, index) => (
        <div
          key={index}
          className="mb-4 p-4 border border-gray-300 rounded-lg"
        >
          <div>
            <label className="mr-2">Day: </label>

            <select
              value={slot.day}
              onChange={(e) =>
                handleChange(index, "day", e.target.value)
              }
              className="border border-gray-300 rounded px-2 py-1"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3">
            <label className="mr-2">Start Time: </label>

            <input
              type="time"
              value={slot.startTime}
              onChange={(e) =>
                handleChange(index, "startTime", e.target.value)
              }
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div className="mt-3">
            <label className="mr-2">End Time: </label>

            <input
              type="time"
              value={slot.endTime}
              onChange={(e) =>
                handleChange(index, "endTime", e.target.value)
              }
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <button
            type="button"
            onClick={() => removeSlot(index)}
            className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSlot}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Availability
      </button>

      <button
        type="button"
        onClick={saveAvailability}
        disabled={saving}
        className="ml-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Availability"}
      </button>
    </div>
  );
}

export default InstructorAvailabilityPage;