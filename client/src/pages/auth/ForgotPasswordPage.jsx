import { useState } from "react";
import { forgotPassword } from "../../api/authApi";
import Footer from "../../components/shared/Footer.jsx";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setSubmitting(true);
    try {
      const data = await forgotPassword(email);
      setResetToken(data.resetToken || "");
      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <div className="relative flex-1 flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-[var(--color-primary)] opacity-25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[var(--color-secondary)] opacity-25 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-slide-in-right min-h-[600px] transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_40px_-5px_var(--color-accent)]">
          <div className="relative hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-background)] to-[var(--color-surface)] overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute -bottom-6 -right-6 w-48 h-48 text-white/10"
            >
              <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11h1a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1H3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h1zm2 0h10l-1-3H8l-1 3zM6 14a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zm12 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z" />
            </svg>

            <h2 className="relative text-2xl font-extrabold text-white mb-2">
              Smart Driving School Management System
            </h2>
            <p className="relative text-white/80 text-sm mb-6">
              We'll help you get back into your driveEASE account.
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

          <div className="relative overflow-hidden bg-[var(--color-surface)]/40 backdrop-blur-2xl p-8 flex flex-col justify-center">
            <div className="pointer-events-none absolute -top-1/2 -left-1/4 w-3/4 h-[200%] bg-gradient-to-br from-white/20 via-white/0 to-transparent rotate-12" />
            <div className="relative">
              <h1 className="text-2xl font-semibold text-white mb-1">
                Forgot password
              </h1>
              <p className="text-slate-400 text-sm mb-5">
                Enter your email and we'll help you reset your password.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <p className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-4">
                      {error}
                    </p>
                  )}
                  <div className="mb-6">
                    <label
                      className="block text-slate-300 mb-1 text-sm"
                      htmlFor="email"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 6l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
                        />
                      </svg>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-md bg-slate-900/60 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2 rounded-md text-white font-medium transition disabled:opacity-50 bg-[var(--color-accent)] hover:opacity-90"
                  >
                    {submitting ? "Sending..." : "Send reset link"}
                  </button>
                  <p className="text-center text-slate-400 text-sm mt-6">
                    Remembered your password?{" "}
                    <a
                      href="/login"
                      className="text-[var(--color-accent)] hover:underline"
                    >
                      Back to login
                    </a>
                  </p>
                </form>
              ) : (
                <div>
                  <p className="bg-emerald-500/10 text-emerald-300 text-sm p-3 rounded mb-4">
                    If that email exists, a reset link has been generated.
                  </p>

                  {resetToken && (
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 mb-4">
                      <p className="text-amber-200 text-xs mb-2">
                        Demo mode: since this project doesn't send real
                        emails, here is your reset link. Normally this would
                        arrive in your inbox.
                      </p>
                      <a
                        href={`/reset-password/${resetToken}`}
                        className="text-[var(--color-accent)] underline break-all text-sm"
                      >
                        {window.location.origin}/reset-password/{resetToken}
                      </a>
                    </div>
                  )}

                  <a
                    href="/login"
                    className="block text-center text-[var(--color-accent)] hover:underline text-sm"
                  >
                    Back to login
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPasswordPage;
