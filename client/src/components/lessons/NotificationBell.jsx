import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getNotifications } from "../../services/notificationApi";

function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentUserId = user?._id || user?.id;

  useEffect(() => {
    if (!currentUserId) return;

    const fetchNotifications = async () => {
      try {
        const res = await getNotifications(currentUserId);
        setNotifications(res.data);
      } catch (err) {
        
        console.error("Failed to load notifications for bell:", err);
      }
    };

    fetchNotifications();
  }, [currentUserId]);

  // Close the dropdown if the user clicks anywhere outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const recentFive = notifications.slice(0, 5);

  if (!user) return null; 

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-white/10 transition"
        aria-label="Notifications"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8a6 6 0 0 1 12 0c0 3 1 4 1 5H5s1-2 1-5zM10 19a2 2 0 0 0 4 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-medium rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-[var(--color-surface)] border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-2 border-b border-white/10 text-white text-sm font-medium">
            Notifications
          </div>

          {recentFive.length === 0 ? (
            <p className="px-4 py-3 text-slate-400 text-sm">No notifications yet.</p>
          ) : (
            <ul>
              {recentFive.map((n) => (
                <li
                  key={n._id}
                  className={`px-4 py-2 text-sm border-b border-white/5 last:border-0 ${
                    n.isRead ? "text-slate-400" : "text-white"
                  }`}
                >
                  {n.message}
                </li>
              ))}
            </ul>
          )}

          <Link
            to="/notifications"
            onClick={() => setOpen(false)}
            className="block text-center py-2 text-xs text-[var(--color-accent)] hover:underline border-t border-white/10"
          >
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;