import { useState, useEffect } from "react";
import { getSettings, getActivityLogs } from "../../api/adminApi";

function AdminSystemSettingsPage() {
  const [settings, setSettings] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <div className="p-8 text-white">Loading settings...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">System Settings</h1>

      <div className="text-white mb-8">
        <p>Site Name: {settings.siteName}</p>
        <p>Maintenance Mode: {settings.maintenanceMode ? "ON" : "OFF"}</p>
        <p>Registration Open: {settings.registrationOpen ? "YES" : "NO"}</p>
      </div>

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