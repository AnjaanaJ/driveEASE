function StudentTable({ students }) {
  if (students.length === 0) {
    return <p className="text-text-secondary">No students found.</p>;
  }

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;