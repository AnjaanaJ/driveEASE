
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
      <div className="min-h-screen p-8 md:p-12">
        <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
          <h2 className="text-2xl font-bold text-white">
            Loading availability...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-12">
      {/* Page Header */}
      <div className="mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 mb-4">
          Instructor panel
        </span>

        <h1 className="text-4xl font-bold text-white mb-2">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
            availability
          </span>
        </h1>

        <p className="text-slate-400">
          Set the days and times when you are available for driving lessons.
        </p>
      </div>

      {/* Success Message */}
      {message && (
        <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
          {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Availability Section */}
      <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Available Time Slots
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Manage the days and time periods when students can book lessons
              with you.
            </p>
          </div>

          <span className="rounded-full bg-white/[0.03] border border-white/20 px-3 py-1 text-sm text-slate-300">
            {availability.length}{" "}
            {availability.length === 1 ? "Slot" : "Slots"}
          </span>
        </div>

        {/* No Availability */}
        {availability.length === 0 && (
          <div className="mb-6 rounded-2xl border border-dashed border-white/20 p-8 text-center">
            <p className="text-slate-400">
              No availability has been set.
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Add an availability slot below to get started.
            </p>
          </div>
        )}

        {/* Availability Slots */}
        <div className="space-y-4">
          {availability.map((slot, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 p-5 transition-colors hover:bg-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Day */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Day
                  </label>

                  <select
                    value={slot.day}
                    onChange={(e) =>
                      handleChange(index, "day", e.target.value)
                    }
                    className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-primary)]"
                  >
                    {days.map((day) => (
                      <option
                        key={day}
                        value={day}
                        className="bg-[var(--color-background)] text-white"
                      >
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Start Time */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Start Time
                  </label>

                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) =>
                      handleChange(index, "startTime", e.target.value)
                    }
                    className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    End Time
                  </label>

                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) =>
                      handleChange(index, "endTime", e.target.value)
                    }
                    className="w-full bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              </div>

              {/* Remove */}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeSlot(index)}
                  className="px-3 py-1.5 text-sm rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={addSlot}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary)]/20 text-sky-300 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/30 transition-colors"
          >
            + Add Availability
          </button>

          <button
            type="button"
            onClick={saveAvailability}
            disabled={saving}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Availability"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructorAvailabilityPage;

