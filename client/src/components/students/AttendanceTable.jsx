import { useState } from "react";

function AttendanceTable({ attendance = [], editable = false, onAddAttendance }) {
  const [date, setDate] = useState("");
  const [present, setPresent] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) return;
    onAddAttendance({ date, present });
    setDate("");
    setPresent(true);
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-surface p-5 transition duration-300 hover:border-primary/30 hover:bg-surface/95 hover:shadow-2xl hover:shadow-primary/15">
      <h2 className="mb-4 text-lg font-extrabold text-white">Attendance History</h2>

      {editable && (
        <form onSubmit={handleSubmit} className="flex gap-3 items-end mb-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="bg-background border border-slate-600 rounded px-3 py-2 text-text-primary"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Status</label>
            <select
              value={present}
              onChange={(e) => setPresent(e.target.value === "true")}
              className="bg-background border border-slate-600 rounded px-3 py-2 text-text-primary"
            >
              <option value="true">Present</option>
              <option value="false">Absent</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition"
          >
            Log
          </button>
        </form>
      )}

      {attendance.length === 0 ? (
        <p className="text-text-secondary">No attendance records yet.</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700 text-sm font-semibold text-white">
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, index) => (
              <tr key={index} className="border-b border-slate-800 transition-colors hover:bg-white/5">
                <td className="py-2 text-text-primary">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className={`py-2 ${record.present ? "text-green-400" : "text-red-400"}`}>
                  {record.present ? "Present" : "Absent"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendanceTable;
