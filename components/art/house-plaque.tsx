import type { ReactNode } from 'react';

/**
 * Eight hand-drawn house motifs, one per loan type:
 * - conventional-fixed: gabled cottage
 * - fha: bungalow
 * - va: house with a flag
 * - usda: farmhouse with a silo
 * - jumbo: two-storey colonial
 * - arm: house with a weathervane
 * - bank-statement: house with a workshop
 * - refinance: house with a circular arrow
 */
export function HouseMotif({ loanId, className = 'h-16 w-20' }: { loanId: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 96 76"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="var(--ink)"
        strokeOpacity="0.85"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {loanId === 'conventional-fixed' ? (
          /* Gabled cottage */
          <>
            <path d="M16 38 48 14 80 38" fill="var(--primary)" />
            <rect x="23" y="38" width="50" height="28" fill="var(--trim)" />
            <rect x="42" y="47" width="12" height="19" fill="var(--primary)" />
            <rect x="29" y="45" width="9" height="10" fill="var(--haint)" />
            <rect x="58" y="45" width="9" height="10" fill="var(--haint)" />
            <rect x="61" y="18" width="7" height="14" fill="var(--paper-2)" />
            <path d="M12 66h72" />
          </>
        ) : loanId === 'fha' ? (
          /* Craftsman bungalow with wide low porch roof */
          <>
            <path d="M10 38 48 18 86 38Z" fill="var(--floor)" />
            <rect x="18" y="38" width="60" height="28" fill="var(--trim)" />
            <path d="M14 48h68" />
            <path d="M26 48v18M70 48v18" strokeWidth="2.6" />
            <rect x="42" y="48" width="12" height="18" fill="var(--primary)" />
            <rect x="38" y="25" width="20" height="8" fill="var(--haint)" />
            <path d="M10 66h76" />
          </>
        ) : loanId === 'va' ? (
          /* House with a flag */
          <>
            <path d="M18 38 48 16 78 38Z" fill="var(--floor)" />
            <rect x="25" y="38" width="46" height="28" fill="var(--trim)" />
            <rect x="42" y="48" width="12" height="18" fill="var(--primary)" />
            <rect x="30" y="45" width="8" height="9" fill="var(--haint)" />
            <rect x="58" y="45" width="8" height="9" fill="var(--haint)" />
            {/* Flagpole & waving flag */}
            <path d="M77 66V16" strokeWidth="2.2" />
            <path d="M77 17 C83 15 88 20 92 18 L92 29 C88 31 83 26 77 28 Z" fill="var(--primary)" />
            <path d="M14 66h72" />
          </>
        ) : loanId === 'usda' ? (
          /* Farmhouse with a silo */
          <>
            {/* Silo */}
            <path d="M64 26 C64 16 82 16 82 26 V66 H64 Z" fill="var(--paper-2)" />
            <path d="M64 26h18M64 38h18M64 50h18" strokeOpacity="0.45" strokeWidth="1.5" />
            {/* Farmhouse */}
            <path d="M12 38 38 18 64 38Z" fill="var(--primary)" />
            <rect x="18" y="38" width="40" height="28" fill="var(--trim)" />
            <rect x="33" y="48" width="10" height="18" fill="var(--floor)" />
            <rect x="22" y="44" width="7" height="8" fill="var(--haint)" />
            <rect x="47" y="44" width="7" height="8" fill="var(--haint)" />
            <path d="M8 66h80" />
          </>
        ) : loanId === 'jumbo' ? (
          /* Two-storey colonial */
          <>
            <path d="M12 26 48 12 84 26Z" fill="var(--floor)" />
            <rect x="17" y="26" width="62" height="40" fill="var(--trim)" />
            {/* Second-storey windows */}
            <rect x="24" y="31" width="9" height="10" fill="var(--haint)" />
            <rect x="43.5" y="31" width="9" height="10" fill="var(--haint)" />
            <rect x="63" y="31" width="9" height="10" fill="var(--haint)" />
            {/* First-storey windows & centered entry */}
            <rect x="24" y="48" width="9" height="10" fill="var(--haint)" />
            <rect x="42" y="46" width="12" height="20" fill="var(--primary)" />
            <rect x="63" y="48" width="9" height="10" fill="var(--haint)" />
            <path d="M10 66h76" />
          </>
        ) : loanId === 'arm' ? (
          /* House with a weathervane */
          <>
            {/* Weathervane */}
            <path d="M48 6v14M38 11h20M55 8l4 3-4 3" strokeWidth="1.9" />
            <path d="M16 40 48 20 80 40Z" fill="var(--haint)" />
            <rect x="23" y="40" width="50" height="26" fill="var(--trim)" />
            <rect x="42" y="48" width="12" height="18" fill="var(--primary)" />
            <rect x="29" y="46" width="9" height="9" fill="var(--porch-light)" />
            <rect x="58" y="46" width="9" height="9" fill="var(--porch-light)" />
            <path d="M12 66h72" />
          </>
        ) : loanId === 'bank-statement' ? (
          /* House with an attached workshop */
          <>
            {/* Main house */}
            <path d="M10 38 34 18 58 38Z" fill="var(--floor)" />
            <rect x="16" y="38" width="36" height="28" fill="var(--trim)" />
            <rect x="29" y="49" width="10" height="17" fill="var(--primary)" />
            <rect x="20" y="44" width="6" height="7" fill="var(--haint)" />
            {/* Attached workshop with shed roof & wide bench door */}
            <path d="M52 34 L86 42 L86 66 L52 66 Z" fill="var(--paper-2)" />
            <rect x="58" y="47" width="22" height="19" fill="var(--haint)" />
            <path d="M58 53h22M58 59h22" strokeOpacity="0.45" strokeWidth="1.4" />
            <path d="M8 66h82" />
          </>
        ) : (
          /* Refinance: house with a circular refresh arrow */
          <>
            <path d="M22 40 48 22 74 40Z" fill="var(--primary)" />
            <rect x="29" y="40" width="38" height="24" fill="var(--trim)" />
            <rect x="43" y="48" width="10" height="16" fill="var(--floor)" />
            {/* Circular arrow framing the house */}
            <path d="M18 28 A34 34 0 0 1 78 26" strokeWidth="2.2" />
            <path d="M73 19 L79 27 L70 28" strokeWidth="2.2" />
            <path d="M78 52 A34 34 0 0 1 18 54" strokeWidth="2.2" />
            <path d="M23 61 L17 53 L26 52" strokeWidth="2.2" />
          </>
        )}
      </g>
    </svg>
  );
}

/**
 * Enamel house-number plaque frame used to display loan types on Home and /loans/.
 */
export function HouseNumberPlaque({
  loanId,
  badgeNumber,
  badgeLabel,
  title,
  children,
  className = '',
}: {
  loanId: string;
  badgeNumber: string;
  badgeLabel: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`relative rounded-[1.15rem] border-2 border-ink/80 bg-paper p-5 shadow-[0_4px_0_rgba(42,38,34,0.14)] ${className}`}
    >
      {/* Inner enamel pinstripe border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-1.5 rounded-[0.8rem] border border-line"
      />
      {/* Four brass plaque screws */}
      <span aria-hidden="true" className="absolute top-3 left-3 h-2 w-2 rounded-full border border-ink/70 bg-brass" />
      <span aria-hidden="true" className="absolute top-3 right-3 h-2 w-2 rounded-full border border-ink/70 bg-brass" />
      <span aria-hidden="true" className="absolute bottom-3 left-3 h-2 w-2 rounded-full border border-ink/70 bg-brass" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 h-2 w-2 rounded-full border border-ink/70 bg-brass" />

      <div className="relative z-10 px-1.5 pt-1">
        <div className="flex items-start justify-between gap-3">
          <HouseMotif loanId={loanId} className="h-14 w-[4.5rem]" />
          <div className="rounded-lg border-2 border-ink/75 bg-haint px-3 py-1 text-right">
            <span className="font-display block text-2xl leading-none font-bold text-ink tabular">
              {badgeNumber}
            </span>
            <span className="mt-0.5 block text-[0.7rem] font-semibold tracking-wider text-ink/80 uppercase">
              {badgeLabel}
            </span>
          </div>
        </div>
        <h3 className="font-display mt-3 text-xl leading-snug font-bold text-ink">{title}</h3>
        <div className="mt-2 text-[0.95rem] text-muted">{children}</div>
      </div>
    </article>
  );
}
