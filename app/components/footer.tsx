export function Footer() {
  return (
    <footer className="w-full z-50 overflow-hidden flex flex-col gap-8 fixed bottom-0 bg-black md:justify-center justify-end px-4 md:px-20 text-white">
      <div className="grid grid-cols-3 justify-center gap-4 h-16">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <p className="flex items-center whitespace-nowrap text-center text-base font-medium tracking-wide">
              <span className="hidden truncate text-neutral-400 md:block">
                Open Sourced by
              </span>
              <a
                href="https://twitter.com/DanielKanem"
                target="_blank"
                rel="noopener noreferrer"
                className="clickable flex items-center font-mono font-medium tracking-wide text-neutral-100 transition duration-200 hover:brightness-125"
              >
                {}
                <span className="hidden md:block ml-1.5">DanielKanem</span>
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 justify-center">
          <a
            className="animate-pulse"
            href="https://x.com/DanielKanem"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <div className="flex items-center relative">
            <a
              className="group relative flex items-center"
              href="https://github.com/dev-xo/remix-auth-totp"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="z-10 h-6 w-6 text-white/80 transition-all duration-200 group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  fill="currentColor"
                />
              </svg>
              <span className="absolute left-8 z-10 hidden select-none whitespace-nowrap text-base font-medium text-blue-100 group-hover:brightness-125 md:inline-flex">
                Star on GitHub
              </span>
              <div className="absolute -left-2 hidden h-10 w-full min-w-[165px] rounded-full border border-blue-200/40 bg-blue-500/20 md:inline-flex" />
            </a>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <a
            className="group"
            href="https://github.com/sponsors/dev-xo"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white/80 transition-all duration-200 group-hover:text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.4189 15.6602C21.1899 13.624 22.75 11.153 22.75 8.69434C22.7499 5.45202 20.3484 2.75 17 2.75C15.4082 2.75 13.8662 3.26268 12 4.96484C10.1338 3.26268 8.59184 2.75 7 2.75C3.65156 2.75 1.25005 5.45202 1.25 8.69434C1.25 11.153 2.8101 13.624 4.58105 15.6602C6.37954 17.7279 8.5291 19.4969 9.96191 20.5684L10.1943 20.7285C11.3812 21.4741 12.8985 21.4204 14.0381 20.5684L14.6074 20.1348C16.0032 19.05 17.8453 17.4694 19.4189 15.6602Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
