import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least 1 uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least 1 number";
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
      await register(name, email, password, role);
      navigate("/login", {
        state: {
          message:
            "Registration successful !! Please wait for the admin approval to loggiin in",
        },
      });
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Registration failed . Please try again",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4 overflow-hiden">
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--color-primary)] opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[var(--color-secondary)] opacity-20 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden bg-[var(--color-surface)]/70 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl"
        >
          <div className="pointer-events-none absolute -top-1/2 -left-1/4 w-3/4 h-[200%] bg-gradient-to-br from-white/20 via-white/0 to-transparent rotate-12" />
          <h1 className="text-2xl font-semibold text-white mb-1 text-center">
            Create an Account
          </h1>
          <p className="text-slate-400 text-sm mb-6 text-center">
            Join with us to make your dreams come true
          </p>
          {serverError && (
            <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">
              {serverError}
            </p>
          )}

          <div className="mb-4">
            <label className="block text-slate-300 mb-1 text-sm" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

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
              className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-tansparent transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
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
              className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-slate-300 mb-1 text-sm" htmlFor="role">
              I am a
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-[var(--color-primary)] focus:border-transparent transition"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 rounded-md  text-white font-medium transition disabled:opacity-50 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:opacity-90 "
          >
            {submitting ? "Creating account ..." : "Register"}
          </button>
          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[var(--color-accent)] hover:underline"
            >
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
