import React from "react";

function AvailabilityScheduler({ availability, setAvailability }) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const addSlot = () => {
    setAvailability([
      ...availability,
      {
        day: "Monday",
        startTime: "",
        endTime: "",
      },
    ]);
  };

  const removeSlot = (index) => {
    const updated = availability.filter((_, i) => i !== index);
    setAvailability(updated);
  };

  return (
    <div>
      <h3>Availability Schedule</h3>

      {availability.map((slot, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
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

          <input
            type="time"
            value={slot.startTime}
            onChange={(e) =>
              handleChange(index, "startTime", e.target.value)
            }
          />

          <input
            type="time"
            value={slot.endTime}
            onChange={(e) =>
              handleChange(index, "endTime", e.target.value)
            }
          />

          <button
            type="button"
            onClick={() => removeSlot(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addSlot}>
        Add Time Slot
      </button>
    </div>
  );
}

export default AvailabilityScheduler;