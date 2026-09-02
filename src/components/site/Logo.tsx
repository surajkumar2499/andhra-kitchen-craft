import { Link } from "@tanstack/react-router";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="23" fill="var(--forest)" />
      <path
        d="M31 14c-8 0-13 4.5-13 11 0 3.2 1.3 5.9 3.4 7.6C25 29.5 29.6 24 31 14z"
        fill="var(--mustard)"
      />
      <path
        d="M17 33c2.5-6.5 7.5-11.5 14-14"
        stroke="var(--cream)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 34c-2.5-1-4.5-3-5.5-5.5 3 .2 5.4 1.4 6.8 3.4z"
        fill="var(--terracotta)"
      />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Andhra Ruchulu home">
      <LogoMark className={compact ? "h-8 w-8 shrink-0" : "h-10 w-10 shrink-0"} />
      <span className="min-w-0">
        <span className="block truncate font-serif text-lg leading-none font-bold text-primary sm:text-xl">
          Andhra <span className="text-terracotta">Ruchulu</span>
        </span>
        {!compact && (
          <span className="mt-1 hidden text-[9px] tracking-[0.18em] text-muted-foreground uppercase sm:block">
            Homemade Pickles &amp; Snacks
          </span>
        )}
      </span>
    </Link>
  );
}
