'use client';

import type { CSSProperties } from 'react';
import { useEffect, useId, useMemo, useState } from 'react';
import {
  amortizationByYear,
  clampAmount,
  clampRate,
  clampTerm,
  estimatorLimits,
  formatDollarsCents,
  formatWholeDollars,
  monthlyPayment,
  REPAYMENT_DISCLAIMER,
  splitPaymentParts,
  totalInterestPaid,
  workedExample,
} from '../content/repayments';

/**
 * Interactive mortgage repayment estimator sitting on a porch floorboard band.
 * - Native <input type="range"> paired with <input type="number"> for loan amount and rate.
 * - Radio group for term (10, 15, 20, 30 years).
 * - Clamps out-of-range input and never shows NaN.
 * - Without JS, hides the interactive sliders and displays the pre-rendered worked-example result.
 */
export function RepaymentEstimator() {
  const [hydrated, setHydrated] = useState(false);
  const [amount, setAmount] = useState<number>(workedExample.principal);
  const [amountText, setAmountText] = useState<string>(String(workedExample.principal));
  const [rate, setRate] = useState<number>(workedExample.annualRatePercent);
  const [rateText, setRateText] = useState<string>(workedExample.annualRatePercent.toFixed(2));
  const [years, setYears] = useState<number>(workedExample.years);

  const uid = useId();
  const amountRangeId = `${uid}-amount-range`;
  const amountNumId = `${uid}-amount-num`;
  const rateRangeId = `${uid}-rate-range`;
  const rateNumId = `${uid}-rate-num`;

  useEffect(() => {
    setHydrated(true);
  }, []);

  const payment = useMemo(() => monthlyPayment(amount, rate, years), [amount, rate, years]);
  const totalInterest = useMemo(() => totalInterestPaid(amount, rate, years), [amount, rate, years]);
  const schedule = useMemo(() => amortizationByYear(amount, rate, years), [amount, rate, years]);
  const parts = splitPaymentParts(payment);
  const year1 = schedule[0];
  const lastYear = schedule[schedule.length - 1];

  function handleAmountSlider(next: number) {
    const clamped = clampAmount(next);
    setAmount(clamped);
    setAmountText(String(clamped));
  }

  function handleAmountInput(raw: string) {
    setAmountText(raw);
    const parsed = Number(raw);
    if (raw.trim() !== '' && Number.isFinite(parsed)) {
      setAmount(clampAmount(parsed));
    }
  }

  function handleAmountBlur() {
    const parsed = Number(amountText);
    const clamped = clampAmount(parsed);
    setAmount(clamped);
    setAmountText(String(clamped));
  }

  function handleRateSlider(next: number) {
    const clamped = clampRate(next);
    setRate(clamped);
    setRateText(clamped.toFixed(3).replace(/0$/, ''));
  }

  function handleRateInput(raw: string) {
    setRateText(raw);
    const parsed = Number(raw);
    if (raw.trim() !== '' && Number.isFinite(parsed)) {
      setRate(clampRate(parsed));
    }
  }

  function handleRateBlur() {
    const parsed = Number(rateText);
    const clamped = clampRate(parsed);
    setRate(clamped);
    setRateText(clamped.toFixed(3).replace(/0$/, ''));
  }

  function handleReset() {
    setAmount(workedExample.principal);
    setAmountText(String(workedExample.principal));
    setRate(workedExample.annualRatePercent);
    setRateText(workedExample.annualRatePercent.toFixed(2));
    setYears(workedExample.years);
  }

  const amountSliderStyle = {
    '--attr-min': estimatorLimits.minAmount,
    '--attr-max': estimatorLimits.maxAmount,
    '--control-value': amount,
  } as CSSProperties;

  const rateSliderStyle = {
    '--attr-min': estimatorLimits.minRate,
    '--attr-max': estimatorLimits.maxRate,
    '--control-value': rate,
  } as CSSProperties;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
      {/* Controls column — shown once JS hydrates so no-JS shows only the static worked result */}
      <div className={`estimator-controls space-y-6 lg:col-span-5 ${hydrated ? 'block' : 'hidden'}`}>
        <div className="rounded-xl border-2 border-floor-ink/25 bg-black/15 p-5">
          {/* Loan amount */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <label htmlFor={amountRangeId} className="text-sm font-bold tracking-wide text-floor-ink uppercase">
                Loan amount
              </label>
              <div className="flex items-center gap-1.5">
                <label htmlFor={amountNumId} className="sr-only">
                  Loan amount in dollars
                </label>
                <span className="text-sm font-bold text-porch-light" aria-hidden="true">
                  $
                </span>
                <input
                  id={amountNumId}
                  type="number"
                  inputMode="numeric"
                  min={estimatorLimits.minAmount}
                  max={estimatorLimits.maxAmount}
                  step={estimatorLimits.amountStep}
                  value={amountText}
                  onChange={e => handleAmountInput(e.target.value)}
                  onBlur={handleAmountBlur}
                  className="tabular w-32 rounded-md border-2 border-floor-ink/40 bg-paper px-2.5 py-1.5 text-right text-base font-bold text-ink"
                />
              </div>
            </div>
            <input
              id={amountRangeId}
              type="range"
              className="porch-range"
              style={amountSliderStyle}
              min={estimatorLimits.minAmount}
              max={estimatorLimits.maxAmount}
              step={estimatorLimits.amountStep}
              value={amount}
              aria-valuetext={formatWholeDollars(amount)}
              onChange={e => handleAmountSlider(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-floor-muted tabular">
              <span>{formatWholeDollars(estimatorLimits.minAmount)}</span>
              <span>{formatWholeDollars(estimatorLimits.maxAmount)}</span>
            </div>
          </div>

          {/* Illustrative interest rate */}
          <div className="mt-6 space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <label htmlFor={rateRangeId} className="text-sm font-bold tracking-wide text-floor-ink uppercase">
                Illustrative rate
              </label>
              <div className="flex items-center gap-1.5">
                <label htmlFor={rateNumId} className="sr-only">
                  Illustrative interest rate percentage
                </label>
                <input
                  id={rateNumId}
                  type="number"
                  inputMode="decimal"
                  min={estimatorLimits.minRate}
                  max={estimatorLimits.maxRate}
                  step={estimatorLimits.rateStep}
                  value={rateText}
                  onChange={e => handleRateInput(e.target.value)}
                  onBlur={handleRateBlur}
                  className="tabular w-24 rounded-md border-2 border-floor-ink/40 bg-paper px-2.5 py-1.5 text-right text-base font-bold text-ink"
                />
                <span className="text-sm font-bold text-porch-light" aria-hidden="true">
                  %
                </span>
              </div>
            </div>
            <input
              id={rateRangeId}
              type="range"
              className="porch-range"
              style={rateSliderStyle}
              min={estimatorLimits.minRate}
              max={estimatorLimits.maxRate}
              step={estimatorLimits.rateStep}
              value={rate}
              aria-valuetext={`${rate.toFixed(2)} percent`}
              onChange={e => handleRateSlider(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-floor-muted tabular">
              <span>{estimatorLimits.minRate.toFixed(2)}%</span>
              <span>{estimatorLimits.maxRate.toFixed(2)}%</span>
            </div>
          </div>

          {/* Loan term radio group */}
          <fieldset className="mt-6">
            <legend className="text-sm font-bold tracking-wide text-floor-ink uppercase">
              Loan term
            </legend>
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              {estimatorLimits.terms.map(termOption => {
                const checked = years === termOption;
                return (
                  <label
                    key={termOption}
                    className={`flex min-h-11 cursor-pointer items-center justify-center rounded-lg border-2 px-2 py-2 text-center text-sm font-bold tabular transition-colors ${
                      checked
                        ? 'border-porch-light bg-porch-light text-[#2A2622]'
                        : 'border-floor-ink/35 bg-transparent text-floor-ink hover:border-floor-ink'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${uid}-term`}
                      value={termOption}
                      checked={checked}
                      onChange={() => setYears(clampTerm(termOption))}
                      className="sr-only"
                    />
                    <span>{termOption} yr</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-floor-ink/20 pt-4">
            <span className="hand-note text-lg text-porch-light">Slide to see how the mix shifts</span>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-md border border-floor-ink/50 px-3 py-1.5 text-xs font-semibold text-floor-ink hover:bg-white/10"
            >
              Reset example
            </button>
          </div>
        </div>
      </div>

      {/* Live Result + Yearly Planks Chart */}
      <div className={hydrated ? 'lg:col-span-7' : 'lg:col-span-12'}>
        <div
          aria-live="polite"
          aria-atomic="true"
          className="rounded-2xl border-2 border-floor-ink/25 bg-black/15 p-6 sm:p-8"
        >
          <p className="text-xs font-bold tracking-[0.14em] text-floor-muted uppercase">
            Estimated monthly principal &amp; interest
          </p>
          <p className="font-display mt-2 flex flex-wrap items-baseline gap-x-1 leading-none font-bold text-floor-ink tabular">
            <span className="text-[clamp(3rem,8vw,5.25rem)] text-porch-light">{parts.dollars}</span>
            <span className="text-[clamp(1.4rem,3vw,2.2rem)]">{parts.cents}</span>
            <span className="ml-2 text-lg font-medium text-floor-muted">a month</span>
          </p>

          <p className="mt-3 text-sm text-floor-muted tabular">
            For <strong className="text-floor-ink">{formatWholeDollars(amount)}</strong> over{' '}
            <strong className="text-floor-ink">{years} years</strong> at an illustrative{' '}
            <strong className="text-floor-ink">{rate.toFixed(rate % 0.25 === 0 ? 2 : 3)}%</strong>.
            Principal &amp; interest only — taxes, homeowners insurance and any mortgage insurance are extra.
          </p>

          <dl className="mt-5 grid gap-4 border-t border-floor-ink/20 pt-5 sm:grid-cols-3 tabular">
            <div>
              <dt className="text-xs font-semibold tracking-wider text-floor-muted uppercase">Total interest</dt>
              <dd className="font-display mt-1 text-2xl font-bold text-floor-ink">
                {formatWholeDollars(totalInterest)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wider text-floor-muted uppercase">Year 1 interest</dt>
              <dd className="font-display mt-1 text-2xl font-bold text-porch-light">
                {formatWholeDollars(year1?.interest ?? 0)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wider text-floor-muted uppercase">Year 1 principal</dt>
              <dd className="font-display mt-1 text-2xl font-bold text-haint">
                {formatWholeDollars(year1?.principal ?? 0)}
              </dd>
            </div>
          </dl>

          {/* Stacked yearly amortization planks */}
          <div className="mt-6 border-t border-floor-ink/20 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-base font-bold text-floor-ink">
                Every year as a painted plank ({years} years)
              </h3>
              <div className="flex items-center gap-4 text-xs font-semibold text-floor-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-xs bg-porch-light" aria-hidden="true" />
                  Interest
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-xs bg-haint" aria-hidden="true" />
                  Principal
                </span>
              </div>
            </div>

            <div
              className="mt-3 flex h-32 items-end gap-0.5 rounded-lg border border-floor-ink/20 bg-black/15 p-2.5 sm:gap-1"
              role="img"
              aria-label={`Stacked yearly principal and interest bars over ${years} years: year 1 is ${formatWholeDollars(year1?.interest ?? 0)} interest and ${formatWholeDollars(year1?.principal ?? 0)} principal; year ${years} is ${formatWholeDollars(lastYear?.interest ?? 0)} interest and ${formatWholeDollars(lastYear?.principal ?? 0)} principal`}
            >
              {schedule.map(row => {
                const total = row.interest + row.principal || 1;
                const principalPct = Math.round((row.principal / total) * 100);
                const interestPct = 100 - principalPct;
                return (
                  <div
                    key={row.year}
                    title={`Year ${row.year}: ${formatWholeDollars(row.principal)} principal, ${formatWholeDollars(row.interest)} interest`}
                    className="flex h-full flex-1 flex-col justify-end overflow-hidden rounded-t-[2px]"
                  >
                    <span
                      className="block w-full bg-porch-light"
                      style={{ height: `${interestPct}%` }}
                    />
                    <span
                      className="block w-full bg-haint"
                      style={{ height: `${principalPct}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-1.5 flex justify-between text-xs text-floor-muted tabular">
              <span>Year 1</span>
              <span>Year {Math.ceil(years / 2)}</span>
              <span>Year {years}</span>
            </div>
          </div>

          {/* Print-friendly concise summary */}
          <p className="print-only mt-4 hidden text-sm">
            Current estimate: {formatDollarsCents(payment)}/month P&amp;I on {formatWholeDollars(amount)} at{' '}
            {rate.toFixed(2)}% for {years} years (total interest {formatWholeDollars(totalInterest)}).
          </p>

          <p className="mt-5 text-xs leading-relaxed text-floor-muted">{REPAYMENT_DISCLAIMER}</p>
        </div>

        <noscript>
          <p className="mt-3 text-sm text-floor-muted">
            Interactive sliders need JavaScript. The figures above show our default worked example ({formatWholeDollars(workedExample.principal)} at{' '}
            {workedExample.annualRatePercent.toFixed(2)}% over {workedExample.years} years).
          </p>
        </noscript>
      </div>
    </div>
  );
}
