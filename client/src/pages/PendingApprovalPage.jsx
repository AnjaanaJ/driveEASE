import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../services/axiosInstance";

function PendingApprovalPage() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  useEffect(() => {
    const checkApproval = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        const latestUser = res.data.user || res.data;
        setUser(latestUser);

        if (latestUser.isApproved) {
          if (latestUser.role === "admin") navigate("/admin/dashboard");
          else if (latestUser.role === "instructor")
            navigate("/instructor/dashboard");
          else navigate("/student/dashboard");
        }
      } catch (err) {
        // Silently ignore - we'll just try again on the next interval tick
      }
    };

    const intervalId = setInterval(checkApproval, 3000);
    return () => clearInterval(intervalId);
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative rounded-3xl border border-white/20 bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-amber-500/20 blur-3xl" />

          <div className="relative">
            <h1 className="text-2xl font-bold text-white mb-3">
              Admin Approval Pending
            </h1>
            <p className="text-slate-300 text-sm mb-6">
              Hi {user?.name || "there"}, your account has been granted admin
              privileges but it is still awaiting approval from another
              administrator . You'll gain access once your admin status is
              confirmed .
            </p>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[var(--color-primary)] hover:opacity-90 transition"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingApprovalPage;
