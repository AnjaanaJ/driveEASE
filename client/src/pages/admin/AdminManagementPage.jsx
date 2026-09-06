import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getAllUsers, createAdmin, deleteUser } from "../../api/adminApi";

function AdminManagementPage() {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [pendingAdmin, setPendingAdmin] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const allUsers = await getAllUsers();
      setAdmins(allUsers.filter((u) => u.role === "admin"));
    } catch (err) {
      setError("Failed to load admins. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!name.trim()) return "Name is required";
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address";
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least 1 uppercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least 1 number";
    return "";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }
    setPendingAdmin({ name, email, password });
  };

  const handleConfirmCreate = async () => {
    if (!pendingAdmin) return;
    setSubmitting(true);
    try {
      const newAdmin = await createAdmin(pendingAdmin);
      setAdmins((prev) => [...prev, newAdmin]);
      setName("");
      setEmail("");
      setPassword("");
      setPendingAdmin(null);
    } catch (err) {
      setFormError(
        err.response?.data?.message ||
          "Failed to create admin. Please try again.",
      );
      setPendingAdmin(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelCreate = () => {
    setPendingAdmin(null);
  };

  const handleDelete = async (id) => {
    if (id === currentUser?._id) {
      alert("You cannot remove your own admin account.");
      return;
    }
    const confirmed = window.confirm(
      "Are you sure you want to remove this admin? This cannot be undone.",
    );
    if (!confirmed) return;

    try {
      await deleteUser(id);
      setAdmins((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert("Failed to remove admin. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-8 text-white">Loading admins...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen p-8 md:p-12">
      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 mb-4">
        Admin panel
      </span>
      <h1 className="text-4xl font-bold text-white mb-2">
        Admin{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
          management
        </span>
      </h1>
      <p className="text-slate-400 mb-8">
        Add new administrator accounts or remove existing ones.
      </p>

      <div className="relative rounded-3xl border border-white/25 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 md:p-8 mb-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-trnasparent" />
        <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[var(--color-primary)]/25 blur-3xl" />
        <div className="relative">
          <h3 className="text-lg font-semibold text-white mb-6">
            Add new admin
          </h3>

          {formError && (
            <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">
              {formError}
            </p>
          )}

          {!pendingAdmin ? (
            <form
              onSubmit={handleFormSubmit}
              className="grid md:grid-cols-3 gap-4"
            >
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
              </div>
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[var(--color-primary)] hover:opacity-90 disabled:opacity-50 transition"
                >
                  Review and create
                </button>
              </div>
            </form>
          ) : (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
              <p className="text-amber-200 text-sm mb-4">
                Confirm: grant full admin access to{" "}
                <span className="font-semibold">{pendingAdmin.name}</span> (
                {pendingAdmin.email})? This account will be able to manage all
                users, students, instructors, and system settings.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleConfirmCreate}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Confirm & create admin"}
                </button>
                <button
                  onClick={handleCancelCreate}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 text-slate-300 border border-white/20 hover:bg-white/20 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative rounded-3xl border border-white/25 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 md:p-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via/white/50 to-transparent" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[var(--color-secondary)]/25 blur-3xl" />
        <div className="relative">
          <h3 className="text-lg font-semibold text-white mb-4">
            Current admins{" "}
            <span className="text-slate-400 font-normal text-white mb-6">
              ({admins.length})
            </span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-400 uppercase text-xs tracking-wider">
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr
                    key={a._id}
                    className="bg-[var(--color-background)]/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-5 rounded-l-2xl align-middle font-medium">
                      {a.name}{" "}
                      {a._id === currentUser?._id && (
                        <span className="text-xs text-slate-400">(you)</span>
                      )}
                    </td>
                    <td className="px-6 py-5 align-middle text-gray-300">
                      {a.email}
                    </td>
                    <td className="px-6 py-5 rounded-r-2xl align-middle text-center">
                      <button
                        onClick={() => handleDelete(a._id)}
                        disabled={a._id === currentUser?._id}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManagementPage;
