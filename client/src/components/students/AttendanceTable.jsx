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
    <div className="bg-surface border border-slate-700 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-text-primary mb-3">Attendance History</h2>

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
            <tr className="text-text-secondary text-sm border-b border-slate-700">
              <th className="py-2">Date</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, index) => (
              <tr key={index} className="border-b border-slate-800">
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