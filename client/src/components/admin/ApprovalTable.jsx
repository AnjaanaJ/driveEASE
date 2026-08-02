import RoleBadge from "../auth/RoleBadge";

function UserRow({
  u,
  studentProfiles,
  onApprove,
  onReject,
  onApproveStudentProfile,
  onRejectStudentProfile,
  onDelete,
  onChangeRole,
  onViewDetails,
}) {
  const studentProfile =
    u.role === "student"
      ? studentProfiles.find((student) => student.userId?._id === u._id)
      : null;
  const approvalStatus = studentProfile?.status;
  const isStudentProfile = Boolean(studentProfile);

  return (
    <tr className="bg-[var(--color-background)]/50 hover:bg-white/5 transition-colors">
      <td className="px-6 py-5 rounded-l-2xl align-middle font-medium">
        {u.name}
      </td>
      <td className="px-6 py-5 align-middle text-gray-300">{u.email}</td>
      <td className="px-6 py-5 align-middle text-center">
        <RoleBadge role={u.role} />
      </td>
      <td className="px-6 py-5 align-middle text-center">
        {isStudentProfile ? (
          <span
            className={`font-medium ${
              approvalStatus === "Approved"
                ? "text-emerald-400"
                : approvalStatus === "Rejected"
                  ? "text-rose-400"
                  : "text-amber-400"
            }`}
          >
            {approvalStatus}
          </span>
        ) : u.isApproved ? (
          <span className="text-emerald-400 font-medium">Approved</span>
        ) : (
          <span className="text-amber-400 font-medium">Pending</span>
        )}
      </td>
      <td className="px-6 py-5 rounded-r-2xl align-middle">
        <div className="flex flex-wrap justify-center items-center gap-2">
          {isStudentProfile ? (
            <>
              {approvalStatus !== "Approved" && (
                <button
                  onClick={() => onApproveStudentProfile(studentProfile._id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
                >
                  Approve
                </button>
              )}
              {approvalStatus !== "Rejected" && (
                <button
                  onClick={() => onRejectStudentProfile(studentProfile._id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors"
                >
                  Reject
                </button>
              )}
            </>
          ) : !u.isApproved && (
            <button
              onClick={() => onApprove(u._id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
            >
              Approve
            </button>
          )}
          {!isStudentProfile && u.isApproved && (
            <button
              onClick={() => onReject(u._id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors"
            >
              Reject
            </button>
          )}
          <select
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                onChangeRole(u._id, e.target.value);
                e.target.value = "";
              }
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--color-primary)]/15 text-sky-300 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/25 cursor-pointer transition-colors"
          >
            <option
              value=""
              disabled
              className="bg-[var(--color-surface)] text-white"
            >
              Change role
            </option>
            <option
              value="admin"
              className="bg-[var(--color-surface)] text-white"
            >
              Admin
            </option>
            <option
              value="instructor"
              className="bg-[var(--color-surface)] text-white"
            >
              Instructor
            </option>
            <option
              value="student"
              className="bg-[var(--color-surface)] text-white"
            >
              Student
            </option>
          </select>
          {u.role === "student" && (
            <button
              onClick={() => onViewDetails(u)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-500/15 text-sky-300 border border-sky-500/30 hover:bg-sky-500/25 transition-colors"
            >
              View details
            </button>
          )}
          <button
            onClick={() => onDelete(u._id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-colors"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
function RoleTable({
  title,
  users,
  studentProfiles,
  onApprove,
  onReject,
  onApproveStudentProfile,
  onRejectStudentProfile,
  onDelete,
  onChangeRole,
  onViewDetails,
}) {
  if (users.length === 0) return null;

  return (
    <div className="relative rounded-3xl border border-white/20 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 mb-8 last:mb-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
      <div className="relative">
        <h3 className="text-lg font-semibold text-white mb-4">
          {title}{" "}
          <span className="text-slate-400 font-normal text-sm">
            ({users.length})
          </span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-400 uppercase text-xs tracking-wider">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-center">Role</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <UserRow
                  key={u._id}
                  u={u}
                  studentProfiles={studentProfiles}
                  onApprove={onApprove}
                  onReject={onReject}
                  onApproveStudentProfile={onApproveStudentProfile}
                  onRejectStudentProfile={onRejectStudentProfile}
                  onDelete={onDelete}
                  onChangeRole={onChangeRole}
                  onViewDetails={onViewDetails}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function ApprovalTable({
  users,
  studentProfiles = [],
  onApprove,
  onReject,
  onApproveStudentProfile,
  onRejectStudentProfile,
  onDelete,
  onChangeRole,
  onViewDetails,
}) {
  if (!users || users.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[var(--color-surface)]/60 backdrop-blur-xl p-12 text-center text-gray-400 shadow-2xl">
        No users found.
      </div>
    );
  }

  const admins = users.filter((u) => u.role === "admin");
  const instructors = users.filter((u) => u.role === "instructor");
  const students = users.filter((u) => u.role === "student");

  return (
    <div className="relative ">
      <RoleTable
        title="Admins"
        users={admins}
        studentProfiles={studentProfiles}
        onApprove={onApprove}
        onReject={onReject}
        onApproveStudentProfile={onApproveStudentProfile}
        onRejectStudentProfile={onRejectStudentProfile}
        onDelete={onDelete}
        onChangeRole={onChangeRole}
        onViewDetails={onViewDetails}
      />
      <RoleTable
        title="Instructors"
        users={instructors}
        studentProfiles={studentProfiles}
        onApprove={onApprove}
        onReject={onReject}
        onApproveStudentProfile={onApproveStudentProfile}
        onRejectStudentProfile={onRejectStudentProfile}
        onDelete={onDelete}
        onChangeRole={onChangeRole}
        onViewDetails={onViewDetails}
      />
      <RoleTable
        title="Students"
        users={students}
        studentProfiles={studentProfiles}
        onApprove={onApprove}
        onReject={onReject}
        onApproveStudentProfile={onApproveStudentProfile}
        onRejectStudentProfile={onRejectStudentProfile}
        onDelete={onDelete}
        onChangeRole={onChangeRole}
        onViewDetails={onViewDetails}
      />
    </div>
  );
}

export default ApprovalTable;
