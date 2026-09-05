import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Footer from "../../components/shared/Footer.jsx";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "student";
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
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
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <div className="relative flex-1 flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--color-primary)] opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[var(--color-secondary)] opacity-20 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-white/10  animate-slide-in-left min-h-[600px] transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_40px_-5px_var(--color-accent)]">
          {/* Left: form */}
          <div className="relative overflow-hidden bg-[var(--color-surface)]/40 backdrop-blur-2xl border-r border-white/10 p-8 flex flex-col justify-center">
            <div className="pointer-events-none absolute -top-1/2 -left-1/4 w-3/4 h-[200%] bg-gradient-to-br from-white/10 via-white/0 to-transparent rotate-12" />

            <div className="relative">
              <h1 className="text-2xl font-semibold text-white mb-1">
                Create your account
              </h1>
              <p className="text-slate-400 text-sm mb-5">
                Get started with driveEASE today
              </p>

            
              <form onSubmit={handleSubmit}>
                {serverError && (
                  <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">
                    {serverError}
                  </p>
                )}

                <div className="mb-4">
                  <label
                    className="block text-slate-300 mb-1 text-sm"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
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
                    className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-tansparent transition"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-slate-300 mb-1 text-sm"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pr-9 pl-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.4 5.5A9.6 9.6 0 0 1 12 5c5 0 9 4 10 7-.4 1.1-1.2 2.4-2.3 3.5M6.3 6.3C4.2 7.7 2.7 9.6 2 12c1 3 5 7 10 7 1.3 0 2.5-.3 3.6-.7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
                            />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-slate-300 mb-1 text-sm"
                      htmlFor="confirmPassword"
                    >
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.4 5.5A9.6 9.6 0 0 1 12 5c5 0 9 4 10 7-.4 1.1-1.2 2.4-2.3 3.5M6.3 6.3C4.2 7.7 2.7 9.6 2 12c1 3 5 7 10 7 1.3 0 2.5-.3 3.6-.7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"
                            />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2 rounded-md  text-white font-medium transition disabled:opacity-50 bg-[var(--color-accent)] hover:opacity-90 "
                >
                  {submitting ? "Creating account ..." : "Create Account"}
                </button>
                <p className="text-center text-slate-400 text-sm mt-6">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    Sign In
                  </a>
                </p>
              </form>
            </div>
          </div>

          <div className="relative hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-background)] to-[var(--color-surface)] overflow-hidden">
            <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-[var(--color-primary)] opacity-25 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[var(--color-secondary)] opacity-25 blur-3xl pointer-events-none" />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute -bottom-6 -right-6 w-48 h-48 text-white/10"
            >
              <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11h1a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1H3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h1zm2 0h10l-1-3H8l-1 3zM6 14a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zm12 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
            </svg>

            <h2 className="relative text-2xl font-bold text-white mb-2">
              Join driveEASE
            </h2>
            <p className="relative text-white/80 text-sm mb-6">
              Full-stack platform for driving school management.
            </p>
            <ul className="relative space-y-3 text-sm text-white/90">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 shrink-0"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path strokeLinecap="round" d="M3 10h18M8 2v4M16 2v4" />
                </svg>
                Online booking & scheduling
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 shrink-0"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path strokeLinecap="round" d="M2 10h20" />
                </svg>
                Digital payments & invoices
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3v18h18M7 15l4-4 3 3 5-6"
                  />
                </svg>
                Real-time analytics & reports
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 8a6 6 0 0 1 12 0c0 3 1 4 1 5H5s1-2 1-5zM10 19a2 2 0 0 0 4 0"
                  />
                </svg>
                Automated notifications
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;
