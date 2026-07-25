import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "* Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "* Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const isValid = validate();
    if (!isValid) return;

    setSubmitting(true);
    try {
      const data = await login(email, password);
      const role = data.role || data.user?.role;

      if (role == "admin") navigate("/admin/dashboard");
      else if (role == "instructor") navigate("/instructor/dashboard");
      else navigate("/student/dashboard");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Invalid email or password",
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--color-primary)] opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[var(--color-secondary)] opacity-20 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden bg-[var(--color-surface)]/70 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
        >
          <div className="pointer-events-none absolute -top-1/2 -left-1/4 w-3/4 h-[200%] bg-gradient-to-br from-white/20 via-white/0 to-transparent rotate-12" />
          <h1 className="text-2xl font-semibold text-white mb-6 text-center">
            Welcome back!!!
          </h1>
          <p className="test-slate-400 text-sm mb-6">
            Log in to continue to your dashboard
          </p>

          {serverError && (
            <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">
              {serverError}
            </p>
          )}
          <div className="mb-4">
            <label
              className="block text-slate-300 mb-1 text-sm"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate--900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-slate-300 mb-1 text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring[var(--color-primary)] focus:border-transparent transition"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 rounded-md text-white font-mediium transition disabled:opacity-50 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:opacity-90"
          >
            {submitting ? "Logging in ... " : "Log in"}
          </button>
          <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?{""}
            <a
              href="/register"
              className="text-[var(--color-accent)] hover:underline"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
