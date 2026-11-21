import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  amortizationByYear,
  clampAmount,
  clampRate,
  clampTerm,
  estimatorLimits,
  formatDollarsCents,
  monthlyPayment,
  totalInterestPaid,
  workedExample,
} from '../content/repayments.ts';

test('monthlyPayment matches the worked example for 30-year and 15-year terms', () => {
  const payment30 = monthlyPayment(workedExample.principal, workedExample.annualRatePercent, 30);
  const payment15 = monthlyPayment(workedExample.principal, workedExample.annualRatePercent, 15);

  assert.equal(formatDollarsCents(payment30), '$2,022.62');
  assert.equal(formatDollarsCents(payment15), '$2,787.54');

  const interest30 = totalInterestPaid(workedExample.principal, workedExample.annualRatePercent, 30);
  const interest15 = totalInterestPaid(workedExample.principal, workedExample.annualRatePercent, 15);
  assert.ok(Math.abs(Math.round(interest30) - 408_142) <= 2, `Expected ~$408,142, got ${interest30}`);
  assert.ok(Math.abs(Math.round(interest15) - 181_758) <= 2, `Expected ~$181,758, got ${interest15}`);
});

test('monthlyPayment handles 0% interest cleanly without NaN', () => {
  const zeroRate = monthlyPayment(240_000, 0, 20);
  assert.equal(zeroRate, 1_000);
  assert.equal(totalInterestPaid(240_000, 0, 20), 0);

  const schedule = amortizationByYear(240_000, 0, 20);
  assert.equal(schedule.length, 20);
  assert.equal(schedule[0].interest, 0);
  assert.equal(Math.round(schedule[0].principal), 12_000);
  assert.equal(Math.round(schedule[schedule.length - 1].endingBalance), 0);
});

test('amortizationByYear matches year-one split and sums principal to the loan amount', () => {
  const schedule = amortizationByYear(workedExample.principal, workedExample.annualRatePercent, 30);
  assert.equal(schedule.length, 30);

  // Expected first-year interest about $20,695 against $3,577 of principal
  assert.ok(Math.abs(Math.round(schedule[0].interest) - 20_695) <= 2, `Year 1 interest: ${schedule[0].interest}`);
  assert.ok(Math.abs(Math.round(schedule[0].principal) - 3_577) <= 2, `Year 1 principal: ${schedule[0].principal}`);

  const totalPrincipal = schedule.reduce((sum, row) => sum + row.principal, 0);
  assert.ok(
    Math.abs(totalPrincipal - workedExample.principal) < 0.01,
    `Principal total ${totalPrincipal} must sum to loan amount ${workedExample.principal}`,
  );
  assert.equal(schedule[schedule.length - 1].endingBalance, 0);
});

test('estimator clamping guards out-of-range and NaN inputs', () => {
  assert.equal(clampAmount(10_000), estimatorLimits.minAmount);
  assert.equal(clampAmount(5_000_000), estimatorLimits.maxAmount);
  assert.equal(clampAmount(Number.NaN), workedExample.principal);

  assert.equal(clampRate(0.5), estimatorLimits.minRate);
  assert.equal(clampRate(25), estimatorLimits.maxRate);
  assert.equal(clampRate(Number.NaN), workedExample.annualRatePercent);

  assert.equal(clampTerm(15), 15);
  assert.equal(clampTerm(40), workedExample.years);
});
