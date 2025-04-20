export function Footer() {
	return (
		<footer className="w-full z-50 overflow-hidden flex flex-col gap-8 fixed bottom-0 bg-black md:justify-center justify-end px-4 md:px-20 text-white">
			<div className="grid grid-cols-3 justify-center gap-4 h-16">
				<div className="flex items-center">
					<div className="flex items-center gap-2">
						<p className="items-center whitespace-nowrap font-medium tracking-wider text-center text-base flex">
							<span className="text-neutral-400 md:block hidden">
								Open Sourced by
							</span>
							<a
								href="https://twitter.com/DanielKanem"
								target="_blank"
								rel="noopener noreferrer"
								className="clickable flex ml-1.5 items-center font-mono font-medium tracking-wide text-neutral-100 transition duration-200 hover:brightness-125">
								<span className="md:block hidden">DanielKanem</span>
							</a>
						</p>
					</div>
				</div>
				<div className="flex items-center gap-6 justify-center">
					<a
						className="animate-pulse"
						href="https://x.com/DanielKanem"
						target="_blank"
						rel="noreferrer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 text-white"
							viewBox="0 0 24 24"
							fill="none">
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
							className="relative group flex items-center"
							href="https://github.com/dev-xo/remix-auth-totp"
							target="_blank"
							rel="noreferrer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6 text-white/80 group-hover:text-white transition-all duration-200"
								viewBox="0 0 24 24"
								fill="none">
								<path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
									fill="currentColor"
								/>
							</svg>
							<span className="md:inline-flex hidden whitespace-nowrap absolute cursor-default group-hover:brightness-125 left-10 items-center justify-center px-2.5 py-1 text-base border select-none font-medium rounded-lg border-blue-200/40 bg-blue-500/40 text-blue-100">
								Star it!
							</span>
						</a>
					</div>
				</div>
				<div className="flex items-center justify-end">
					<a
						className="group"
						href="https://github.com/sponsors/dev-xo"
						target="_blank"
						rel="noreferrer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 text-white/80 group-hover:text-white transition-all duration-200"
							viewBox="0 0 24 24"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M5.9767 10C5.99206 10.0004 6.00739 10.0004 6.02268 10H17.9773C17.9926 10.0004 18.0079 10.0004 18.0233 10H19C19.5523 10 20 9.55228 20 9C20 8.44772 19.5523 8 19 8H18.677L18.414 7.34252C17.3649 4.71979 14.8248 3 12 3C9.17523 3 6.63505 4.71979 5.58596 7.34252L5.32297 8H5C4.44772 8 4 8.44772 4 9C4 9.55228 4.44772 10 5 10H5.9767ZM7.47796 8H16.522C15.7563 6.18469 13.9762 5 12 5C10.0238 5 8.2437 6.18468 7.47796 8Z"
								fill="currentColor"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M16.3957 1.08142C16.9033 1.29897 17.1385 1.88685 16.9209 2.39448L13.9209 9.39448C13.7034 9.90211 13.1155 10.1373 12.6079 9.91971C12.1002 9.70215 11.8651 9.11428 12.0826 8.60665L15.0826 1.60665C15.3002 1.09902 15.8881 0.863864 16.3957 1.08142Z"
								fill="currentColor"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M6.00001 8.25C5.78077 8.25 5.57251 8.34592 5.43002 8.51254C5.28753 8.67915 5.22508 8.89977 5.25908 9.11634L6.74466 18.577L6.74467 18.577L6.74467 18.577C6.86283 19.3297 6.96244 19.9642 7.10839 20.466C7.26364 20.9997 7.49442 21.4715 7.93101 21.8385C8.36979 22.2073 9.04862 22.4169 9.69993 22.5442C10.3873 22.6785 11.1842 22.7462 11.9716 22.7498C12.7587 22.7535 13.5611 22.6933 14.2589 22.5606C14.9237 22.4343 15.6139 22.221 16.069 21.8385C16.5056 21.4715 16.7364 20.9997 16.8916 20.466C17.0376 19.9642 17.1372 19.3298 17.2553 18.5772L17.2553 18.5771L17.2553 18.577L18.7409 9.11634C18.7749 8.89977 18.7125 8.67915 18.57 8.51254C18.4275 8.34592 18.2192 8.25 18 8.25L6.00001 8.25ZM13.0023 13C12.45 13 12.0023 13.4477 12.0023 14C12.0023 14.5523 12.45 15 13.0023 15H13.0112C13.5635 15 14.0112 14.5523 14.0112 14C14.0112 13.4477 13.5635 13 13.0112 13H13.0023ZM10 15.5C9.44772 15.5 9 15.9477 9 16.5C9 17.0523 9.44772 17.5 10 17.5H10.0089C10.5612 17.5 11.0089 17.0523 11.0089 16.5C11.0089 15.9477 10.5612 15.5 10.0089 15.5H10ZM13.9911 17C13.4388 17 12.9911 17.4477 12.9911 18C12.9911 18.5523 13.4388 19 13.9911 19H14C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17H13.9911Z"
								fill="currentColor"
							/>
						</svg>
					</a>
				</div>
			</div>
		</footer>
	)
}
