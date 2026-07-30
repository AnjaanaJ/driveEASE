import { useState } from "react";
import { changePassword } from "../../api/authApi";

function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    if (!validate()) return;

    setSubmitting(true);
    try {
      await changePassword(currentPassword, newPassword);
      setSuccessMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Failed to change password. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="relative rounded-3xl border border-white/20 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />

          <div className="relative">
            <h1 className="text-2xl font-bold text-white mb-6">
              Change Password
            </h1>

            <form onSubmit={handleSubmit}>
              {serverError && (
                <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">
                  {serverError}
                </p>
              )}
              {successMessage && (
                <p className="bg-emerald-500/10 text-emerald-400 text-sm p-2 rounded mb-4">
                  {successMessage}
                </p>
              )}

              <div className="mb-4">
                <label className="block mb-1 text-sm text-slate-300" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
                {errors.currentPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.currentPassword}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm text-slate-300" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
                {errors.newPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block mb-1 text-sm text-slate-300" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 rounded-md text-white font-medium transition disabled:opacity-50 bg-[var(--color-primary)] hover:opacity-90"
              >
                {submitting ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;