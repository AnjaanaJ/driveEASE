import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { bookLesson } from "../../services/lessonApi";
import TimeSlotPicker from "./TimeSlotPicker";

function BookingForm() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    instructorId: "",
    vehicleId: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.instructorId || !formData.vehicleId || !formData.date || !formData.startTime || !formData.endTime) {
      setError("Please fill in all fields.");
      return;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError("Booking date cannot be in the past.");
      return;
    }

    setSubmitting(true);
    try {
      await bookLesson({ studentId: user._id || user.id, ...formData });
      setSuccess("Lesson booked successfully!");
      setFormData({ instructorId: "", vehicleId: "", date: "", startTime: "", endTime: "" });
    } catch (err) {
      if (err.response?.status === 409) {
        setError("That instructor or vehicle is already booked for this time slot. Please choose another.");
      } else {
        setError(err.response?.data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };
    const handleSlotSelect = (slot) => {
      const [hour] = slot.split(":");
      const endHour = String(Number(hour) + 1).padStart(2, "0");
        setFormData((prev) => ({ ...prev, startTime: slot, endTime: `${endHour}:00` }));
    };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[var(--color-background)] relative overflow-hidden">
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-[var(--color-primary)] opacity-25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[var(--color-secondary)] opacity-25 blur-3xl pointer-events-none" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md overflow-hidden bg-[var(--color-surface)]/70 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
      >
        <div className="pointer-events-none absolute -top-1/2 -left-1/4 w-3/4 h-[200%] bg-gradient-to-br from-white/20 via-white/0 to-transparent rotate-12" />

        <h1 className="text-2xl font-semibold text-white mb-1 text-center">Book a Lesson</h1>
        <p className="text-slate-400 text-sm mb-6 text-center">Choose your instructor, vehicle, and time slot</p>

        {error && <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">{error}</p>}
        {success && <p className="bg-green-500/10 text-green-400 text-sm p-2 rounded mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-slate-300 mb-1 text-sm">Instructor</label>
          <select
            name="instructorId"
            value={formData.instructorId}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
          >
            <option value="">Select instructor</option>
          </select>
          
        </div>

        <div className="mb-4">
          <label className="block text-slate-300 mb-1 text-sm">Vehicle</label>
          <select
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
          >
            <option value="">Select vehicle</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-slate-300 mb-1 text-sm">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-300 mb-1 text-sm">Time Slot</label>
          <TimeSlotPicker
            date={formData.date}
            instructorId={formData.instructorId}
            vehicleId={formData.vehicleId}
            selectedSlot={formData.startTime}
            onSelectSlot={handleSlotSelect}
          />
        </div>
      

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 rounded-md text-white font-medium transition disabled:opacity-50 bg-[var(--color-accent)] hover:opacity-90"
        >
          {submitting ? "Booking..." : "Book Lesson"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;