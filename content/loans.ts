// Loan types offered through our lender panel.
// Fictitious sample data for Front Porch Home Loans. Never state current rates or guarantee approval.

export interface LoanType {
  /** Unique, URL-safe identifier; also used as the anchor ID on /loans/#<id>. */
  id: string;
  /** Full loan name shown on plaques and structured data. */
  name: string;
  /** Short label used on filter chips and lender key tags. */
  shortName: string;
  /** One-sentence plain-English overview. */
  summary: string;
  /** Situation IDs from content/situations.ts (at least one, all must exist). */
  suits: readonly string[];
  /** Minimum down payment percentage (0–100), or null when not applicable (e.g. refinance). */
  minDownPaymentPercent: number | null;
  /** Available repayment terms in whole years (each between 10 and 30). */
  termsYears: readonly number[];
  /** Two to four factual highlights to know before comparing. */
  goodToKnow: readonly string[];
  /** One to three factual trade-offs or rules to watch out for. */
  watchOutFor: readonly string[];
  /** Exactly four loans are featured in the Home preview row. */
  featured: boolean;
}

export const loans: readonly LoanType[] = [
  {
    id: 'conventional-fixed',
    name: 'Conventional fixed-rate',
    shortName: 'Conventional',
    summary: 'A steady principal-and-interest payment that stays the same from your first month to your last.',
    suits: ['first-home', 'moving', 'self-employed'],
    minDownPaymentPercent: 3,
    termsYears: [15, 20, 30],
    goodToKnow: [
      'Private mortgage insurance drops off once your equity reaches 20% to 22%.',
      'Works for primary homes, second homes and many condo buildings across the Triangle.',
      'First-time buyers can often start with 3% down through standard conforming programs.',
    ],
    watchOutFor: [
      'Credit score and debt-to-income guidelines are stricter than government-backed loans.',
      'Putting less than 20% down adds private mortgage insurance until you build equity.',
    ],
    featured: true,
  },
  {
    id: 'fha',
    name: 'FHA loan',
    shortName: 'FHA',
    summary: 'A government-insured mortgage designed to help buyers with smaller savings or building credit.',
    suits: ['first-home'],
    minDownPaymentPercent: 3.5,
    termsYears: [15, 30],
    goodToKnow: [
      'Down payment starts at 3.5% and can come from eligible family gifts or assistance programs.',
      'More forgiving of past credit bumps and higher monthly debt ratios than conventional loans.',
      'Assumable by a qualified future buyer under lender review.',
    ],
    watchOutFor: [
      'Mortgage insurance usually lasts the life of the loan unless you put down 10% or more.',
      'Includes both an upfront mortgage insurance premium and a monthly one.',
    ],
    featured: true,
  },
  {
    id: 'va',
    name: 'VA loan',
    shortName: 'VA',
    summary: 'A home loan benefit backed by the Department of Veterans Affairs for eligible service members, veterans and surviving spouses.',
    suits: ['veteran', 'first-home', 'moving'],
    minDownPaymentPercent: 0,
    termsYears: [15, 30],
    goodToKnow: [
      'Requires 0% down payment for borrowers with full VA entitlement.',
      'No monthly private mortgage insurance, which can keep the monthly payment lower.',
      'Can be used more than once over your lifetime as entitlement is restored.',
    ],
    watchOutFor: [
      'There is a one-time VA funding fee, which some veterans with service-connected disabilities are exempt from.',
      'The home must be your primary residence and pass VA minimum property standards.',
    ],
    featured: true,
  },
  {
    id: 'usda',
    name: 'USDA rural home loan',
    shortName: 'USDA',
    summary: 'A zero-down mortgage backed by the USDA for modest-income buyers purchasing in eligible rural and small-town areas.',
    suits: ['first-home'],
    minDownPaymentPercent: 0,
    termsYears: [30],
    goodToKnow: [
      'Allows 0% down payment in eligible outskirts of Chatham, Orange and surrounding counties.',
      'Guarantee fees are typically smaller than standard FHA mortgage insurance.',
    ],
    watchOutFor: [
      'The property must be in a USDA-eligible area, and household income limits apply.',
      'Only available as a 30-year fixed loan for a primary residence.',
    ],
    featured: false,
  },
  {
    id: 'jumbo',
    name: 'Jumbo loan',
    shortName: 'Jumbo',
    summary: 'Financing for loan amounts above the standard conforming county limit when buying a larger or higher-priced home.',
    suits: ['moving'],
    minDownPaymentPercent: 10,
    termsYears: [15, 30],
    goodToKnow: [
      'Covers larger loan balances in a single mortgage rather than splitting into two loans.',
      'Available in both fixed-rate and adjustable options depending on the lender.',
    ],
    watchOutFor: [
      'Lenders usually ask for stronger credit, larger down payments and extra cash reserves.',
      'Appraisals and underwriting checks take closer documentation.',
    ],
    featured: false,
  },
  {
    id: 'arm',
    name: 'Adjustable-rate (7/6 ARM)',
    shortName: '7/6 ARM',
    summary: 'A loan with a fixed starting period for seven years that later adjusts twice a year within written caps.',
    suits: ['moving', 'self-employed'],
    minDownPaymentPercent: 5,
    termsYears: [30],
    goodToKnow: [
      'The rate is fixed for 7 years, then adjusts every 6 months within clear caps.',
      'Can suit homeowners who expect to move, sell or refinance before the fixed period ends.',
    ],
    watchOutFor: [
      'Your payment can rise after year seven if market indexes are higher at adjustment time.',
      'You need to be comfortable with the worst-case cap written into the loan note.',
    ],
    featured: false,
  },
  {
    id: 'bank-statement',
    name: 'Bank-statement loan',
    shortName: 'Bank-statement',
    summary: 'A non-QM mortgage for business owners and contractors who qualify using business or personal bank deposits instead of tax-return net income.',
    suits: ['self-employed'],
    minDownPaymentPercent: 10,
    termsYears: [30],
    goodToKnow: [
      'Uses 12 or 24 months of bank statements to show real cash flow after reasonable expense factors.',
      'Helpful when legitimate business write-offs make your tax return look smaller than your livelihood.',
    ],
    watchOutFor: [
      'Expect higher rates and a larger down payment than for a conventional loan.',
      'Fewer lenders offer these programs, so comparing guidelines across our panel matters.',
    ],
    featured: false,
  },
  {
    id: 'refinance',
    name: 'Refinance (rate-and-term or cash-out)',
    shortName: 'Refinance',
    summary: 'Replacing your current mortgage to change your term, adjust your payment structure, remove mortgage insurance or tap home equity.',
    suits: ['refinance'],
    minDownPaymentPercent: null,
    termsYears: [15, 20, 30],
    goodToKnow: [
      'Rate-and-term refinances can shorten a 30-year loan to 15 or 20 years, or drop FHA mortgage insurance.',
      'Cash-out refinances let eligible homeowners borrow against built-up equity for major projects.',
      'We calculate your break-even point against closing costs before recommending a switch.',
    ],
    watchOutFor: [
      'Resetting back to a new 30-year clock can increase total interest even when the monthly bill drops.',
      'Closing costs apply, so a refinance only makes sense if you plan to stay long enough to recover them.',
    ],
    featured: true,
  },
] as const;

export function getFeaturedLoans(): LoanType[] {
  return loans.filter(loan => loan.featured);
}

export function getLoanById(id: string): LoanType | undefined {
  return loans.find(loan => loan.id === id);
}
