import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/courses", label: "Courses" },
  { to: "/admin/payments", label: "Payments" },
  { to: "/lessons", label: "Lessons" },
  { to: "/admin/settings", label: "Settings" },
];

const instructorLinks = [
  { to: "/instructor/dashboard", label: "Dashboard" },
  { to: "/lessons/calendar", label: "My Schedule" },
];

const studentLinks = [
  { to: "/student/dashboard", label: "Dashboard" },
  { to: "/student/register-profile", label: "My Profile" },
  { to: "/courses", label: "Courses" },
  { to: "/lessons/book", label: "Book a Lesson" },
  { to: "/student/payments", label: "Payments" },
];

const sharedLinks = [{ to: "/notifications", label: "Notifications" }];

function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  const roleLinks =
    user.role === "admin"
      ? adminLinks
      : user.role === "instructor"
      ? instructorLinks
      : studentLinks;

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-[var(--color-surface)] border-r border-white/10 flex flex-col">
      <div className="px-6 py-5 border-b border-white/10">
        <span className="text-gradient-brand font-bold text-2xl">
          driveEASE
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {roleLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
          {sharedLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="px-6 py-4 border-t border-white/10 text-xs text-slate-500">
        Logged in as <span className="text-slate-300">{user.name}</span>
      </div>
    </aside>
  );
}

export default Sidebar;