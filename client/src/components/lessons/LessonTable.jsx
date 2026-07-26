import LessonStatusBadge from "./LessonStatusBadge";

function LessonTable({ lessons }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-[var(--color-surface)] text-slate-400 uppercase text-xs">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Time</th>
            <th className="p-3">Student</th>
            <th className="p-3">Instructor</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson._id} className="border-t border-white/10">
              <td className="p-3">{lesson.date?.split("T")[0]}</td>
              <td className="p-3">{lesson.startTime} - {lesson.endTime}</td>
              <td className="p-3">{lesson.studentId}</td>
              <td className="p-3">{lesson.instructorId}</td>
              <td className="p-3"><LessonStatusBadge status={lesson.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LessonTable;