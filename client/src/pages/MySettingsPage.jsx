import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, changePassword } from "../api/authApi";

function MySettingsPage() {
  const { user, setUser } = useAuth();

  // Profile form state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordServerError, setPasswordServerError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileMessage("");
    setProfileSaving(true);

    try {
      const updated = await updateProfile({ name, email });
      setUser((prev) => ({ ...prev, name: updated.name, email: updated.email }));
      setProfileMessage("Profile updated successfully.");
    } catch (err) {
      setProfileError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  const validatePassword = () => {
    const errors = {};
    if (!currentPassword) errors.currentPassword = "Current password is required";
    if (!newPassword) errors.newPassword = "New password is required";
    else if (newPassword.length < 8) errors.newPassword = "Password must be at least 8 characters";
    if (confirmPassword !== newPassword) errors.confirmPassword = "Passwords do not match";
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setPasswordServerError("");
    setPasswordMessage("");

    if (!validatePassword()) return;

    setPasswordSaving(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordServerError(
        err.response?.data?.message || "Failed to change password."
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-8 md:p-12">
      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/30 mb-4">
        My account
      </span>
      <h1 className="text-4xl font-bold text-white mb-2">
        Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">settings</span>
      </h1>
      <p className="text-slate-400 mb-8">
        Update your profile details and manage your password.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Profile details card */}
        <div className="relative rounded-3xl border border-white/25 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 md:p-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[var(--color-primary)]/25 blur-3xl" />

          <div className="relative">
            <h2 className="text-lg font-semibold text-white mb-6">
              Profile Details
            </h2>
            <form onSubmit={handleProfileSave}>
              {profileError && (
                <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">
                  {profileError}
                </p>
              )}
              {profileMessage && (
                <p className="bg-emerald-500/10 text-emerald-400 text-sm p-2 rounded mb-4">
                  {profileMessage}
                </p>
              )}

              <div className="mb-4">
                <label className="block mb-2 text-sm text-slate-300" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm text-slate-300" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                disabled={profileSaving}
                className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[var(--color-primary)] hover:opacity-90 disabled:opacity-50 transition"
              >
                {profileSaving ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </div>
        </div>

        {/* Change password card */}
        <div className="relative rounded-3xl border border-white/25 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 md:p-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[var(--color-secondary)]/25 blur-3xl" />

          <div className="relative">
            <h2 className="text-lg font-semibold text-white mb-6">
              Change Password
            </h2>
            <form onSubmit={handlePasswordSave}>
              {passwordServerError && (
                <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">
                  {passwordServerError}
                </p>
              )}
              {passwordMessage && (
                <p className="bg-emerald-500/10 text-emerald-400 text-sm p-2 rounded mb-4">
                  {passwordMessage}
                </p>
              )}

              <div className="mb-4">
                <label className="block mb-2 text-sm text-slate-300" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
                {passwordErrors.currentPassword && (
                  <p className="text-red-400 text-sm mt-1">{passwordErrors.currentPassword}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm text-slate-300" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
                {passwordErrors.newPassword && (
                  <p className="text-red-400 text-sm mt-1">{passwordErrors.newPassword}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm text-slate-300" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{passwordErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={passwordSaving}
                className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[var(--color-primary)] hover:opacity-90 disabled:opacity-50 transition"
              >
                {passwordSaving ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MySettingsPage;