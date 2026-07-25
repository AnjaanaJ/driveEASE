import {useState} from "react";

function LoginPage() {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[var(--color-surface)] p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-white mb-6">Login</h1>

        <div className="mb-4">
          <label className="block text-slate-300 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-300 mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;