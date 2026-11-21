import { business } from './business.ts';
import { faqItems } from './faq.ts';
import { officeHours } from './hours.ts';
import { lenders, type Lender } from './lenders.ts';
import { loans, type LoanType } from './loans.ts';
import { processSteps, type ProcessStep } from './process.ts';
import { estimatorLimits, workedExample } from './repayments.ts';
import { situations, type VisitorSituation } from './situations.ts';
import { validateHours } from '../lib/hours.ts';

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assertUrlSafeUniqueIds(
  collection: string,
  items: readonly { id: string }[],
): Set<string> {
  const seen = new Set<string>();
  for (const item of items) {
    if (!item.id || !URL_SAFE_ID.test(item.id)) {
      throw new Error(`${collection}: invalid non-URL-safe id "${item.id}"`);
    }
    if (seen.has(item.id)) {
      throw new Error(`${collection}: duplicate id "${item.id}"`);
    }
    seen.add(item.id);
  }
  return seen;
}

export function validateCollections(data: {
  situations: readonly VisitorSituation[];
  loans: readonly LoanType[];
  lenders: readonly Lender[];
  processSteps: readonly ProcessStep[];
} = { situations, loans, lenders, processSteps }): void {
  const situationIds = assertUrlSafeUniqueIds('situations', data.situations);
  const loanIds = assertUrlSafeUniqueIds('loans', data.loans);
  assertUrlSafeUniqueIds('lenders', data.lenders);
  assertUrlSafeUniqueIds('processSteps', data.processSteps);

  // Situations
  for (const s of data.situations) {
    if (!s.label.trim()) throw new Error(`situations/${s.id}: label is required`);
    if (!s.summary.trim()) throw new Error(`situations/${s.id}: summary is required`);
  }

  // Loans
  let featuredCount = 0;
  for (const loan of data.loans) {
    if (!loan.name.trim()) throw new Error(`loans/${loan.id}: name is required`);
    if (!loan.shortName.trim()) throw new Error(`loans/${loan.id}: shortName is required`);
    if (!loan.summary.trim()) throw new Error(`loans/${loan.id}: summary is required`);
    if (!loan.suits.length) throw new Error(`loans/${loan.id}: suits must list at least one situation`);
    for (const sid of loan.suits) {
      if (!situationIds.has(sid)) {
        throw new Error(`loans/${loan.id}: unknown situation "${sid}" in suits`);
      }
    }
    if (
      loan.minDownPaymentPercent !== null &&
      (!Number.isFinite(loan.minDownPaymentPercent) ||
        loan.minDownPaymentPercent < 0 ||
        loan.minDownPaymentPercent > 100)
    ) {
      throw new Error(`loans/${loan.id}: minDownPaymentPercent must be between 0 and 100 or null`);
    }
    if (!loan.termsYears.length) {
      throw new Error(`loans/${loan.id}: termsYears must be non-empty`);
    }
    for (const term of loan.termsYears) {
      if (!Number.isInteger(term) || term < 10 || term > 30) {
        throw new Error(`loans/${loan.id}: term ${term} must be a whole number from 10 to 30`);
      }
    }
    if (loan.goodToKnow.length < 2 || loan.goodToKnow.length > 4) {
      throw new Error(`loans/${loan.id}: goodToKnow must contain 2–4 items`);
    }
    if (loan.watchOutFor.length < 1 || loan.watchOutFor.length > 3) {
      throw new Error(`loans/${loan.id}: watchOutFor must contain 1–3 items`);
    }
    if (loan.featured) featuredCount++;
  }
  if (featuredCount !== 4) {
    throw new Error(`loans: expected exactly 4 featured loans, found ${featuredCount}`);
  }

  // Lenders
  const validKinds = new Set(['bank', 'credit-union', 'non-bank']);
  const activeLenders = data.lenders.filter(l => l.onPanel);
  for (const lender of data.lenders) {
    if (!lender.name.trim()) throw new Error(`lenders/${lender.id}: name is required`);
    if (!validKinds.has(lender.kind)) throw new Error(`lenders/${lender.id}: invalid kind "${lender.kind}"`);
    if (!lender.knownFor.trim()) throw new Error(`lenders/${lender.id}: knownFor is required`);
    if (!lender.loanTypes.length) throw new Error(`lenders/${lender.id}: loanTypes must be non-empty`);
    for (const lid of lender.loanTypes) {
      if (!loanIds.has(lid)) {
        throw new Error(`lenders/${lender.id}: unknown loan type "${lid}" in loanTypes`);
      }
    }
  }
  for (const loan of data.loans) {
    const offered = activeLenders.some(lender => lender.loanTypes.includes(loan.id));
    if (!offered) {
      throw new Error(`lenders: no active panel lender offers loan "${loan.id}"`);
    }
  }

  // Process steps (1-6 consecutive)
  if (data.processSteps.length !== 6) {
    throw new Error(`processSteps: expected 6 steps, found ${data.processSteps.length}`);
  }
  data.processSteps.forEach((step, idx) => {
    const expected = idx + 1;
    if (step.step !== expected) {
      throw new Error(`processSteps/${step.id}: expected consecutive step ${expected}, found ${step.step}`);
    }
    for (const field of ['title', 'summary', 'youDo', 'weDo', 'typicalTime'] as const) {
      if (!step[field].trim()) throw new Error(`processSteps/${step.id}: ${field} is required`);
    }
  });

  // Brokers
  for (const broker of business.brokers) {
    if (!URL_SAFE_ID.test(broker.id)) throw new Error(`business.brokers/${broker.id}: invalid id`);
    for (const sid of broker.specialties) {
      if (!loanIds.has(sid)) {
        throw new Error(`business.brokers/${broker.id}: unknown specialty loan "${sid}"`);
      }
    }
  }

  // Hours, FAQ & Repayment limits
  validateHours(officeHours);
  assertUrlSafeUniqueIds('faqItems', faqItems);
  if (faqItems.length !== 6) throw new Error(`faqItems: expected 6 questions, found ${faqItems.length}`);
  if (
    workedExample.principal < estimatorLimits.minAmount ||
    workedExample.principal > estimatorLimits.maxAmount
  ) {
    throw new Error('repayments: workedExample.principal must fall inside estimatorLimits');
  }
  if (
    workedExample.annualRatePercent < estimatorLimits.minRate ||
    workedExample.annualRatePercent > estimatorLimits.maxRate
  ) {
    throw new Error('repayments: workedExample.annualRatePercent must fall inside estimatorLimits');
  }
  if (!estimatorLimits.terms.includes(workedExample.years)) {
    throw new Error('repayments: workedExample.years must be in estimatorLimits.terms');
  }
}
