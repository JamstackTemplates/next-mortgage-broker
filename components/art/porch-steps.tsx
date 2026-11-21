'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { ProcessStep } from '../../content/process';

type PorchStepsProps = {
  steps: readonly ProcessStep[];
  /** Compact mode on Home shows step numbers, titles, typical time and tags; full mode expands You do / We do. */
  variant?: 'compact' | 'full';
};

/**
 * Signature element: six wooden porch steps rising left-to-right towards the brick-red front door
 * with the brass lantern overhead.
 * - Desktop (md+): drawn six-tread rising diagonal stair with handrail, door & lantern at Step 6.
 * - Mobile (<md): drawn vertical side-profile run of treads rising to the door & lantern at the top.
 * - IntersectionObserver brightens the lantern glow when Step 6 enters view; stays lit under reduced motion or no-JS.
 */
export function PorchSteps({ steps, variant = 'compact' }: PorchStepsProps) {
  const [doorLit, setDoorLit] = useState(true);
  const step6Ref = useRef<HTMLLIElement>(null);
  const grainId = useId();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDoorLit(true);
      return;
    }
    const target = step6Ref.current;
    if (!target || typeof IntersectionObserver === 'undefined') return;

    setDoorLit(false);
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setDoorLit(true);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const isFull = variant === 'full';

  return (
    <div className="relative">
      {/* Desktop (md+): Six-tread diagonal porch stair rising left-to-right to the red screen door */}
      <div className="mb-8 hidden md:block">
        <svg
          viewBox="0 0 1120 360"
          className="block h-auto w-full"
          role="img"
          aria-label="Six wooden porch steps rising from left to right towards the brick-red front door and porch lantern"
        >
          <defs>
            <filter id={grainId} x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="23" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" in="noise" />
            </filter>
            <radialGradient id={`${grainId}-glow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--porch-light)" stopOpacity={doorLit ? '0.95' : '0.28'} />
              <stop offset="55%" stopColor="var(--porch-light)" stopOpacity={doorLit ? '0.34' : '0.06'} />
              <stop offset="100%" stopColor="var(--porch-light)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.85"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Porch wall behind the door at top right */}
            <rect x="920" y="28" width="184" height="316" rx="6" fill="var(--paper)" />
            <path d="M920 62h184M920 96h184M920 130h184M920 164h184M920 198h184" strokeOpacity="0.16" strokeWidth="1.2" />

            {/* Haint eaves above door */}
            <polygon points="894,16 1114,16 1104,42 912,42" fill="var(--haint)" />

            {/* Red screen door at Step 6 */}
            <rect x="964" y="64" width="104" height="170" fill="var(--trim)" />
            <rect x="972" y="72" width="88" height="158" fill="var(--primary)" />
            <rect x="984" y="84" width="64" height="64" fill="var(--paper)" fillOpacity="0.22" />
            <path d="M1016 84v64M984 116h64" stroke="var(--trim)" strokeOpacity="0.65" strokeWidth="1.5" />
            <circle cx="1050" cy="162" r="4" fill="var(--porch-light)" />

            {/* Brass lantern hanging above door — glow expands when Step 6 enters view */}
            <circle
              cx="940"
              cy="80"
              r={doorLit ? 68 : 28}
              fill={`url(#${grainId}-glow)`}
              stroke="none"
              style={{ transition: 'r 0.45s ease' }}
            />
            <path d="M940 42v14" />
            <path d="M928 62 940 54 952 62z" fill="var(--brass)" />
            <path d="M931 62h18l-2 22h-14z" fill={doorLit ? 'var(--porch-light)' : 'var(--paper-2)'} />
            <path d="M933 84h14l2 5h-18z" fill="var(--brass)" />

            {/* Diagonal white balustrade handrail rising high and clear above the step labels */}
            <path d="M44 214 L916 68" stroke="var(--trim)" strokeWidth="10" />
            <path d="M44 209 L916 63 M44 219 L916 73" strokeWidth="1.9" />
            <rect x="34" y="208" width="14" height="136" fill="var(--trim)" />
            <rect x="910" y="64" width="14" height="172" fill="var(--trim)" />

            {/* Six rising wooden porch treads + painted Fraunces numbers & labels */}
            {steps.map((item, idx) => {
              const x = 44 + idx * 145;
              const y = 304 - idx * 24;
              const riserH = 344 - y;
              const railY1 = 214 - ((x + 30 - 44) / (916 - 44)) * (214 - 68);
              const railY2 = 214 - ((x + 114 - 44) / (916 - 44)) * (214 - 68);
              const shortTitle =
                item.step === 5
                  ? 'Underwriting'
                  : item.step === 6
                    ? 'Keys in hand'
                    : item.title;
              const shortTime =
                item.typicalTime === 'when you find the house'
                  ? 'house-hunting'
                  : item.typicalTime;

              return (
                <g key={item.id}>
                  {/* Turned balusters connecting step to sloped handrail */}
                  <path d={`M${x + 30} ${railY1 + 5} V${y}`} strokeWidth="2" strokeOpacity="0.55" />
                  <path d={`M${x + 114} ${railY2 + 5} V${y}`} strokeWidth="2" strokeOpacity="0.55" />

                  {/* Painted step title badge cleanly perched above each tread */}
                  <rect
                    x={x + 8}
                    y={y - 32}
                    width="129"
                    height="24"
                    rx="6"
                    fill="var(--paper)"
                    strokeWidth="1.6"
                  />
                  <text
                    x={x + 72.5}
                    y={y - 16}
                    textAnchor="middle"
                    fill="var(--ink)"
                    stroke="none"
                    fontSize="12.5"
                    fontWeight="700"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {shortTitle}
                  </text>

                  {/* Painted tread lip */}
                  <rect x={x} y={y} width="145" height="11" rx="2" fill="var(--trim)" />
                  {/* Floor-coloured wooden riser */}
                  <rect x={x + 2} y={y + 11} width="141" height={riserH - 11} fill="var(--floor)" />
                  {/* Painted step number on riser */}
                  <text
                    x={x + 18}
                    y={y + 34}
                    fill="var(--porch-light)"
                    stroke="none"
                    fontSize="21"
                    fontWeight="700"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.step}
                  </text>
                  {/* Typical time painted on riser */}
                  <text
                    x={x + 38}
                    y={y + 32}
                    fill="var(--floor-ink)"
                    stroke="none"
                    fontSize="11.5"
                    fontWeight="600"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {shortTime}
                  </text>
                </g>
              );
            })}

            {/* Ground baseline */}
            <path d="M16 344 H1108" strokeWidth="2.4" />
          </g>
          <rect x="0" y="0" width="1120" height="360" filter={`url(#${grainId})`} pointerEvents="none" />
        </svg>
      </div>

      {/* Mobile (<md): Vertical side-profile stair run rising to the red door & lit lantern at the top */}
      <div className="mb-5 md:hidden">
        <svg
          viewBox="0 0 360 156"
          className="block h-auto w-full rounded-xl border-2 border-ink/80 bg-haint/45"
          role="img"
          aria-label="Side profile of six wooden porch steps rising to the red front door and lit brass lantern"
        >
          <g
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.85"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Porch house corner & red door at top right */}
            <rect x="262" y="14" width="84" height="128" rx="4" fill="var(--paper)" />
            <rect x="282" y="28" width="46" height="82" fill="var(--primary)" />
            <circle cx="320" cy="70" r="2.5" fill="var(--porch-light)" />
            {/* Lit brass lantern beside door */}
            <circle
              cx="244"
              cy="42"
              r={doorLit ? 22 : 10}
              fill="var(--porch-light)"
              fillOpacity="0.45"
              stroke="none"
            />
            <path d="M244 16v10" />
            <path d="M236 32 244 26 252 32z" fill="var(--brass)" />
            <path d="M238 32h12l-1.5 16h-9z" fill="var(--porch-light)" />

            {/* Side-profile handrail */}
            <path d="M22 106 L258 48" stroke="var(--trim)" strokeWidth="6" />
            <path d="M22 103 L258 45 M22 109 L258 51" strokeWidth="1.5" />

            {/* Six rising treads seen from the side */}
            {[0, 1, 2, 3, 4, 5].map(idx => {
              const x = 22 + idx * 40;
              const y = 128 - idx * 10;
              return (
                <g key={idx}>
                  <rect x={x} y={y} width="40" height={142 - y} fill="var(--floor)" />
                  <rect x={x - 1} y={y} width="42" height="5" fill="var(--trim)" />
                  <text
                    x={x + 20}
                    y={y - 4}
                    textAnchor="middle"
                    fill="var(--ink)"
                    stroke="none"
                    fontSize="11"
                    fontWeight="700"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {idx + 1}
                  </text>
                </g>
              );
            })}
            <path d="M10 142 H350" strokeWidth="2.2" />
          </g>
        </svg>
      </div>

      {/* Interactive & accessible stair treads list */}
      <ol
        className={
          isFull
            ? 'grid gap-5 md:grid-cols-2 lg:grid-cols-3'
            : 'grid gap-3 md:grid-cols-3 lg:grid-cols-6'
        }
      >
        {steps.map((item, idx) => {
          const isLast = item.step === 6;
          return (
            <li
              key={item.id}
              ref={isLast ? step6Ref : undefined}
              className={`relative flex flex-col rounded-xl border-2 border-ink/80 bg-paper shadow-[0_4px_0_rgba(42,38,34,0.16)] ${
                isLast ? 'ring-2 ring-porch-light/70' : ''
              }`}
            >
              {/* Painted stair tread cap */}
              <div className="flex items-center justify-between gap-2 rounded-t-[0.65rem] border-b-2 border-ink/75 bg-floor px-4 py-2.5 text-floor-ink">
                <span className="font-display text-2xl leading-none font-bold text-porch-light tabular">
                  0{item.step}
                </span>
                <span className="text-xs font-semibold tracking-wide text-floor-muted">
                  {item.typicalTime}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <span className="hand-note text-lg text-primary dark:text-porch-light">
                  {item.brokerTag}
                </span>
                <h3 className="font-display mt-0.5 text-lg leading-snug font-bold text-ink">
                  {item.title}
                </h3>

                {isFull ? (
                  <>
                    <p className="mt-2 text-sm text-muted">{item.summary}</p>
                    <dl className="mt-4 space-y-2.5 border-t border-line pt-3 text-sm">
                      <div>
                        <dt className="font-semibold text-ink">You do</dt>
                        <dd className="mt-0.5 text-muted">{item.youDo}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink">We do</dt>
                        <dd className="mt-0.5 text-muted">{item.weDo}</dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {idx === 5 ? 'Keys in hand at the closing table.' : item.youDo}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
