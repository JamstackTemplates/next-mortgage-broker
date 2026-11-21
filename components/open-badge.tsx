'use client';

import { useEffect, useState } from 'react';
import {
  formatClock12,
  porchLightStatus,
  STATIC_HOURS_SUMMARY,
  type Day,
  type OpeningHours,
  type PorchLightStatus,
} from '../lib/hours';
import { site } from '../lib/site';
import { Lantern } from './art/lantern';

/**
 * Porch-light open status badge.
 * Static/no-JS copy stays neutral ("Office hours Mon–Fri 9–5:30, Sat 10–1").
 * In the browser, computes current status in the configured IANA time zone and refreshes every minute.
 */
export function OpenBadge({
  hours,
  variant = 'chip',
  className = '',
}: {
  hours: readonly OpeningHours[];
  variant?: 'chip' | 'inline' | 'floor';
  className?: string;
}) {
  const [status, setStatus] = useState<PorchLightStatus>({
    isOpen: null,
    label: STATIC_HOURS_SUMMARY,
    today: null,
  });

  useEffect(() => {
    const update = () => setStatus(porchLightStatus(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const lit = status.isOpen !== false;

  if (variant === 'floor') {
    return (
      <span className={`inline-flex items-center gap-2 text-sm font-medium text-floor-ink ${className}`}>
        <Lantern lit={lit} chain={false} className="h-6 w-5 shrink-0" />
        <span>{status.label}</span>
      </span>
    );
  }

  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-2 text-sm font-semibold text-ink ${className}`}>
        <Lantern lit={lit} chain={false} className="h-7 w-6 shrink-0" />
        <span>{status.label}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 border-ink/70 bg-paper px-3 py-1 text-xs font-semibold text-ink shadow-[0_2px_0_rgba(42,38,34,0.12)] ${className}`}
    >
      <Lantern lit={lit} chain={false} className="h-5 w-4 shrink-0" />
      <span className="leading-tight">{status.label}</span>
    </span>
  );
}

/**
 * Office hours table that highlights today's weekday in the browser (using America/New_York).
 * Static/no-JS output renders all seven days cleanly without guessing "today".
 */
export function HoursTable({ hours, className = '' }: { hours: readonly OpeningHours[]; className?: string }) {
  const [today, setToday] = useState<Day | null>(null);

  useEffect(() => {
    const update = () => setToday(porchLightStatus(hours, site.timeZone).today);
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  return (
    <table className={`w-full border-collapse text-sm tabular ${className}`}>
      <caption className="sr-only">Weekly office hours</caption>
      <tbody>
        {hours.map(entry => {
          const isToday = today === entry.day;
          return (
            <tr
              key={entry.day}
              className={`border-b border-line last:border-b-0 ${
                isToday ? 'bg-haint/45 font-bold text-ink' : 'text-ink'
              }`}
            >
              <th scope="row" className="py-1.5 pr-4 pl-2 text-left font-semibold">
                {entry.day}
                {isToday ? (
                  <span className="ml-2 inline-block rounded-full bg-porch-light px-2 py-0.5 text-[0.7rem] font-bold text-[#2A2622]">
                    Today
                  </span>
                ) : null}
              </th>
              <td className="py-1.5 pr-2 text-right text-muted">
                {entry.opens && entry.closes
                  ? `${formatClock12(entry.opens)} – ${formatClock12(entry.closes)}`
                  : 'Closed'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
