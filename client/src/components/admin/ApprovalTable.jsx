import RoleBadge from "../auth/RoleBadge";

function ApprovalTable({ users, onApprove, onReject, onDelete, onChangeRole }) {
  if (!users || users.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-[var(--color-surface)]/60 backdrop-blur-xl p-12 text-center text-grey-400 shadow-2xl">
        No users found.
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl border border-white/10 bg-[var(--color-surface)]/60 backdrop-blur-xl shadow-2xl p-6 md:p-10 overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-white border-separate border-spacing-y-3">
          <thead>
            <tr className="text-grey=400 uppercase text-xs tracking-wider">
              <th className="px-6 py-3 text-lg text-left">Name</th>
              <th className="px-6 py-3 text-lg text-left">Email</th>
              <th className="px-6 py-3 text-lg text-center">Role</th>
              <th className="px-6 py-3 text-lg text-center">Status</th>
              <th className="px-6 py-3 text-lg text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="bg-[var(--color-background)]/50 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-5 rounded-1-2xl align-middle font-medium">
                  {u.name}
                </td>
                <td className="px-6 py-5 align-middle text-grey-300">
                  {u.email}
                </td>
                <td className="px-6 py-5 align-middle text-center">
                  <RoleBadge role={u.role} />
                </td>
                <td className="px-6 py-5 align=middle text-center">
                  {u.isApproved ? (
                    <span className="text-emerald-400 font-medium">
                      Approved
                    </span>
                  ) : (
                    <span className="text-amber-400 font-medium">Pending</span>
                  )}
                </td>
                <td className="px-6 py-5 rounded-r-2xl align-middle">
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    {!u.isApproved && (
                      <button
                        onClick={() => onApprove(u._id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/90 hover:bg-emerald-400 text-white transition-colors"
                      >
                        Approve
                      </button>
                    )}
                    {u.isApproved && (
                      <button
                        onClick={() => onReject(u._id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber=500/90 hover:bg-amber-400 text-white transition-colors"
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
                      className="px-3 py-1.5 rounded=lg text-xs font-medium bg-[var(--color-primary)]/90 hover:bg-[var(--color-primary)] text-white cursor-pointer transition-colors"
                    >
                      <option value="" disabled>
                        Change role
                      </option>
                      <option value="admin">Admin</option>
                      <option value="instructor">Instructor</option>
                      <option value="student">Student</option>
                    </select>

                    <button
                      onClick={() => onDelete(u._id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium  bg-rose-600/90 hover:bg-rose-500 text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApprovalTable;
