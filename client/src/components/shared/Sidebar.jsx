import { NavLink,useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const adminLinks = [
  { to: "/", label: "Home" },
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/courses", label: "Courses" },
  { to: "/admin/payments", label: "Payments" },
  { to: "/admin/lessons", label: "Lessons" },

  { to: "/notifications", label: "Notifications" },
];

const instructorLinks = [
  { to: "/", label: "Home" },
  { to: "/instructor/dashboard", label: "Dashboard" },
  { to: "/instructor/lessons", label: "My Schedule" },
  { to: "/notifications", label: "Notifications" },
];

const studentLinks = [
  { to: "/", label: "Home" },
  { to: "/student/dashboard", label: "Dashboard" },
  { to: "/student/profile", label: "My Profile" },
  { to: "/courses", label: "Courses" },
  { to: "/student/lessons", label: "Book a Lesson" },
  { to: "/student/payments", label: "Payments" },
  { to: "/notifications", label: "Notifications" },
];

const bottomLinksByRole = {
  admin: [{ to: "/admin/settings", label: "Settings" }],
  instructor: [],
  student: [],
};

function Sidebar() {
  const { user,logout } = useAuth();
  const navigate=useNavigate();

  if (!user) return null;

  const handleLogout=()=>{
    logout();
    navigate("/login");
  };

  const roleLinks =
    user.role === "admin"
      ? adminLinks
      : user.role === "instructor"
        ? instructorLinks
        : studentLinks;

  const bottomLinks = bottomLinksByRole[user.role] || [];

  const linkClass = ({ isActive }) =>
    `block px-3 py-2.5 rounded-xl text-base font-medium transition-all ${
      isActive
        ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <aside className="relative w-74 shrink-0 min-h-screen bg-white/[0.03] backdrop-blur-2xl border-r border-white/20 flex flex-col overflow-hidden">
         <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-16 w-56 h-56 rounded-full bg-[var(--color-secondary)]/20 blur-3xl" />

      <div className="px-3 py-5 border-b border-white/10 flex items-center gap-3">
        <img
          src={logo}
          alt="driveEASE logo "
          className="w-28 rounded-full object-cover"
        />
        <span className="text-gradient-brand font-bold text-3xl">
          driveEASE
        </span>
      </div>

      <nav className="relative flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {roleLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={linkClass}>
            {link.label}
          </NavLink>
        ))}
      </nav>
      {bottomLinks.length > 0 && (
        <div className="relative px-3 py-4 border-t border-white/10 space-y-1">
          {bottomLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

      <div className="relative px-6 py-4 border-t border-white/10 ">
      <p className="text-lg text-slate-400 mb-3">
        Logged in as :<span className="text-white font-semibold">{user.name}</span>
        </p>
        <NavLink 
        to ="/my-settings"
        className="block w-full mb-2 px-3 py-3 rounded-lg text-sm font-medium text-center text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
        My Settings
        </NavLink>
        <button onClick={handleLogout}
        className="w-full px-3 py-2 rounded-lg text-sm font-medium text-rose-300 bg-rose-500/10 hover:bg-red-500/20 transition-colors">
            Log Out
            </button>
      </div>
    </aside>
  );
}

export default Sidebar;
