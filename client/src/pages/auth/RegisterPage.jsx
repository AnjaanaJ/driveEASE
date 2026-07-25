import {useState} from "react";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, password, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[var(--color-surface)] p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-white mb-6">
          Create an Account
        </h1>

        <div className="mb-4">
          <label className="block text-slate-300 mb-1" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-[var(--color-primary)]"
          />
        </div>

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

        <div className="mb-4">
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

        <div className="mb-6">
          <label className="block text-slate-300 mb-1" htmlFor="role">
            I am a
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-slate-800 text-white border border-slate-600 focus:outline-none focus:border-[var(--color-primary)]"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-[var(--color-primary)] text-white font-medium hover:opacity-90 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;