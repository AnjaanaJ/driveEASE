function StudentTable({
  students,
  showActions = false,
  onApprove,
  onReject,
  onDelete,
}) {
  if (students.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[var(--color-surface)]/60 backdrop-blur-xl p-12 text-center text-gray-400 shadow-2xl">
        No students found.
      </div>
    );
  }

  const statusColor = (status) => {
    if (status === "Approved") return "text-emerald-400";
    if (status === "Rejected") return "text-rose-400";
    return "text-amber-400";
  };

  return (
    <div className="relative rounded-3xl border border-white/20 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-white border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-400 uppercase text-xs tracking-wider">
              <th className="px-6 py-3 text-left">Student ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">NIC</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Course Package</th>
              <th className="px-6 py-3 text-center">Status</th>
              {showActions && (
                <th className="px-6 py-3 text-center">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                className="bg-[var(--color-background)]/50 hover:bg-white/5 transition-colors"
              >
                <td className="p-3 font-medium text-accent">
                  {student.studentId || "—"}
                </td>
                <td className="p-3 text-text-primary">
                  {student.userId?.name}
                </td>
                <td className="p-3 text-text-secondary">
                  {student.userId?.email}
                </td>
                <td className="p-3 text-text-secondary">{student.nic}</td>
                <td className="p-3 text-text-secondary">{student.phone}</td>
                <td className="p-3 text-text-secondary">
                  {student.coursePackage?.name || "—"}
                </td>
                <td className={`p-3 ${statusColor(student.status)}`}>
                  {student.status || "Pending"}
                </td>
                {showActions && (
                  <td className="p-3">
                    <div className="flex flex-wrap justify-center items-center gap-2">
                      {student.status !== "Approved" && (
                        <button
                          onClick={() => onApprove(student._id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {student.status !== "Rejected" && (
                        <button
                          onClick={() => onReject(student._id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors"
                        >
                          Reject
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(student._id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
