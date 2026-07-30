import LessonStatusBadge from "./LessonStatusBadge";



function LessonTable({ lessons,onSelectLesson }) {
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
            <tr key={lesson._id} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-3">
                <button
                  onClick={() => onSelectLesson(lesson._id)}
                  className="text-[var(--color-accent)] hover:underline"
                >
                  {lesson.date?.split("T")[0]}
                </button>
              </td>
              <td className="p-3">{lesson.startTime} - {lesson.endTime}</td>
              <td className="p-3">
                {typeof lesson.studentId === "object" && lesson.studentId !== null
                ? lesson.studentId?.nic || lesson.studentId?._id || "—"
                : lesson.studentId || "—"}
              </td>
              <td className="p-3">
                {typeof lesson.instructorId === "object" && lesson.instructorId !== null
                ? lesson.instructorId?._id || "—"
                : lesson.instructorId || "—"}
              </td>
              <td className="p-3"><LessonStatusBadge status={lesson.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LessonTable;