import { useId } from 'react';

/**
 * Three-quarter view of Front Porch Home Loans' Carolina front porch.
 * Recolours automatically in dark mode to dusk: deep teal-navy sky, warm lit windows,
 * glowing brass porch lantern and drifting amber fireflies (respecting reduced motion).
 */
export function PorchScene({
  className = 'w-full h-auto',
  bare = false,
}: {
  className?: string;
  /** Drop the framed sky, lawn and grain so the porch can stand inside a larger scene. */
  bare?: boolean;
}) {
  const uid = useId();
  const grainId = `porch-grain-${uid}`;
  const lanternGlowId = `porch-lantern-glow-${uid}`;
  const doorGlowId = `porch-door-glow-${uid}`;

  return (
    <svg
      viewBox="0 0 760 540"
      className={`block select-none ${className}`}
      role="img"
      aria-label="Illustration of a Carolina front porch with a haint-blue ceiling, white columns and baluster railing, brick-red screen door ajar, two rocking chairs with sweet tea, a hanging fern, mailbox 318 and a lit brass porch lantern"
    >
      <defs>
        <filter id={grainId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="11" result="noise" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.065 0"
            in="noise"
            result="grain"
          />
        </filter>
        <radialGradient id={lanternGlowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--porch-light)" stopOpacity="0.95" />
          <stop offset="48%" stopColor="var(--porch-light)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--porch-light)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={doorGlowId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--porch-light)" stopOpacity="0.78" />
          <stop offset="100%" stopColor="var(--porch-light)" stopOpacity="0.16" />
        </linearGradient>
      </defs>

      {/* Sky & evening dusk backdrop */}
      {!bare && <rect x="0" y="0" width="760" height="540" rx="14" fill="var(--sky)" />}

      {/* Dusk stars (visible only in dark mode via --firefly-opacity) */}
      {!bare && <g className="porch-fireflies" aria-hidden="true" fill="var(--porch-light)">
        <circle cx="58" cy="48" r="1.5" opacity="0.65" />
        <circle cx="118" cy="30" r="1.2" opacity="0.5" />
        <circle cx="678" cy="42" r="1.6" opacity="0.7" />
        <circle cx="722" cy="78" r="1.3" opacity="0.55" />
        <circle cx="695" cy="122" r="1.2" opacity="0.45" />
      </g>}

      {/* Soft distant Durham lawn & tree canopy behind eaves */}
      {!bare && (
        <>
          <path
            d="M0 398 Q140 368 290 388 T760 374 L760 540 L0 540 Z"
            fill="var(--leaf)"
            fillOpacity="0.22"
          />
          <path
            d="M578 135 C612 96 686 98 726 142 C748 166 756 205 745 256 L585 256 Z"
            fill="var(--leaf)"
            fillOpacity="0.28"
          />
        </>
      )}

      {/* Main clapboard house back wall */}
      <g stroke="var(--ink)" strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="92" y="106" width="538" height="290" fill="var(--paper)" />
        {/* Hand-drawn horizontal clapboard siding seams */}
        <g strokeOpacity="0.18" strokeWidth="1.3">
          <path d="M92 132h538M92 158h538M92 184h538M92 210h538M92 236h538M92 262h538M92 288h538M92 314h538M92 340h538M92 366h538" />
        </g>

        {/* Left sash window */}
        <g>
          <rect x="136" y="176" width="96" height="128" rx="2" fill="var(--trim)" />
          <rect x="145" y="185" width="78" height="110" fill="var(--window-pane)" />
          {/* Warm interior glow in dark mode */}
          <rect
            x="145"
            y="185"
            width="78"
            height="110"
            fill="var(--porch-light)"
            className="porch-window-glow"
            stroke="none"
          />
          <path d="M145 240h78M184 185v110" strokeWidth="2.2" />
          {/* Window sill */}
          <rect x="130" y="302" width="108" height="9" rx="2" fill="var(--trim)" />
        </g>

        {/* Right sash window */}
        <g>
          <rect x="498" y="176" width="94" height="128" rx="2" fill="var(--trim)" />
          <rect x="507" y="185" width="76" height="110" fill="var(--window-pane)" />
          <rect
            x="507"
            y="185"
            width="76"
            height="110"
            fill="var(--porch-light)"
            className="porch-window-glow"
            stroke="none"
          />
          <path d="M507 240h76M545 185v110" strokeWidth="2.2" />
          <rect x="492" y="302" width="106" height="9" rx="2" fill="var(--trim)" />
        </g>

        {/* Front door casing + warm interior slit + ajar brick-red screen door */}
        <g>
          {/* Door trim frame */}
          <rect x="308" y="138" width="118" height="256" fill="var(--trim)" />
          {/* Transom window with house number "318" */}
          <rect x="318" y="148" width="98" height="28" fill="var(--window-pane)" />
          <rect
            x="318"
            y="148"
            width="98"
            height="28"
            fill="var(--porch-light)"
            className="porch-window-glow"
            stroke="none"
          />
          <text
            x="367"
            y="168"
            textAnchor="middle"
            fill="var(--ink)"
            stroke="none"
            fontSize="16"
            fontWeight="700"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            318
          </text>

          {/* Warm ajar opening behind screen door */}
          <rect x="320" y="184" width="94" height="208" fill={`url(#${doorGlowId})`} />

          {/* Brick-red screen door swung slightly ajar towards the porch */}
          <path d="M320 184 L398 193 L398 386 L320 392 Z" fill="var(--primary)" />
          {/* Upper screen panel */}
          <path d="M332 198 L386 204 L386 286 L332 288 Z" fill="var(--paper)" fillOpacity="0.24" />
          <path
            d="M359 201v86M332 243l54 2"
            stroke="var(--trim)"
            strokeOpacity="0.72"
            strokeWidth="1.5"
          />
          {/* Lower kick panel */}
          <path d="M332 300 L386 298 L386 368 L332 372 Z" fill="var(--primary-hover)" />
          {/* Brass door handle */}
          <circle cx="389" cy="296" r="4" fill="var(--porch-light)" />
        </g>

        {/* Porch floor (painted green-grey planks in perspective) */}
        <polygon points="36,392 678,392 738,488 0,488" fill="var(--floor)" />
        <g stroke="var(--trim)" strokeOpacity="0.26" strokeWidth="1.3">
          <path d="M22 414h672M12 438h698M4 462h722" />
          <path d="M168 392l-26 96M294 392l-12 96M420 392l12 96M546 392l28 96" strokeOpacity="0.16" />
        </g>

        {/* Front wooden porch steps descending right-of-center */}
        <g>
          <polygon points="274,488 460,488 468,505 266,505" fill="var(--floor)" />
          <polygon points="266,505 468,505 468,518 266,518" fill="var(--paper-2)" />
          <polygon points="258,518 476,518 484,536 250,536" fill="var(--floor)" />
        </g>

        {/* Two rocking chairs facing each other with small side table & sweet tea */}
        {/* Left rocking chair */}
        <g transform="translate(154, 294)">
          <path d="M2 100 Q34 114 70 98" fill="none" strokeWidth="2.6" />
          <path d="M14 28 L8 72 L56 72 L58 58 L18 58" fill="var(--trim)" />
          <path d="M12 10 L18 58 M24 10 L26 58 M35 12 L34 58" strokeWidth="2" />
          <path d="M6 10 Q24 2 42 12 L42 20 Q24 12 6 20 Z" fill="var(--trim)" />
          <path d="M16 42 L58 42" strokeWidth="3.2" />
          <path d="M16 72 L12 101 M50 72 L56 100" strokeWidth="2.4" />
          {/* Plaid seat cushion */}
          <rect x="14" y="56" width="44" height="10" rx="4" fill="var(--primary)" fillOpacity="0.88" />
        </g>

        {/* Small round porch table & two iced sweet tea glasses */}
        <g transform="translate(228, 336)">
          <ellipse cx="26" cy="14" rx="26" ry="7" fill="var(--trim)" />
          <path d="M14 20 L10 62 M38 20 L42 62 M13 44 L39 44" strokeWidth="2.2" />
          {/* Tea glass 1 */}
          <path d="M12 -4 L22 -4 L20 12 L14 12 Z" fill="var(--brass)" />
          <path d="M18 -10 L16 6" strokeWidth="1.5" />
          <circle cx="22" cy="-3" r="3" fill="var(--porch-light)" />
          {/* Tea glass 2 */}
          <path d="M31 -3 L41 -3 L39 12 L33 12 Z" fill="var(--brass)" />
          <path d="M37 -9 L35 6" strokeWidth="1.5" />
        </g>

        {/* Right rocking chair */}
        <g transform="translate(476, 294)">
          <path d="M0 98 Q36 114 68 100" fill="none" strokeWidth="2.6" />
          <path d="M56 28 L62 72 L14 72 L12 58 L52 58" fill="var(--trim)" />
          <path d="M58 10 L52 58 M46 10 L44 58 M35 12 L36 58" strokeWidth="2" />
          <path d="M28 12 Q46 2 64 10 L64 20 Q46 12 28 20 Z" fill="var(--trim)" />
          <path d="M54 42 L12 42" strokeWidth="3.2" />
          <path d="M54 72 L58 101 M20 72 L14 100" strokeWidth="2.4" />
          <rect x="12" y="56" width="44" height="10" rx="4" fill="var(--haint)" />
        </g>

        {/* Turned-baluster railings flanking the front steps */}
        {/* Left railing section */}
        <g>
          <rect x="86" y="346" width="188" height="10" rx="3" fill="var(--trim)" />
          <rect x="86" y="424" width="188" height="8" rx="2" fill="var(--trim)" />
          {[104, 128, 152, 176, 200, 224, 248].map(x => (
            <g key={x}>
              <path
                d={`M${x} 356v68`}
                stroke="var(--trim)"
                strokeWidth="7"
              />
              <path
                d={`M${x - 3.5} 356v68M${x + 3.5} 356v68`}
                strokeWidth="1.5"
              />
              <circle cx={x} cy="388" r="4.5" fill="var(--trim)" strokeWidth="1.5" />
            </g>
          ))}
        </g>

        {/* Right railing section */}
        <g>
          <rect x="462" y="346" width="188" height="10" rx="3" fill="var(--trim)" />
          <rect x="462" y="424" width="188" height="8" rx="2" fill="var(--trim)" />
          {[482, 506, 530, 554, 578, 602, 626].map(x => (
            <g key={x}>
              <path
                d={`M${x} 356v68`}
                stroke="var(--trim)"
                strokeWidth="7"
              />
              <path
                d={`M${x - 3.5} 356v68M${x + 3.5} 356v68`}
                strokeWidth="1.5"
              />
              <circle cx={x} cy="388" r="4.5" fill="var(--trim)" strokeWidth="1.5" />
            </g>
          ))}
        </g>

        {/* Two white porch columns framing the entry */}
        {[
          { x: 64, w: 30 },
          { x: 262, w: 26 },
          { x: 448, w: 26 },
          { x: 638, w: 30 },
        ].map((col, idx) => (
          <g key={idx}>
            <rect x={col.x} y="92" width={col.w} height="346" fill="var(--trim)" />
            <rect x={col.x - 6} y="88" width={col.w + 12} height="14" rx="2" fill="var(--trim)" />
            <rect x={col.x - 5} y="428" width={col.w + 10} height="18" rx="2" fill="var(--trim)" />
            <path
              d={`M${col.x + col.w * 0.35} 106v318M${col.x + col.w * 0.65} 106v318`}
              strokeOpacity="0.18"
              strokeWidth="1.2"
            />
          </g>
        ))}

        {/* Haint-blue tongue-and-groove porch ceiling (perspective trapezoid) */}
        <polygon points="24,52 710,52 648,108 86,108" fill="var(--haint)" />
        {/* Tongue-and-groove ceiling seams */}
        <g strokeOpacity="0.22" strokeWidth="1.3">
          <path d="M128 52 L160 108M218 52 L240 108M308 52 L320 108M398 52 L400 108M488 52 L480 108M578 52 L560 108" />
        </g>

        {/* White porch eaves & roof fascia */}
        <polygon points="8,16 742,16 720,54 24,54" fill="var(--trim)" />
        <path d="M8 34h724" strokeOpacity="0.22" strokeWidth="1.5" />
        <polygon points="0,0 760,0 742,18 8,18" fill="var(--floor)" />

        {/* Hanging Boston fern on left-front hook */}
        <g transform="translate(152, 84)">
          <path d="M0 0v32M0 32l-18 28M0 32l18 28" strokeWidth="1.6" />
          <path d="M-24 60h48l-6 22h-36z" fill="var(--brass)" />
          <g fill="var(--leaf)" strokeWidth="1.7">
            <path d="M-10 58 C-42 36 -58 58 -46 82 C-34 68 -18 68 -6 66 Z" />
            <path d="M10 58 C42 36 58 58 46 82 C34 68 18 68 6 66 Z" />
            <path d="M-16 64 C-46 72 -52 100 -34 114 C-24 96 -14 82 -4 72 Z" />
            <path d="M16 64 C46 72 52 100 34 114 C24 96 14 82 4 72 Z" />
            <path d="M0 54 C-14 26 14 26 0 54 Z" />
            <path d="M0 64 C-16 86 -10 112 0 124 C10 112 16 86 0 64 Z" />
          </g>
        </g>

        {/* Hanging brass porch lantern near top right/doorway with warm radial glow */}
        <g className="lantern-lit" transform="translate(544, 62)">
          <circle className="lantern-halo" cx="30" cy="64" r="78" fill={`url(#${lanternGlowId})`} stroke="none" />
          <path d="M30 -10v28" strokeWidth="2.2" />
          <circle cx="30" cy="22" r="4" fill="var(--brass)" />
          <path d="M12 36 30 24 48 36z" fill="var(--brass)" />
          <path d="M16 36h28l-4 38H20z" fill="var(--porch-light)" />
          <path d="M30 44v13" stroke="#FFFFFF" strokeWidth="2.6" />
          <circle cx="30" cy="58" r="4.2" fill="#FFFDF5" stroke="none" />
          <path d="M30 36v38" strokeOpacity="0.5" strokeWidth="1.6" />
          <path d="M19 74h22l3 8H16z" fill="var(--brass)" />
          <path d="M26 82h8l-4 7z" fill="var(--brass)" />
        </g>

        {/* Foreground rural mailbox on wooden post reading "318" */}
        <g transform="translate(596, 366)">
          {/* Post */}
          <rect x="44" y="64" width="16" height="106" fill="var(--trim)" />
          <path d="M30 84 L44 66" strokeWidth="3.5" />
          {/* Mailbox body */}
          <path d="M16 34 C16 14 38 14 48 14 L98 14 C114 14 120 26 120 40 L120 66 L16 66 Z" fill="var(--floor)" />
          {/* Rounded front door */}
          <path d="M16 34 C16 14 46 14 46 34 L46 66 L16 66 Z" fill="var(--paper-2)" />
          {/* Raised red flag positioned cleanly left of house numbers */}
          <path d="M55 38 V8 H74 V21 H60 V38 Z" fill="var(--primary)" />
          <circle cx="57" cy="38" r="3" fill="var(--brass)" />
          {/* Hand-painted house number 318 */}
          <text
            x="90"
            y="53"
            textAnchor="middle"
            fill="var(--trim)"
            stroke="none"
            fontSize="18"
            fontWeight="700"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            318
          </text>
        </g>
      </g>

      {/* Drifting amber fireflies (dark mode only, disabled under reduced motion) */}
      <g className="porch-fireflies" aria-hidden="true">
        <g className="porch-firefly-a">
          <circle cx="102" cy="436" r="7" fill="var(--porch-light)" opacity="0.24" />
          <circle cx="102" cy="436" r="2.6" fill="var(--porch-light)" />
        </g>
        <g className="porch-firefly-b">
          <circle cx="236" cy="248" r="8" fill="var(--porch-light)" opacity="0.22" />
          <circle cx="236" cy="248" r="2.8" fill="var(--porch-light)" />
        </g>
        <g className="porch-firefly-c">
          <circle cx="678" cy="296" r="7.5" fill="var(--porch-light)" opacity="0.25" />
          <circle cx="678" cy="296" r="2.5" fill="var(--porch-light)" />
        </g>
        <g className="porch-firefly-a">
          <circle cx="486" cy="472" r="6.5" fill="var(--porch-light)" opacity="0.24" />
          <circle cx="486" cy="472" r="2.3" fill="var(--porch-light)" />
        </g>
        <g className="porch-firefly-b">
          <circle cx="708" cy="412" r="7" fill="var(--porch-light)" opacity="0.22" />
          <circle cx="708" cy="412" r="2.5" fill="var(--porch-light)" />
        </g>
      </g>

      {/* Subtle ~6% paper-grain overlay */}
      {!bare && (
        <rect x="0" y="0" width="760" height="540" rx="14" filter={`url(#${grainId})`} pointerEvents="none" />
      )}
    </svg>
  );
}
