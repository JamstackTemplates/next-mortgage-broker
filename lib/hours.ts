/** Weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];

export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}

export interface PorchLightStatus {
  /** true when open, false when closed, null when static/neutral or zone unavailable. */
  isOpen: boolean | null;
  /** Human-readable status text shown beside the porch lantern. */
  label: string;
  /** Current local weekday in the business time zone, or null when unavailable. */
  today: Day | null;
}

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

export const STATIC_HOURS_SUMMARY = 'Office hours Mon–Fri 9–5:30, Sat 10–1';

/** Format 24-hour HH:MM as friendly 12-hour US clock time (e.g. "17:30" -> "5:30 pm"). */
export function formatClock12(value: string): string {
  const [hStr, mStr] = value.split(':');
  const h = Number(hStr);
  const period = h >= 12 ? 'pm' : 'am';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${mStr} ${period}`;
}

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

function resolveNowParts(timeZone: string, now: Date): { index: number; current: number } | null {
  if (!timeZone) return null;
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return null;
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return null;
  return { index, current: Number(part('hour')) * 60 + Number(part('minute')) };
}

/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const fallback = 'See opening hours';
  if (!timeZone) return fallback;
  validateHours(hours);
  const resolved = resolveNowParts(timeZone, now);
  if (!resolved) return fallback;
  const { index, current } = resolved;
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return `Open now · until ${today.closes}`;
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      return `Closed · opens ${offset === 0 ? 'today' : day} at ${entry.opens}`;
    }
  }
  return 'Closed · see opening hours';
}

/** Porch-light branded open status used by OpenBadge in the browser. */
export function porchLightStatus(hours: readonly OpeningHours[], timeZone: string, now = new Date()): PorchLightStatus {
  if (!timeZone) return { isOpen: null, label: STATIC_HOURS_SUMMARY, today: null };
  validateHours(hours);
  const resolved = resolveNowParts(timeZone, now);
  if (!resolved) return { isOpen: null, label: STATIC_HOURS_SUMMARY, today: null };
  const { index, current } = resolved;
  const todayDay = DAYS[index];
  const today = hours.find(entry => entry.day === todayDay)!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return {
      isOpen: true,
      label: `Porch light’s on — we’re in until ${formatClock12(today.closes)}`,
      today: todayDay,
    };
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      return {
        isOpen: false,
        label: `Back ${offset === 0 ? 'today' : day} at ${formatClock12(entry.opens)}`,
        today: todayDay,
      };
    }
  }
  return { isOpen: false, label: STATIC_HOURS_SUMMARY, today: todayDay };
}
