import { useState, useEffect } from "react";
import {
  getSettings,
  getActivityLogs,
  updateSettings,
} from "../../api/adminApi";

function AdminSystemSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, logsData] = await Promise.all([
          getSettings(),
          getActivityLogs(),
        ]);
        setSettings(settingsData);
        setLogs(logsData);
      } catch (err) {
        setError("Failed to load settings or logs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTextChange = (e) => {
    setSettings((prev) => ({ ...prev, siteName: e.target.value }));
  };

  const handleToggle = (field) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");

    try {
      const updated = await updateSettings({
        siteName: settings.siteName,
        maintenanceMode: settings.maintenanceMode,
        registrationOpen: settings.registrationOpen,
      });
      setSettings(updated.settings);
      setSaveMessage("Settings saved successfully.");
    } catch (err) {
      setSaveMessage("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-white">Loading settings...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen p-8 md:p-12">
      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-sky-300 bg-sky-500/10 border border-sky-500/30 mb-4">
        Admin panel
      </span>
      <h1 className="text-4xl font-bold text-white mb-2">
        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
          Settings
        </span>
        
      </h1>
      <p className="text-slate-400 mb-8">
        Configure platform-wide options and review recent admin activity.
      </p>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Settings card */}
        <div className="relative rounded-3xl border border-white/25 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 md:p-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/40 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02]" />
          <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--color-primary)]/30 blur-3xl" />

          <div className="relative">
            <h2 className="text-lg font-semibold text-white mb-6">
              General Configuration
            </h2>

            <form onSubmit={handleSave} className="text-white mb-10 max-w-md">
              <div className="mb-5">
                <label
                  className="block mb-2 text-sm text-slate-300"
                  htmlFor="siteName"
                >
                  Site Name
                </label>
                <input
                  id="siteName"
                  type="text"
                  value={settings.siteName}
                  onChange={handleTextChange}
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 text-white  border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                />
              </div>
              <div className="flex items-center justify-between py-3 border-t border-white/10">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-xs text-slate-400">
                    Temporarily restrict access to the platform
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={() => handleToggle("maintenanceMode")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-[var(--color-accent)] transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                </label>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-white/10 mb-6">
                <div>
                  <p className="font-medium">Registration Open</p>
                  <p className="text-xs text-slate-400">
                    Allow new students and instructors to sign up
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.registrationOpen}
                    onChange={() => handleToggle("registrationOpen")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-[var(--color-accent)] transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                </label>
              </div>
              {saveMessage && (
                <p className="mb-4 text-sm text-emerald-400">{saveMessage}</p>
              )}
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-lg text-sm font-medium  bg-[var(--color-primary)] hover:opacity-90 disabled:opacity-50 transition"
              >
                {saving ? "Saving ..." : "Save Settings"}
              </button>
            </form>
          </div>
        </div>

        {/* Activity log card */}
        <div className="relative rounded-3xl border border-white/25 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6 md:p-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/40 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02]" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[var(--color-secondary)]/30 blur-3xl" />

          <div className="relative">
            <h2 className="text-lg font-semibold text-white mb-6">
              Activity Logs
            </h2>
            <div className="max-h-[420px] overflow-y-auto pr-2 space-y-2">
              {logs.length === 0 && (
                <p className="text-slate-400 text-sm">No activity yet.</p>
              )}
              {logs.map((log) => (
                <div
                  key={log._id}
                  className="rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3"
                >
                  <p className="text-sm text-white">{log.action}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {log.userId?.name || "Unknown user"} &middot;{" "}
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSystemSettingsPage;
