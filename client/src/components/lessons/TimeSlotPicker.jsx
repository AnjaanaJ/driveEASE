import { useState, useEffect } from "react";
import { getAvailableSlots } from "../../services/lessonApi";

//Fixed 1-hour slots the school offers,from 8 AM to 6 PM
const ALL_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

function TimeSlotPicker({ date, instructorId, vehicleId, selectedSlot, onSelectSlot }) {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isToday = date === new Date().toISOString().split("T")[0];

  useEffect(() => {
    //Only fetch once all three are actually chosen,no point checking otherwise
    if (!date || !instructorId || !vehicleId) {
      setBookedSlots([]);
      return;
    }

    const fetchSlots = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getAvailableSlots(date, instructorId, vehicleId);
        setBookedSlots(res.data.bookedSlots || []);
      } catch (err) {
        setError("Failed to check availability.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [date, instructorId, vehicleId]);

  //A slot is booked if its start time falls inside any existing booked lesson's time range
  const isSlotBooked = (slotStart) => {
    return bookedSlots.some((b) => slotStart >= b.startTime && slotStart < b.endTime);
  };
  const isSlotInPast = (slotStart) => {
  if (!isToday) return false; // only relevant if booking for today
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return slotStart <= currentTime;
  };
  if (!date || !instructorId || !vehicleId) {
    return <p className="text-slate-500 text-sm">Select an instructor, vehicle, and date to see available times.</p>;
  }

  return (
    <div>
      {loading && <p className="text-slate-400 text-sm mb-2">Checking availability...</p>}
      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      <div className="grid grid-cols-5 gap-2">
        {ALL_SLOTS.map((slot) => {
          const booked = isSlotBooked(slot);
          const pastTime = isSlotInPast(slot);
          const disabled = booked || pastTime;
          const isSelected = selectedSlot === slot;

          return (
            <button
              key={slot}
              type="button"
              disabled={disabled}
              onClick={() => onSelectSlot(slot)}
              className={`py-2 rounded-md text-sm font-medium transition
                ${disabled ? "bg-slate-800 text-slate-600 cursor-not-allowed" : ""}
                ${!disabled && isSelected ? "bg-[var(--color-accent)] text-white" : ""}
                ${!disabled && !isSelected ? "bg-slate-900/60 text-white border border-slate-700 hover:border-[var(--color-accent)]" : ""}
              `}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TimeSlotPicker;