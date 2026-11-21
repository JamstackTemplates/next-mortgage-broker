import { useId } from 'react';

type LanternProps = {
  /** Whether the porch light is on (casts a warm amber glow). */
  lit?: boolean;
  /** Render a subtle hanging chain above the lantern cap. */
  chain?: boolean;
  /** Size preset or custom CSS class. */
  className?: string;
};

/**
 * Hand-drawn brass porch lantern in the shared 2px ink outline style.
 * Uses CSS palette tokens so dark mode deepens the brass and warms the glow.
 */
export function Lantern({ lit = true, chain = true, className = 'h-10 w-10' }: LanternProps) {
  const glowId = useId();
  return (
    <svg
      viewBox="0 0 64 76"
      className={`${lit ? 'lantern-lit' : ''} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="56%" r="48%">
          <stop offset="0%" stopColor="var(--porch-light)" stopOpacity="0.95" />
          <stop offset="55%" stopColor="var(--porch-light)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--porch-light)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {lit ? (
        <circle className="lantern-halo" cx="32" cy="44" r="28" fill={`url(#${glowId})`} />
      ) : null}

      <g
        fill="none"
        stroke="var(--ink)"
        strokeOpacity="0.85"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {chain ? (
          <>
            <path d="M32 2v11" />
            <ellipse cx="32" cy="7" rx="2.2" ry="3.2" fill="var(--brass)" />
          </>
        ) : null}

        {/* Hanging ring & vented cap */}
        <circle cx="32" cy="16" r="3" fill="var(--brass)" />
        <path d="M24 22c2-3.5 14-3.5 16 0" fill="var(--brass)" />
        <path d="M17 27.5 32 19.5l15 8z" fill="var(--brass)" />

        {/* Glass lantern cage */}
        <path
          d="M20 27.5h24l-3 27.5H23z"
          fill={lit ? 'var(--porch-light)' : 'var(--paper-2)'}
          fillOpacity={lit ? '0.9' : '0.8'}
        />

        {/* Inner bulb / flame */}
        {lit ? (
          <>
            <path d="M32 33v9" stroke="#FFFFFF" strokeWidth="2.2" />
            <circle cx="32" cy="43" r="3.4" fill="#FFFDF5" stroke="none" />
          </>
        ) : (
          <path d="M32 35v8" strokeOpacity="0.4" strokeWidth="1.8" />
        )}

        {/* Mullion bar */}
        <path d="M32 27.5V55" strokeOpacity="0.55" strokeWidth="1.6" />
        <path d="M21.5 41h21" strokeOpacity="0.35" strokeWidth="1.4" />

        {/* Brass base & finial */}
        <path d="M22.5 55h19l2.5 5.5H20z" fill="var(--brass)" />
        <path d="M28.5 60.5h7l-3.5 5z" fill="var(--brass)" />
      </g>
    </svg>
  );
}
