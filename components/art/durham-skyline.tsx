/**
 * Durham horizon behind the porch: brick tobacco warehouses with arched windows, a brick
 * smokestack and a campus water tower, framed by Piedmont oaks. Flat, unoutlined shapes so it
 * reads as distance behind the outlined porch art. No lettering or trademarks are drawn.
 *
 * `tone="scene"` uses the atmospheric skyline tokens (windows glow at dusk in dark mode).
 * `tone="silhouette"` fills everything with one colour (e.g. the footer's floor colour).
 */

type Tone = 'scene' | 'silhouette';

const W = 1440;
const GROUND = 220;

/** Rows of small arched warehouse windows. */
function windowRow(x0: number, x1: number, y: number, h = 14, gap = 22): string {
  let d = '';
  for (let x = x0; x + 9 <= x1; x += gap) {
    d += `M${x} ${y + h}v-${h - 4.5}a4.5 4.5 0 0 1 9 0v${h - 4.5}z`;
  }
  return d;
}

const warehouses = [
  // [x, width, roofY, kind]
  { x: 96, w: 230, y: 176, kind: 'flat' as const, rows: [188] },
  { x: 340, w: 250, y: 142, kind: 'stepped' as const, rows: [156, 182] },
  { x: 742, w: 300, y: 150, kind: 'saw' as const, rows: [166, 190] },
  { x: 1056, w: 210, y: 170, kind: 'flat' as const, rows: [184] },
  { x: 1280, w: 160, y: 184, kind: 'flat' as const, rows: [196] },
];

function warehousePath(b: (typeof warehouses)[number]): string {
  const { x, w, y, kind } = b;
  if (kind === 'stepped') {
    // Parapet with a raised centre gable, typical of the old tobacco warehouses
    return `M${x} ${GROUND}V${y + 8}h${w / 2 - 46}V${y}l18 -12h56l18 12V${y + 8}H${x + w}V${GROUND}z`;
  }
  if (kind === 'saw') {
    let d = `M${x} ${GROUND}V${y}`;
    const teeth = 6;
    const tw = w / teeth;
    for (let i = 0; i < teeth; i++) {
      d += `l${tw * 0.72} -16v16h${tw * 0.28}`;
    }
    return `${d}V${GROUND}z`;
  }
  return `M${x} ${GROUND}V${y}h${w}V${GROUND}z`;
}

export function DurhamSkyline({
  className = 'block w-full h-auto',
  tone = 'scene',
  preserveAspectRatio = 'xMidYMax meet',
}: {
  className?: string;
  tone?: Tone;
  preserveAspectRatio?: string;
}) {
  const sil = tone === 'silhouette';
  const far = sil ? 'currentColor' : 'var(--skyline-far)';
  const brick = sil ? 'currentColor' : 'var(--skyline-brick)';
  const brickDeep = sil ? 'currentColor' : 'var(--skyline-brick-deep)';
  const tower = sil ? 'currentColor' : 'var(--skyline-tower)';

  return (
    <svg
      viewBox={`0 0 ${W} ${GROUND}`}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Distant Piedmont tree line */}
      <path
        fill={far}
        d={`M0 ${GROUND}V170c30-18 58-20 84-6c22-22 60-24 86-4c26-14 52-12 70 4c34-26 82-24 104 0
          c40-20 80-16 104 6c26-12 54-10 70 6c30-20 70-22 96 0c34-24 84-22 110 4c30-14 60-12 84 6
          c28-22 76-22 98 2c30-18 64-16 86 2c26-20 68-22 92 0c24-12 52-10 70 6c28-18 70-20 96 2
          c22-10 46-8 60 6c24-14 56-14 76 2V${GROUND}z`}
      />

      <g transform="translate(36 0)">
      {/* Brick smokestack */}
      <path fill={brickDeep} d={`M612 ${GROUND}L620 34h22l8 ${GROUND - 34}z`} />
      <path fill={brick} d="M616 34h30v10h-30zM618 70h26v5h-26zM620 112h22v4h-22z" />

      {/* Campus water tower */}
      <g fill={tower}>
        <path
          d={`M668 ${GROUND}l12 -118h4l-10 118zM734 ${GROUND}l-12 -118h-4l10 118z
            M692 ${GROUND}l3 -118h3v118zM710 ${GROUND}l-3 -118h-3v118z`}
        />
        <path d="M673 160l60 -32v4l-60 32zM673 128l60 32v4l-60 -32z" opacity="0.8" />
        <rect x="664" y="54" width="74" height="50" rx="4" />
        <path d="M660 56l41 -30l41 30z" />
        <rect x="699" y="16" width="4" height="12" />
        <rect x="656" y="100" width="90" height="5" rx="2" />
      </g>
      {!sil && (
        <path d="M664 66h74M664 92h74" stroke="var(--skyline-brick-deep)" strokeOpacity="0.35" strokeWidth="2" />
      )}
      </g>

      {/* Warehouses */}
      {warehouses.map(b => (
        <path key={b.x} fill={b.kind === 'saw' ? brickDeep : brick} d={warehousePath(b)} />
      ))}

      {/* Short second chimney behind the low east warehouse */}
      <path fill={brickDeep} d={`M1196 170l4 -70h14l4 70z`} />

      {/* Oaks in front of the warehouses */}
      <g fill={far}>
        <path d={`M300 ${GROUND}c-30 0-40-34-20-50c-6-24 24-40 42-26c18-14 48 0 42 24c22 14 14 52-20 52z`} />
        <path d={`M1020 ${GROUND}c-26 0-36-28-18-42c-4-22 22-34 38-22c16-12 42 0 36 20c20 12 12 44-18 44z`} />
        <path d={`M30 ${GROUND}c-22 0-30-24-14-36c-4-18 18-28 30-18c14-10 34 0 30 18c16 10 10 36-14 36z`} />
      </g>

      {/* Windows: darker brick by day, some lit by porch-light at dusk */}
      {!sil && (
        <g>
          {warehouses.map(b =>
            b.rows.map(y => (
              <g key={`${b.x}-${y}`}>
                <path fill="var(--skyline-window)" d={windowRow(b.x + 14, b.x + b.w - 14, y)} />
                <path
                  fill="var(--porch-light)"
                  style={{ opacity: 'var(--skyline-window-glow)' }}
                  d={windowRow(b.x + 14 + ((b.x / 2) % 3) * 22, b.x + b.w - 14, y, 14, 66)}
                />
              </g>
            )),
          )}
        </g>
      )}
    </svg>
  );
}
