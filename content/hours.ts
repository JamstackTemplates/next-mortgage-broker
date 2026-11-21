import type { OpeningHours } from '../lib/hours.ts';

/**
 * Office hours for Front Porch Home Loans (America/New_York).
 * Same-day intervals only; overnight hours are unsupported.
 */
export const officeHours: readonly OpeningHours[] = [
  { day: 'Monday', opens: '09:00', closes: '17:30' },
  { day: 'Tuesday', opens: '09:00', closes: '17:30' },
  { day: 'Wednesday', opens: '09:00', closes: '17:30' },
  { day: 'Thursday', opens: '09:00', closes: '17:30' },
  { day: 'Friday', opens: '09:00', closes: '17:30' },
  { day: 'Saturday', opens: '10:00', closes: '13:00' },
  { day: 'Sunday' },
];
