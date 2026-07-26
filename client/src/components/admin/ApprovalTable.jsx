import RoleBadge from "../auth/RoleBadge";

function ApprovalTable({ users, onApprove, onReject, onDelete, onChangeRole }) {
  if (!users || users.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">
        No users found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="min-w-full text-sm text-left text-white">
        <thead className="bg-[var(--color-surface)] text-gray-300 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t border-white/10">
              <td className="px-4 py-3">{u.name}</td>
              <td className="px-4 py-3">{u.email}</td>
              <td className="px-4 py-3">
                <RoleBadge role={u.role} />
              </td>
              <td className="px-4 py-3">
                {u.isApproved ? (
                  <span className="text-green-400">Approved</span>
                ) : (
                  <span className="text-yellow-400">Pending</span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {!u.isApproved && (
                    <button
                      onClick={() => onApprove(u._id)}
                      className="px-2 py-1 rounded bg-green-600 hover:bg-green-500 text-xs"
                    >
                      Approve
                    </button>
                  )}
                  {u.isApproved && (
                    <button
                      onClick={() => onReject(u._id)}
                      className="px-2 py-1 rounded bg-yellow-600 hover:bg-yellow-500 text-xs"
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
                    className="px-2 py-1 rounded bg-[var(--color-primary)] text-xs cursor-pointer"
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
                    className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-xs"
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
  );
}

export default ApprovalTable;