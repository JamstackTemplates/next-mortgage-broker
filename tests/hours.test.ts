import assert from 'node:assert/strict';
import { test } from 'node:test';
import { officeHours } from '../content/hours.ts';
import {
  DAYS,
  openingLabel,
  porchLightStatus,
  STATIC_HOURS_SUMMARY,
  validateHours,
  type OpeningHours,
} from '../lib/hours.ts';

const sampleHours: OpeningHours[] = DAYS.map(day =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const atSample = (date: string, zone = 'America/New_York') => openingLabel(sampleHours, zone, new Date(date));
const atOffice = (date: string, zone = 'America/New_York') => porchLightStatus(officeHours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(atSample('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(atSample('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(atSample('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(atSample('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('Front Porch weekday boundaries: 08:59 closed, 09:00 open, 17:29 open, 17:30 closed', () => {
  // Tuesday 2026-11-17 is EST (UTC-5)
  const beforeOpen = atOffice('2026-11-17T13:59:00Z'); // 08:59 EST
  assert.equal(beforeOpen.isOpen, false);
  assert.equal(beforeOpen.label, 'Back today at 9:00 am');

  const atOpen = atOffice('2026-11-17T14:00:00Z'); // 09:00 EST
  assert.equal(atOpen.isOpen, true);
  assert.equal(atOpen.label, 'Porch light’s on — we’re in until 5:30 pm');

  const beforeClose = atOffice('2026-11-17T22:29:00Z'); // 17:29 EST
  assert.equal(beforeClose.isOpen, true);
  assert.equal(beforeClose.label, 'Porch light’s on — we’re in until 5:30 pm');

  const atClose = atOffice('2026-11-17T22:30:00Z'); // 17:30 EST
  assert.equal(atClose.isOpen, false);
  assert.equal(atClose.label, 'Back Wednesday at 9:00 am');
});

test('Front Porch Saturday 10:00-13:00 and Sunday closed wrap cleanly to Monday 9:00 am', () => {
  // Saturday 2026-11-21 (EST, UTC-5)
  assert.equal(atOffice('2026-11-21T14:59:00Z').isOpen, false); // 09:59 EST
  assert.equal(atOffice('2026-11-21T14:59:00Z').label, 'Back today at 10:00 am');

  assert.equal(atOffice('2026-11-21T15:00:00Z').isOpen, true); // 10:00 EST
  assert.equal(atOffice('2026-11-21T15:00:00Z').label, 'Porch light’s on — we’re in until 1:00 pm');

  assert.equal(atOffice('2026-11-21T17:59:00Z').isOpen, true); // 12:59 EST

  assert.equal(atOffice('2026-11-21T18:00:00Z').isOpen, false); // 13:00 EST
  assert.equal(atOffice('2026-11-21T18:00:00Z').label, 'Back Monday at 9:00 am');

  // Sunday 2026-11-22 (closed all day)
  assert.equal(atOffice('2026-11-22T16:00:00Z').isOpen, false);
  assert.equal(atOffice('2026-11-22T16:00:00Z').label, 'Back Monday at 9:00 am');
});

test('missing/invalid zones stay neutral and both US DST transitions in America/New_York preserve local times', () => {
  assert.equal(atSample('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(atOffice('2026-11-17T14:00:00Z', '').label, STATIC_HOURS_SUMMARY);
  assert.equal(atOffice('2026-11-17T14:00:00Z', 'Mars/Base').label, STATIC_HOURS_SUMMARY);

  // Spring-forward DST day: Sunday 2026-03-08 (clocks jump 02:00 EST -> 03:00 EDT)
  assert.equal(atSample('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(atOffice('2026-03-08T15:00:00Z').isOpen, false);
  assert.equal(atOffice('2026-03-08T15:00:00Z').label, 'Back Monday at 9:00 am');
  // Monday after spring-forward (EDT = UTC-4): 08:59 EDT = 12:59Z, 09:00 EDT = 13:00Z
  assert.equal(atOffice('2026-03-09T12:59:00Z').isOpen, false);
  assert.equal(atOffice('2026-03-09T13:00:00Z').isOpen, true);

  // Fall-back DST day: Sunday 2026-11-01 (clocks repeat 02:00 EDT -> 01:00 EST)
  assert.equal(atSample('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(atOffice('2026-11-01T16:00:00Z').isOpen, false);
  assert.equal(atOffice('2026-11-01T16:00:00Z').label, 'Back Monday at 9:00 am');
  // Monday after fall-back (EST = UTC-5): 08:59 EST = 13:59Z, 09:00 EST = 14:00Z
  assert.equal(atOffice('2026-11-02T13:59:00Z').isOpen, false);
  assert.equal(atOffice('2026-11-02T14:00:00Z').isOpen, true);
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(officeHours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(sampleHours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
