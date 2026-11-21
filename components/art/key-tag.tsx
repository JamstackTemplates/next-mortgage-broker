import type { ReactNode } from 'react';

/**
 * Paper key tag hanging on a brass split ring for lender names on Home and /lenders/.
 */
export function KeyTag({
  name,
  kindLabel,
  knownFor,
  chips,
  tiltClass = '',
  compact = false,
}: {
  name: string;
  kindLabel?: string;
  knownFor?: string;
  chips?: ReactNode;
  tiltClass?: string;
  compact?: boolean;
}) {
  return (
    <div className={`relative flex flex-col items-center pt-5 ${tiltClass}`}>
      {/* Brass nail & split ring */}
      <svg
        viewBox="0 0 40 34"
        className="pointer-events-none absolute top-0 left-1/2 h-8 w-10 -translate-x-1/2"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="20" cy="6" r="4" fill="var(--brass)" stroke="var(--ink)" strokeOpacity="0.85" strokeWidth="1.8" />
        <ellipse
          cx="20"
          cy="18"
          rx="8"
          ry="10"
          fill="none"
          stroke="var(--brass)"
          strokeWidth="3"
        />
        <ellipse
          cx="20"
          cy="18"
          rx="8"
          ry="10"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.65"
          strokeWidth="1.2"
        />
      </svg>

      {/* Scalloped paper tag body */}
      <div
        className={`relative w-full rounded-xl border-2 border-ink/80 bg-paper text-left shadow-[0_3px_0_rgba(42,38,34,0.14)] ${
          compact ? 'px-3.5 pt-4 pb-3 text-center' : 'px-4 pt-5 pb-4'
        }`}
      >
        {/* Reinforced eyelet hole */}
        <span
          aria-hidden="true"
          className="mx-auto mb-2 block h-3 w-3 rounded-full border-2 border-brass bg-paper-2"
        />
        {kindLabel ? (
          <span className="eyebrow block text-[0.7rem]">{kindLabel}</span>
        ) : null}
        <p className={`font-display font-bold text-ink ${compact ? 'text-[0.98rem] leading-tight' : 'mt-1 text-lg leading-snug'}`}>
          {name}
        </p>
        {knownFor ? <p className="mt-1.5 text-sm leading-snug text-muted">{knownFor}</p> : null}
        {chips ? <div className="mt-3 flex flex-wrap gap-1.5">{chips}</div> : null}
      </div>
    </div>
  );
}

/** Wooden key rail bar that key tags hang beneath. */
export function KeyRail({ label }: { label?: string }) {
  return (
    <div className="relative mb-2 flex items-center gap-3" aria-hidden={!label}>
      {label ? (
        <span className="font-display shrink-0 rounded-md border-2 border-ink/80 bg-haint px-3 py-1 text-sm font-bold text-ink">
          {label}
        </span>
      ) : null}
      <div
        aria-hidden="true"
        className="h-3 flex-1 rounded-full border-2 border-ink/75 bg-paper-2 shadow-[inset_0_-2px_0_rgba(42,38,34,0.12)]"
      />
    </div>
  );
}
