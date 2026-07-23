import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function HomePage() {
  const [showSocials, setShowSocials] = useState(false);

  return (
    <div className="bg-background text-text-primary">
      {/* Hero Section */}
      <section className="max-w-[1500px] mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <div className ="md:pl-10 lg:pl-16">
          {/* Company name */}
          
          <p
           className="text-7xl md:text-9xl font-extrabold text-gradient-brand mb-6 -mt-6"
           
           >
            driveEASE
          </p>
          
          

           {/* Platform label */}
          <span className="inline-block px-6 py-2.5 rounded-full text-sm md:text-base font-medium bg-accent/10 text-accent border border-accent/20 mb-6">
            🇱🇰 Sri Lanka&apos;s most popular smart driving school platform
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 mt-8">
            Learn smart.
            <br />
            Drive{" "}
            <span className="text-gradient-brand">confidently.</span>
          </h1>

          <p className="text-text-secondary text-base md:text-lg mb-8 max-w-md">
          Every great driver starts with the right guidance. driveEASE brings expert instructors,
           smart scheduling, and real progress tracking together-{""}
           <span className="font-semibold text-text-primary">
           No paperwork. No guesswork. Just you, the road, and the confidence to own it.
           </span>
            </p>

         
        </div>

        {/* Right: Logo and buttons */}
        <div className="flex flex-col items-center -mt-8">
          {/* Logo panel */}
          <div className="relative flex items-center justify-center">
            {/* Background glow */}
            <div className="absolute w-[300px] h-[300px] sm:w-[350px] sm:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full bg-primary/20 blur-3xl" />

            {/* Circular image holder */}
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] rounded-full border border-primary/30 bg-surface/40 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-lg shadow-primary/10">
              <img
                src={logo}
                alt="driveEASE logo"
                className="w-[98%] h-[98%] max-w-none object-contain drop-shadow-[0_0_25px_rgba(30,117,254,0.35)]"
              />
            </div>
          </div>

          {/* Buttons under the image */}
          <div className="relative flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg bg-surface/60 border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
            >
              Register Online now
            </Link>

            <button
              type="button"
              onClick={() => setShowSocials((currentValue) => !currentValue)}
              className="px-6 py-3 rounded-lg bg-accent/10 border border-accent text-accent font-medium hover:bg-accent hover:text-white transition-colors"
            >
              About Us
            </button>

            {/* Social links */}
            {showSocials && (
              <div className="absolute top-full mt-2 right-0 flex gap-3 p-3 rounded-lg bg-surface/90 backdrop-blur-xl border border-white/10 shadow-lg z-10">
                {/* Facebook */}
                <a
                  href="https://facebook.com/driveEASE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/driveEASE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.675a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@driveease.com"
                  className="text-text-secondary hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@driveEASE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors"
                  aria-label="YouTube"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Stats footer */}
      <section className="max-w-[1500px] mx-auto px-6 pb-24== -mt-14">
        <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/30 px-6 py-14">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-text-primary">50+</p>
              <p className="text-xs text-text-secondary mt-1">Fleet vehicles</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-text-primary">2000+</p>
              <p className="text-xs text-text-secondary mt-1">Students trained</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-text-primary">30+</p>
              <p className="text-xs text-text-secondary mt-1">Certified instructors</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-accent">20+</p>
              <p className="text-xs text-text-secondary mt-1">Years of experience</p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default HomePage;