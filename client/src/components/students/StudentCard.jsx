function StudentCard({ student }) {
  return (
    <div className="bg-surface border border-slate-700 rounded-lg p-5 shadow hover:border-accent transition">
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        {student.userId?.name || "Unknown"}
      </h3>
      <div className="space-y-1 text-sm">
        <p className="text-text-secondary">
          <span className="text-text-secondary/70">Email: </span>
          {student.userId?.email}
        </p>
        <p className="text-text-secondary">
          <span className="text-text-secondary/70">NIC: </span>
          {student.nic}
        </p>
        <p className="text-text-secondary">
          <span className="text-text-secondary/70">Phone: </span>
          {student.phone}
        </p>
        <p className="text-text-secondary">
          <span className="text-text-secondary/70">Course: </span>
          {student.coursePackage?.name || "Not assigned"}
        </p>
      </div>
    </div>
  );
}

export default StudentCard;