function StudentTable({ students, showActions = false, onApprove, onReject }) {
  if (students.length === 0) {
    return <p className="text-text-secondary">No students found.</p>;
  }

  const statusColor = (status) => {
    if (status === "Approved") return "text-green-400";
    if (status === "Rejected") return "text-red-400";
    return "text-yellow-400";
  };

  return (
    <div className="bg-surface rounded-lg shadow overflow-hidden border border-slate-700">
      <table className="w-full text-left">
        <thead className="bg-background text-text-secondary text-sm">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">NIC</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Course Package</th>
            <th className="p-3">Status</th>
            {showActions && <th className="p-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="border-t border-slate-700">
              <td className="p-3 text-text-primary">{student.userId?.name}</td>
              <td className="p-3 text-text-secondary">{student.userId?.email}</td>
              <td className="p-3 text-text-secondary">{student.nic}</td>
              <td className="p-3 text-text-secondary">{student.phone}</td>
              <td className="p-3 text-text-secondary">
                {student.coursePackage?.name || "—"}
              </td>
              <td className={`p-3 ${statusColor(student.status)}`}>
                {student.status || "Pending"}
              </td>
              {showActions && (
                <td className="p-3 space-x-2">
                  {student.status !== "Approved" && (
                    <button
                      onClick={() => onApprove(student._id)}
                      className="text-green-400 hover:underline"
                    >
                      Approve
                    </button>
                  )}
                  {student.status !== "Rejected" && (
                    <button
                      onClick={() => onReject(student._id)}
                      className="text-red-400 hover:underline"
                    >
                      Reject
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;