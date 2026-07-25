import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-surface/40 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="driveEASE logo"
            className="h-40 w-40 object-contain rounded-full ring-2 ring-primary/40"
          />
          <span className="text-6xl font-extrabold tracking-tight text-gradient-brand drop-shadow-[0_0_25px_rgba(30,117,254,0.35)]">
            <span className="text-text-primary">drive</span>
            <span className="text-gradient-brand">EASE</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-primary text-text-primary hover:bg-secondary transition-colors"
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-text-primary"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-surface/60 backdrop-blur-xl">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-text-secondary hover:text-text-primary transition-colors">
            Home
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="text-text-secondary hover:text-text-primary transition-colors">
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 rounded-lg bg-primary text-text-primary text-center hover:bg-secondary transition-colors"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;