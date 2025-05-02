import { Link } from "react-router";

export function Navigation() {
  return (
    <Link
      to="/"
      className="relative flex items-center gap-2 py-6"
      prefetch="intent"
    >
      <p className="flex items-center gap-1 text-xl font-medium tracking-wide text-neutral-800">
        Remix Auth
        <span className="font-extrabold text-neutral-950">TOTP</span>
        <span className="-right-17 absolute inline-flex h-8 select-none items-center justify-center rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-2.5 text-base font-medium text-yellow-600">
          v4.0
        </span>
      </p>
    </Link>
  );
}
