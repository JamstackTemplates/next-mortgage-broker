import type { ReactNode } from 'react';
import { useId } from 'react';

/**
 * Repeating turned-baluster railing section divider.
 * Replaces plain horizontal rules throughout the site.
 */
export function BalusterRail({ className = '' }: { className?: string }) {
  const patternId = useId();
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 44"
        preserveAspectRatio="none"
        className="block h-10 w-full"
        focusable="false"
      >
        <defs>
          <pattern id={patternId} width="30" height="44" patternUnits="userSpaceOnUse">
            <rect
              x="12"
              y="9"
              width="6"
              height="26"
              fill="var(--trim)"
              stroke="var(--ink)"
              strokeOpacity="0.55"
              strokeWidth="1.4"
            />
            <ellipse
              cx="15"
              cy="22"
              rx="4.6"
              ry="4.2"
              fill="var(--trim)"
              stroke="var(--ink)"
              strokeOpacity="0.6"
              strokeWidth="1.4"
            />
          </pattern>
        </defs>

        {/* Turned balusters */}
        <rect x="0" y="0" width="1200" height="44" fill={`url(#${patternId})`} />

        {/* Top handrail */}
        <rect
          x="0"
          y="3"
          width="1200"
          height="7"
          fill="var(--trim)"
          stroke="var(--ink)"
          strokeOpacity="0.7"
          strokeWidth="1.6"
        />

        {/* Bottom rail */}
        <rect
          x="0"
          y="34"
          width="1200"
          height="6.5"
          fill="var(--trim)"
          stroke="var(--ink)"
          strokeOpacity="0.7"
          strokeWidth="1.6"
        />
      </svg>
    </div>
  );
}

/**
 * Full-bleed painted porch floorboard band with plank seams and subtle nail dots.
 */
export function FloorboardBand({
  children,
  className = '',
  id,
  ariaLabelledby,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`floor-planks relative border-y-2 border-ink/25 ${className}`}
    >
      {children}
    </section>
  );
}
