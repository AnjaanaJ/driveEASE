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
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">System Settings</h1>

      <form onSubmit={handleSave} className="text-white mb-10 max-w-md">
        <div className="mb-4">
          <label
            className="block-mb-1 text-sm text-slate-300"
            htmlFor="siteName"
          >
            Site Name
          </label>
          <input
            id="siteName"
            type="text"
            value={settings.siteName}
            onChange={handleTextChange}
            className="w-full px-3 py-2 rounded-md bg-slate-900/60 border border-slate-700"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span>Maintenance Mode</span>
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={() => handleToggle("maintenanceMode")}
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <span>Registration Open</span>
          <input
            type="checkbox"
            checked={settings.registrationOpen}
            onChange={() => handleToggle("registrationOpen")}
          />
        </div>
        {saveMessage && <p className="mb-4 text-sm">{saveMessage}</p>}
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-md bg-[var(--color-primary)] disabled:opacity-50"
        >
          {saving ? "Saving ..." : "Save Settings"}
        </button>
      </form>

      <h2 className="text-xl font-bold text-white mb-4">Activity Logs</h2>
      <ul className="text-white space-y-2">
        {logs.map((log) => (
          <li key={log._id}>
            {log.userId?.name || "Unknown user"} — {log.action} —{" "}
            {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminSystemSettingsPage;
