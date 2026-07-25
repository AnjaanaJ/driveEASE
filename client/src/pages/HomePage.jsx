import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function HomePage() {
  return (
    <div className="bg-background text-text-primary">
      {/* Hero Section */}
      <section className="max-w-[1500px] mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <div className="md:pl-10 lg:pl-16 animate-slide-in-left">
          {/* Company name */}
          <p className="text-7xl md:text-9xl font-extrabold text-gradient-brand mb-6 -mt-6">
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
            smart scheduling, and real progress tracking together —{" "}
            <span className="font-semibold text-text-primary">
              No paperwork. No guesswork. Just you, the road, and the confidence to own it.
            </span>
          </p>

          {/* Social media icons */}
          <div className="flex items-center gap-4 mb-8">
            <a href="https://facebook.com/driveEASE" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary hover:scale-125 transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            <a href="https://instagram.com/driveEASE" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary hover:scale-125 transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.675a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>

            <a href="https://youtube.com/@driveEASE" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary hover:scale-125 transition-colors" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Logo and buttons */}
        <div className="flex flex-col items-center -mt-8 animate-slide-in-right">
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
          </div>
        </div>
      </section>

      
<section className="max-w-[1500px] mx-auto px-6 py-20">
  <p className="text-accent text-sm font-semibold tracking-wide uppercase mb-3">
    Platform
  </p>
  <h2 className="text-3xl md:text-4xl font-extrabold mb-4 max-w-2xl">
    Everything a modern driving school needs, in one place
  </h2>
  <p className="text-text-secondary text-base md:text-lg mb-12 max-w-2xl">
    Built for administrators, instructors and students — driveEASE keeps
    scheduling, payments and progress in sync across every role.
  </p>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Feature 1 */}
   <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-2xl p-6 shadow-lg shadow-black/20 hover:border-primary/40 hover:scale-105 hover:-translate-y-1 transition-all">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
    <div className="relative">
      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="font-semibold text-lg mb-2">Online booking & scheduling</h3>
      <p className="text-sm text-text-secondary">
        Students pick a slot, instructors confirm, vehicles are auto-assigned. No back-and-forth calls.
      </p>
    </div>
</div>
    {/* Feature 2 */}
     <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-2xl p-6 shadow-lg shadow-black/20 hover:border-secondary/40 hover:scale-105 hover:-translate-y-1 transition-all">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
    <div className="relative">
      <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a4 4 0 00-8 0v2M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h3 className="font-semibold text-lg mb-2">Digital payments & invoices</h3>
      <p className="text-sm text-text-secondary">
        Package payments, balances and receipts handled online with full payment history.
      </p>
    </div>
    </div>

    {/* Feature 3 */}
     <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-2xl p-6 shadow-lg shadow-black/20 hover:border-secondary/40 hover:scale-105 hover:-translate-y-1 transition-all">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
    <div className="relative">
      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <h3 className="font-semibold text-lg mb-2">Real-time analytics & reports</h3>
      <p className="text-sm text-text-secondary">
        Admins get live visibility into revenue, fleet usage and instructor performance.
      </p>
    </div>
    </div>

    {/* Feature 4 */}
     <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-2xl p-6 shadow-lg shadow-black/20 hover:border-secondary/40  hover:scale-105 hover:translate-y-1 transition-all">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
    <div className="relative">
      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
      <h3 className="font-semibold text-lg mb-2">Automated notifications</h3>
      <p className="text-sm text-text-secondary">
        Lesson reminders, payment due alerts and progress updates sent automatically.
      </p>
    </div>
  </div>
  </div>
</section>

{/* How It Works Section */}
<section className="max-w-[1500px] mx-auto px-6 py-8">
  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/30 backdrop-blur-xl px-6 md:px-12 py-16">
    <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

    <div className="relative">
      <p className="text-accent text-sm font-semibold tracking-wide uppercase mb-3">
        How it works
      </p>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 max-w-2xl">
        From sign-up to certified driver in three steps
      </h2>
      <p className="text-text-secondary text-base md:text-lg mb-14 max-w-2xl">
        A simple, guided journey designed to keep you moving forward at every stage.
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Step 1 */}
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg mb-5 shadow-lg shadow-primary/30">
            1
          </div>
          <h3 className="font-semibold text-lg mb-2">Register & choose a package</h3>
          <p className="text-sm text-text-secondary max-w-xs mx-auto">
            Sign up, upload your documents and pick Beginner, Refresher or VIP.
          </p>
        </div>

        {/* Step 2 */}
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg mb-5 shadow-lg shadow-primary/30">
            2
          </div>
          <h3 className="font-semibold text-lg mb-2">Book your lessons</h3>
          <p className="text-sm text-text-secondary max-w-xs mx-auto">
            Choose available time slots and get matched with a certified instructor.
          </p>
        </div>

        {/* Step 3 */}
        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg mb-5 shadow-lg shadow-primary/30">
            3
          </div>
          <h3 className="font-semibold text-lg mb-2">Track progress & get certified</h3>
          <p className="text-sm text-text-secondary max-w-xs mx-auto">
            Follow your progress lesson by lesson and prepare for your license test.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Pricing Section */}
<section className="max-w-[1500px] mx-auto px-6 py-20">
  <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
    <div>
      <p className="text-accent text-sm font-semibold tracking-wide uppercase mb-3">
        Packages
      </p>
      <h2 className="text-3xl md:text-4xl font-extrabold max-w-xl">
        Choose the plan that fits your pace
      </h2>
    </div>
    <button className="px-5 py-2.5 rounded-lg border border-white/10 bg-surface/40 text-sm font-medium hover:bg-surface/60 transition-colors">
      Compare all packages
    </button>
  </div>

  <div className="grid md:grid-cols-3 gap-6 items-center">
    {/* Beginner */}
    <div className="rounded-2xl border border-white/10 bg-surface/40 backdrop-blur-xl p-8 hover:scale-105 hover:translate-y-1 transition-all ">
      <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">Beginner</p>
      <p className="text-3xl font-extrabold mb-1">LKR 32,000</p>
      <p className="text-xs text-text-secondary mb-6">12 lessons · ideal for first-time drivers</p>
      <ul className="space-y-3 text-sm text-text-secondary">
        <li className="flex items-start gap-2">
          <span className="text-accent mt-0.5">✓</span> 12 one-hour lessons
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent mt-0.5">✓</span> Shared instructor scheduling
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent mt-0.5">✓</span> Basic manoeuvres & road rules
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent mt-0.5">✓</span> Progress tracking
        </li>
      </ul>
    </div>

    {/* VIP - highlighted */}
    <div className="relative rounded-2xl border border-primary/40 bg-gradient-to-b from-surface/80 to-background p-8 shadow-2xl shadow-primary/20 md:-translate-y-4 hover:scale-105 hover:translate-y-2 transition-all">
      <span className="absolute -top-3 right-8 px-3 py-1 rounded-full bg-accent text-background text-xs font-bold">
        Most popular
      </span>
      <p className="text-primary text-xs font-semibold uppercase tracking-wide mb-2">VIP</p>
      <p className="text-3xl font-extrabold mb-1">LKR 65,000</p>
      <p className="text-xs text-text-secondary mb-6">30 lessons · full license-ready program</p>
      <ul className="space-y-3 text-sm text-text-secondary">
        <li className="flex items-start gap-2">
          <span className="text-primary mt-0.5">✓</span> 30 one-hour lessons
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary mt-0.5">✓</span> Dedicated instructor
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary mt-0.5">✓</span> Highway driving module
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary mt-0.5">✓</span> Mock license test
        </li>
      </ul>
    </div>

    {/* Refresher */}
    <div className="rounded-2xl border border-white/10 bg-surface/40 backdrop-blur-xl p-8 hover:scale-105 hover:translate-y-1 transition-all">
      <p className="text-secondary text-xs font-semibold uppercase tracking-wide mb-2">Refresher</p>
      <p className="text-3xl font-extrabold mb-1">LKR 18,000</p>
      <p className="text-xs text-text-secondary mb-6">8 lessons · for licensed drivers rebuilding confidence</p>
      <ul className="space-y-3 text-sm text-text-secondary">
        <li className="flex items-start gap-2">
          <span className="text-secondary mt-0.5">✓</span> 8 one-hour lessons
        </li>
        <li className="flex items-start gap-2">
          <span className="text-secondary mt-0.5">✓</span> Flexible scheduling
        </li>
        <li className="flex items-start gap-2">
          <span className="text-secondary mt-0.5">✓</span> Highway & parking focus
        </li>
        <li className="flex items-start gap-2">
          <span className="text-secondary mt-0.5">✓</span> Progress tracking
        </li>
      </ul>
    </div>
  </div>
</section>

      {/* Stats footer */}
      <section className="max-w-[1500px] mx-auto px-6 pb-24 -mt">
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