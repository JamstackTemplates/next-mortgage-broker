// Repayment explainer worked example, estimator limits and pure calculation helpers.
// Frequent owner edit: update `workedExample` to change the Home teaser, worked example and estimator defaults.

export interface RepaymentExample {
  /** Principal loan amount in whole USD. */
  principal: number;
  /** Illustrative annual interest rate percentage (never a live rate offer). */
  annualRatePercent: number;
  /** Primary term in years. */
  years: number;
  /** Shorter comparison term in years shown in "Where the money goes over time". */
  comparisonYears: number;
}

export interface EstimatorLimits {
  minAmount: number;
  maxAmount: number;
  amountStep: number;
  minRate: number;
  maxRate: number;
  rateStep: number;
  terms: readonly number[];
}

export interface YearlyAmortization {
  year: number;
  interest: number;
  principal: number;
  endingBalance: number;
}

export const workedExample: RepaymentExample = {
  principal: 320_000,
  annualRatePercent: 6.5,
  years: 30,
  comparisonYears: 15,
};

export const estimatorLimits: EstimatorLimits = {
  minAmount: 50_000,
  maxAmount: 2_000_000,
  amountStep: 5_000,
  minRate: 2.0,
  maxRate: 12.0,
  rateStep: 0.125,
  terms: [10, 15, 20, 30],
};

export const REPAYMENT_DISCLAIMER =
  'Illustrative figures only, not a quote or a rate offer. Your rate, taxes, insurance and mortgage insurance depend on the lender, the property and you.';

/** Clamp user-entered estimator values into configured limits, guarding against NaN or non-finite input. */
export function clampAmount(value: number, limits: EstimatorLimits = estimatorLimits): number {
  if (!Number.isFinite(value)) return workedExample.principal;
  return Math.min(limits.maxAmount, Math.max(limits.minAmount, Math.round(value)));
}

export function clampRate(value: number, limits: EstimatorLimits = estimatorLimits): number {
  if (!Number.isFinite(value)) return workedExample.annualRatePercent;
  const clamped = Math.min(limits.maxRate, Math.max(limits.minRate, value));
  return Math.round(clamped * 1000) / 1000;
}

export function clampTerm(value: number, limits: EstimatorLimits = estimatorLimits): number {
  return limits.terms.includes(value) ? value : workedExample.years;
}

/**
 * Standard level-payment monthly principal and interest calculation.
 * Handles a 0% interest rate cleanly without dividing by zero.
 */
export function monthlyPayment(principal: number, annualRatePercent: number, years: number): number {
  if (!Number.isFinite(principal) || !Number.isFinite(annualRatePercent) || !Number.isFinite(years)) {
    throw new Error('monthlyPayment: inputs must be finite numbers');
  }
  if (principal < 0 || annualRatePercent < 0 || years <= 0) {
    throw new Error('monthlyPayment: principal and rate must be >= 0 and years must be > 0');
  }
  const months = Math.round(years * 12);
  if (principal === 0) return 0;
  if (annualRatePercent === 0) return principal / months;
  const monthlyRate = annualRatePercent / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * (monthlyRate * factor)) / (factor - 1);
}

/**
 * Year-by-year amortization summary returning yearly interest paid, principal repaid,
 * and remaining balance. Total principal across all years sums back to the original loan amount.
 */
export function amortizationByYear(
  principal: number,
  annualRatePercent: number,
  years: number,
): YearlyAmortization[] {
  const payment = monthlyPayment(principal, annualRatePercent, years);
  const monthlyRate = annualRatePercent / 100 / 12;
  const totalYears = Math.round(years);
  let balance = principal;
  const schedule: YearlyAmortization[] = [];

  for (let year = 1; year <= totalYears; year++) {
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;
    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break;
      const interestPortion = annualRatePercent === 0 ? 0 : balance * monthlyRate;
      const isFinalMonth = year === totalYears && month === 12;
      const principalPortion = isFinalMonth
        ? balance
        : Math.min(balance, payment - interestPortion);
      yearlyInterest += interestPortion;
      yearlyPrincipal += principalPortion;
      balance = Math.max(0, balance - principalPortion);
    }
    schedule.push({
      year,
      interest: yearlyInterest,
      principal: yearlyPrincipal,
      endingBalance: balance,
    });
  }

  return schedule;
}

export function totalInterestPaid(principal: number, annualRatePercent: number, years: number): number {
  const payment = monthlyPayment(principal, annualRatePercent, years);
  return Math.max(0, payment * Math.round(years * 12) - principal);
}

/** Format USD whole dollars, e.g. "$320,000". */
export function formatWholeDollars(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/** Format USD with cents, e.g. "$2,022.62". */
export function formatDollarsCents(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Split a formatted monthly payment into whole dollars ("$2,022") and cents (".62"). */
export function splitPaymentParts(amount: number): { dollars: string; cents: string } {
  const formatted = formatDollarsCents(amount);
  const dot = formatted.lastIndexOf('.');
  return {
    dollars: formatted.slice(0, dot),
    cents: formatted.slice(dot),
  };
}
