function LessonStatusBadge({ status }) {
  const colors = {
    Scheduled: "bg-blue-500/20 text-blue-300",
    Completed: "bg-green-500/20 text-green-300",
    Cancelled: "bg-red-500/20 text-red-300",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status] || "bg-slate-500/20 text-slate-300"}`}>
      {status}
    </span>
  );
}

export default LessonStatusBadge;