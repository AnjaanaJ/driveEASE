import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getNotifications, markNotificationRead, markAllNotificationsRead } from "../../services/notificationApi";

function NotificationsPage() {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getNotifications(user._id || user.id);
        setNotifications(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchNotifications();
  }, [user]);

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      // Update just that one notification locally, instead of re-fetching everything
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      setError("Failed to mark notification as read.");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead(user._id || user.id);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      setError("Failed to mark all notifications as read.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Notifications</h1>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      {loading && <p className="text-slate-400">Loading notifications...</p>}
      {error && <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded">{error}</p>}
      {!loading && !error && notifications.length === 0 && (
        <p className="text-slate-400">No notifications yet.</p>
      )}

      <ul className="space-y-2 max-w-2xl">
        {notifications.map((n) => (
          <li
            key={n._id}
            className={`p-4 rounded-lg border border-white/10 flex justify-between items-center ${
              n.isRead ? "bg-[var(--color-surface)]/40 text-slate-400" : "bg-[var(--color-surface)]/80 text-white"
            }`}
          >
            <span>{n.message}</span>
            {!n.isRead && (
              <button
                onClick={() => handleMarkRead(n._id)}
                className="text-xs text-[var(--color-accent)] hover:underline ml-4 shrink-0"
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsPage;