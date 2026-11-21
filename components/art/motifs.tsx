import { useId } from 'react';

const sharedStroke = {
  fill: 'none',
  stroke: 'var(--ink)',
  strokeOpacity: 0.85,
  strokeWidth: 2.1,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Rural mailbox with animated flag that rises on parent hover/focus (.mailbox-trigger). */
export function Mailbox({ className = 'h-24 w-28', raised = false }: { className?: string; raised?: boolean }) {
  return (
    <svg
      viewBox="0 0 132 106"
      className={`shrink-0 ${raised ? 'mailbox-raised' : ''} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g {...sharedStroke}>
        {/* Post */}
        <rect x="52" y="68" width="15" height="34" fill="var(--trim)" />
        <path d="M36 82 L52 68" strokeWidth="3" />
        {/* Body */}
        <path d="M18 38 C18 18 40 18 52 18 H98 C114 18 120 30 120 44 V68 H18 Z" fill="var(--floor)" />
        {/* Rounded door */}
        <path d="M18 38 C18 18 48 18 48 38 V68 H18 Z" fill="var(--paper-2)" />
        {/* Door handle */}
        <circle cx="33" cy="36" r="2.6" fill="var(--brass)" />
        {/* Animated red flag */}
        <g className="mailbox-flag">
          <path d="M78 46 V10 H100 V24 H84 V46 Z" fill="var(--primary)" />
          <circle cx="81" cy="46" r="3.2" fill="var(--brass)" />
        </g>
        {/* Painted "318" */}
        <text
          x="84"
          y="58"
          textAnchor="middle"
          fill="var(--trim)"
          stroke="none"
          fontSize="16"
          fontWeight="700"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          318
        </text>
      </g>
    </svg>
  );
}

/** Two wooden rocking chairs facing each other across a sweet-tea table. */
export function RockingChairs({ className = 'h-36 w-56' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 144" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <g {...sharedStroke}>
        {/* Floor plank baseline */}
        <path d="M10 132h220" strokeOpacity="0.4" />
        {/* Left rocking chair */}
        <g transform="translate(18, 22)">
          <path d="M2 102 Q36 116 74 100" strokeWidth="2.8" />
          <path d="M14 28 L8 72 L58 72 L60 58 L18 58" fill="var(--trim)" />
          <path d="M12 10 L18 58 M24 10 L26 58 M36 12 L34 58" />
          <path d="M6 10 Q24 2 44 12 L44 20 Q24 12 6 20 Z" fill="var(--trim)" />
          <path d="M16 42 L60 42" strokeWidth="3.2" />
          <path d="M16 72 L12 102 M52 72 L58 100" />
          <rect x="14" y="56" width="44" height="10" rx="4" fill="var(--primary)" />
        </g>

        {/* Center side table with two iced teas */}
        <g transform="translate(95, 66)">
          <ellipse cx="25" cy="14" rx="25" ry="6.5" fill="var(--trim)" />
          <path d="M14 20 L10 62 M36 20 L40 62 M13 44 L37 44" />
          <path d="M12 -4 L22 -4 L20 12 L14 12 Z" fill="var(--brass)" />
          <path d="M18 -10 L16 6" strokeWidth="1.6" />
          <circle cx="22" cy="-3" r="3" fill="var(--porch-light)" />
          <path d="M29 -3 L39 -3 L37 12 L31 12 Z" fill="var(--brass)" />
          <path d="M35 -9 L33 6" strokeWidth="1.6" />
        </g>

        {/* Right rocking chair */}
        <g transform="translate(148, 22)">
          <path d="M0 100 Q38 116 72 102" strokeWidth="2.8" />
          <path d="M58 28 L64 72 L14 72 L12 58 L54 58" fill="var(--trim)" />
          <path d="M60 10 L54 58 M48 10 L46 58 M36 12 L38 58" />
          <path d="M28 12 Q48 2 66 10 L66 20 Q48 12 28 20 Z" fill="var(--trim)" />
          <path d="M56 42 L12 42" strokeWidth="3.2" />
          <path d="M56 72 L60 102 M20 72 L14 100" />
          <rect x="14" y="56" width="44" height="10" rx="4" fill="var(--haint)" />
        </g>
      </g>
    </svg>
  );
}

/** Small sweet tea glass motif beside "no fee to talk" notes. */
export function SweetTeaGlass({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 48" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <g {...sharedStroke}>
        {/* Straw */}
        <path d="M27 4 L21 30" strokeWidth="2" />
        {/* Lemon slice on rim */}
        <circle cx="31" cy="14" r="6" fill="var(--porch-light)" />
        {/* Glass & amber sweet tea */}
        <path d="M11 14 H31 L28 42 H14 Z" fill="var(--paper)" />
        <path d="M12.2 21 H29.8 L27.6 41 H14.4 Z" fill="var(--brass)" fillOpacity="0.88" stroke="none" />
        <path d="M11 14 H31 L28 42 H14 Z" fill="none" />
        {/* Ice cubes */}
        <rect x="15.5" y="23" width="5" height="5" rx="1" fill="var(--trim)" strokeWidth="1.3" />
        <rect x="21.5" y="27" width="5" height="5" rx="1" fill="var(--trim)" strokeWidth="1.3" />
      </g>
    </svg>
  );
}

/**
 * Cutaway house illustrating what makes up a monthly mortgage payment (PITI + PMI):
 * Foundation = Principal, Walls = Interest, Roof = Property taxes, Fence = Insurance, Scaffold = PMI.
 */
export function CutawayHouse({ className = 'w-full h-auto' }: { className?: string }) {
  const grainId = useId();
  return (
    <svg
      viewBox="0 0 460 360"
      className={className}
      role="img"
      aria-label="Cutaway house diagram mapping Principal to the foundation, Interest to the walls, Property taxes to the roof, Homeowners insurance to the fence, and Mortgage insurance to the temporary scaffold"
    >
      <defs>
        <filter id={grainId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.055 0" in="noise" />
        </filter>
      </defs>

      <rect x="0" y="0" width="460" height="360" rx="14" fill="var(--paper-2)" />

      <g {...sharedStroke}>
        {/* Ground line */}
        <path d="M24 306 H436" strokeWidth="2.4" />

        {/* 1. Foundation — Principal */}
        <rect x="92" y="254" width="234" height="52" rx="3" fill="var(--floor)" />
        <path d="M92 272 H326 M92 288 H326 M150 254 V272 M210 272 V288 M268 254 V272 M176 288 V306" stroke="var(--trim)" strokeOpacity="0.4" strokeWidth="1.5" />
        <text x="209" y="286" textAnchor="middle" fill="var(--floor-ink)" stroke="none" fontSize="15" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
          1. Principal (the foundation)
        </text>

        {/* 2. Walls — Interest */}
        <rect x="102" y="142" width="214" height="112" fill="var(--paper)" />
        {/* Windows & door */}
        <rect x="122" y="166" width="38" height="44" fill="var(--haint)" />
        <path d="M141 166 V210 M122 188 H160" strokeWidth="1.6" />
        <rect x="190" y="180" width="38" height="74" fill="var(--primary)" />
        <circle cx="220" cy="218" r="2.6" fill="var(--porch-light)" />
        <rect x="256" y="166" width="38" height="44" fill="var(--haint)" />
        <path d="M275 166 V210 M256 188 H294" strokeWidth="1.6" />
        <rect x="116" y="150" width="186" height="22" rx="4" fill="var(--paper-2)" strokeWidth="1.4" />
        <text x="209" y="166" textAnchor="middle" fill="var(--ink)" stroke="none" fontSize="13.5" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
          2. Interest (the walls)
        </text>

        {/* 3. Roof — Property taxes */}
        <polygon points="78,144 209,54 340,144" fill="var(--primary)" />
        <rect x="128" y="102" width="162" height="24" rx="5" fill="var(--paper)" strokeWidth="1.6" />
        <text x="209" y="119" textAnchor="middle" fill="var(--ink)" stroke="none" fontSize="13.5" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
          3. Taxes (the roof)
        </text>

        {/* 4. Picket fence — Homeowners insurance */}
        <g>
          {[32, 48, 64, 80].map(x => (
            <path key={x} d={`M${x} 306 V258 L${x + 5} 248 L${x + 10} 258 V306 Z`} fill="var(--trim)" />
          ))}
          <path d="M28 272 H92 M28 292 H92" strokeWidth="2.4" />
          <rect x="10" y="206" width="84" height="36" rx="6" fill="var(--paper)" strokeWidth="1.6" />
          <text x="52" y="222" textAnchor="middle" fill="var(--ink)" stroke="none" fontSize="11.5" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
            4. Insurance
          </text>
          <text x="52" y="235" textAnchor="middle" fill="var(--muted)" stroke="none" fontSize="12" fontWeight="700" style={{ fontFamily: 'var(--font-hand)' }}>
            (the fence)
          </text>
        </g>

        {/* 5. Temporary scaffold — PMI */}
        <g strokeDasharray="5 4">
          <path d="M336 306 V148 M394 306 V148" strokeWidth="2.2" />
          <path d="M336 250 H394 M336 196 H394 M336 154 H394" strokeWidth="2.2" />
          <path d="M336 250 L394 196 M336 196 L394 154" strokeWidth="1.5" />
        </g>
        <rect x="330" y="104" width="112" height="36" rx="6" fill="var(--porch-light)" fillOpacity="0.88" strokeWidth="1.6" />
        <text x="386" y="120" textAnchor="middle" fill="#2A2622" stroke="none" fontSize="12.5" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
          5. PMI
        </text>
        <text x="386" y="134" textAnchor="middle" fill="#2A2622" stroke="none" fontSize="11.5" fontWeight="700" style={{ fontFamily: 'var(--font-hand)' }}>
          (temporary scaffold)
        </text>
      </g>

      <rect x="0" y="0" width="460" height="360" rx="14" filter={`url(#${grainId})`} pointerEvents="none" />
    </svg>
  );
}

/** Flow diagram for "How we're paid" on /how-it-works/. */
export function PaidFlowDiagram({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 176"
      className={className}
      role="img"
      aria-label="Flow diagram showing that the lender pays broker compensation at closing, and the exact figure appears on your Loan Estimate, with zero charge to talk"
    >
      <g {...sharedStroke}>
        {/* Box 1: Chosen Lender */}
        <rect x="14" y="34" width="192" height="106" rx="12" fill="var(--paper)" />
        <text x="110" y="74" textAnchor="middle" fill="var(--ink)" stroke="none" fontSize="18" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
          Your chosen lender
        </text>
        <text x="110" y="100" textAnchor="middle" fill="var(--muted)" stroke="none" fontSize="13.5" style={{ fontFamily: 'var(--font-sans)' }}>
          From our panel of lenders
        </text>

        {/* Arrow 1 */}
        <path d="M214 87 H260" strokeWidth="2.6" />
        <path d="M250 79 L262 87 L250 95" strokeWidth="2.6" />

        {/* Box 2: Broker paid at closing */}
        <rect x="268" y="24" width="200" height="126" rx="12" fill="var(--paper)" />
        <rect x="284" y="10" width="168" height="24" rx="99" fill="var(--porch-light)" strokeWidth="1.6" />
        <text x="368" y="26" textAnchor="middle" fill="#2A2622" stroke="none" fontSize="12.5" fontWeight="700" style={{ fontFamily: 'var(--font-sans)' }}>
          Paid only at closing
        </text>
        <text x="368" y="76" textAnchor="middle" fill="var(--ink)" stroke="none" fontSize="18" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
          Front Porch broker
        </text>
        <text x="368" y="104" textAnchor="middle" fill="var(--muted)" stroke="none" fontSize="13.5" style={{ fontFamily: 'var(--font-sans)' }}>
          No charge for porch chats
        </text>
        <text x="368" y="124" textAnchor="middle" fill="var(--muted)" stroke="none" fontSize="13.5" style={{ fontFamily: 'var(--font-sans)' }}>
          or comparing scenarios
        </text>

        {/* Arrow 2 */}
        <path d="M476 87 H520" strokeWidth="2.6" />
        <path d="M510 79 L522 87 L510 95" strokeWidth="2.6" />

        {/* Box 3: Loan Estimate */}
        <rect x="528" y="34" width="178" height="106" rx="12" fill="var(--paper)" />
        <text x="617" y="74" textAnchor="middle" fill="var(--ink)" stroke="none" fontSize="18" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
          Loan Estimate
        </text>
        <text x="617" y="100" textAnchor="middle" fill="var(--muted)" stroke="none" fontSize="13.5" style={{ fontFamily: 'var(--font-sans)' }}>
          Disclosed in writing
        </text>
        <text x="617" y="119" textAnchor="middle" fill="var(--muted)" stroke="none" fontSize="13.5" style={{ fontFamily: 'var(--font-sans)' }}>
          before you commit
        </text>
      </g>
    </svg>
  );
}

/** 404 illustration: porch steps with one tread missing and a hanging "Mind the gap" sign. */
export function MissingStepArt({ className = 'w-full h-auto' }: { className?: string }) {
  const grainId = useId();
  return (
    <svg
      viewBox="0 0 820 310"
      className={className}
      role="img"
      aria-label="Illustration of wooden porch steps with one missing tread and a hand-painted Mind the gap sign hanging from the handrail"
    >
      <defs>
        <filter id={grainId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="17" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.055 0" in="noise" />
        </filter>
      </defs>
      <rect x="0" y="0" width="820" height="310" rx="14" fill="var(--haint)" fillOpacity="0.4" />
      <g {...sharedStroke}>
        {/* Ground */}
        <path d="M30 278 H790" strokeWidth="2.4" />

        {/* Porch deck & red door on right */}
        <rect x="640" y="52" width="128" height="226" fill="var(--paper)" />
        <rect x="668" y="76" width="72" height="148" fill="var(--primary)" />
        <circle cx="728" cy="154" r="3.5" fill="var(--porch-light)" />
        <rect x="630" y="224" width="146" height="16" fill="var(--floor)" />

        {/* Sloped white handrail & posts */}
        <path d="M138 190 L632 102" stroke="var(--trim)" strokeWidth="10" />
        <path d="M138 185 L632 97 M138 195 L632 107" strokeWidth="1.9" />
        <rect x="132" y="184" width="14" height="94" fill="var(--trim)" />
        <rect x="626" y="96" width="14" height="132" fill="var(--trim)" />
        {/* Balusters along rail */}
        {[184, 236, 288, 340, 492, 544, 594].map((x, i) => {
          const topY = 190 - (x - 138) * 0.178;
          return <path key={i} d={`M${x} ${topY} V254`} strokeWidth="2.2" />;
        })}

        {/* Steps 1 & 2 */}
        <rect x="138" y="252" width="106" height="26" fill="var(--floor)" />
        <rect x="244" y="226" width="106" height="52" fill="var(--floor)" />

        {/* Missing Step 3 gap (dashed outline!) */}
        <rect
          x="350"
          y="200"
          width="114"
          height="78"
          fill="var(--paper-2)"
          fillOpacity="0.45"
          strokeDasharray="7 6"
        />

        {/* Steps 4 & 5 */}
        <rect x="464" y="174" width="88" height="104" fill="var(--floor)" />
        <rect x="552" y="148" width="88" height="130" fill="var(--floor)" />

        {/* Hanging "Mind the gap" sign swinging from the rail over the missing tread */}
        <g transform="translate(352, 134) rotate(-4)">
          <path d="M24 -8 V16 M100 -20 V16" strokeWidth="1.9" />
          <rect x="4" y="16" width="116" height="54" rx="8" fill="var(--porch-light)" />
          <text
            x="62"
            y="42"
            textAnchor="middle"
            fill="#2A2622"
            stroke="none"
            fontSize="21"
            fontWeight="700"
            style={{ fontFamily: 'var(--font-hand)' }}
          >
            Mind the gap!
          </text>
          <text
            x="62"
            y="60"
            textAnchor="middle"
            fill="#2A2622"
            stroke="none"
            fontSize="12"
            fontWeight="700"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            404
          </text>
        </g>
      </g>
      <rect x="0" y="0" width="820" height="310" rx="14" filter={`url(#${grainId})`} pointerEvents="none" />
    </svg>
  );
}

/* Shared small hand-drawn inline icons (2px rounded ink stroke) */
export function PhoneIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <path
        d="M5.5 4.5h3.2l1.6 4-2 1.6a12 12 0 0 0 5.6 5.6l1.6-2 4 1.6v3.2a2 2 0 0 1-2.1 2C10.5 20 4 13.5 3.5 6.6a2 2 0 0 1 2-2.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5.5" width="18" height="13" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </g>
    </svg>
  );
}

export function PinIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s6.5-5.8 6.5-11a6.5 6.5 0 1 0-13 0c0 5.2 6.5 11 6.5 11Z" />
        <circle cx="12" cy="10" r="2.4" />
      </g>
    </svg>
  );
}

export function ClockIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3.2 2" />
      </g>
    </svg>
  );
}

export function DocumentIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 3.5h8l4 4v13h-12z" />
        <path d="M14.5 3.5v4h4M9.5 12h5M9.5 15.5h5" />
      </g>
    </svg>
  );
}

export function ShieldIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6L12 3Z" />
        <path d="m9.2 12 2 2 3.8-4" />
      </g>
    </svg>
  );
}

export function CheckIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <path
        d="m5 12.5 4.2 4.2L19 7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StepsIcon({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <g {...sharedStroke}>
        <path d="M6 36h10v-8h10v-8h12v16H6Z" fill="var(--floor)" />
        <path d="M6 26 L36 10" strokeWidth="2.4" />
      </g>
    </svg>
  );
}

export function KeyIcon({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <g {...sharedStroke}>
        <circle cx="15" cy="22" r="8" fill="var(--porch-light)" />
        <circle cx="15" cy="22" r="2.6" fill="var(--paper)" />
        <path d="M23 22h15M33 22v6M38 22v4.5" strokeWidth="2.5" />
      </g>
    </svg>
  );
}
