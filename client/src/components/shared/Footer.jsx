function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-surface)] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-2 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Section 1: Brand + stats */}
        <div className="h-full flex flex-col justify-center" >
          <h3 className="text-gradient-brand font-semibold text-5xl mb-2">
            driveEASE
          </h3>
          <p className="text-xl text-slate-400">2000+ Students</p>
          <p className="text-xl text-slate-400">20+ Years Experience</p>
        </div>

        {/* Section 2: Social links */}
        <div  className="h-full flex flex-col justify-center">
          <h4 className="text-white font-medium text-2xl mb-3">Follow Us</h4>
          <div className="flex gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary)] transition-colors"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.6 1.5-4 3.9-4 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12z"/> 
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary)] transition-colors"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
               <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.4.5.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.5.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.5 2.4-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.5.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.4-.5-.6-.2-1-.5-1.5-1-.4-.4-.7-.9-1-1.5-.2-.5-.4-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-2 .5-2.4.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2zm0 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 1.8a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4zm5.7-2a1 1 0 1 1-2.1 0 1 1 0 0 1 2.1 0z"/>
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary)] transition-colors"
              aria-label="YouTube"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.5v-7l6.3 3.5-6.3 3.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Section 3: Contact info */}
        <div >
          <h4 className="text-white font-medium text-2xl mb-2">Contact Us</h4>
          <div className="flex items-start gap-4 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 mt-0.5 shrink-0 text-[var(--color-accent)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1 3.3a1 1 0 0 1-.3 1L7.4 9.6a12 12 0 0 0 7 7l1.6-1.6a1 1 0 0 1 1-.3l3.3 1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C10.5 21 3 13.5 3 4V5z"
              />
            </svg>
            <p className="text-sm text-slate-400 mb-1">011 2233444</p>
          </div>

          <div className="flex items-start gap-4 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 mt-0.5 shrink-0 text-[var(--color-accent)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
              />
            </svg>
            <p className="text-sm text-slate-400 mb-1">driveease@gmail.com</p>
          </div>

          <div className="flex items-start gap-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5 mt-0.5 shrink-0 text-[var(--color-accent)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21z"
              />
              <circle
                cx="12"
                cy="9.5"
                r="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-slate-400">
              2nd Floor, New Complex Building, University of Sri
              Jayawardenepura, Gangodawila, Nugegoda
            </p>
          </div>
        </div>

        {/* Section 4: Map */}
        <div> 
          <h4 className="text-white font-medium  text-2xl mb-2">Find Us</h4>
          <iframe
            title="driveEASE location map"
            src="https://www.google.com/maps?q=Faculty+of+Applied+Sciences+University+of+Sri+Jayewardenepura&output=embed"
            className="w-full h-32  border-white/10"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
