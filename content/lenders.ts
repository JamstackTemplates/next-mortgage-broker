// Fictitious lender panel for Front Porch Home Loans (Jamstacks gallery template sample).
// Every lender name below is entirely invented.
// Frequent owner edit: set `onPanel: false` to hide a lender without deleting it, or add a new entry.

export type LenderKind = 'bank' | 'credit-union' | 'non-bank';

export interface Lender {
  /** Unique, URL-safe identifier. */
  id: string;
  /** Display name printed on the hanging key tag. */
  name: string;
  /** Institution category used to group the key rails on /lenders/. */
  kind: LenderKind;
  /** Loan type IDs from content/loans.ts (at least one, all must exist). */
  loanTypes: readonly string[];
  /** One short plain-English note on what this lender is known for. */
  knownFor: string;
  /** Set to false to hide a lender from the site without deleting its record. */
  onPanel: boolean;
}

export const LENDER_KIND_LABELS: Record<LenderKind, string> = {
  bank: 'Banks',
  'credit-union': 'Credit unions',
  'non-bank': 'Non-bank lenders',
};

export const LENDER_KIND_ORDER: readonly LenderKind[] = ['bank', 'credit-union', 'non-bank'];

export const lenders: readonly Lender[] = [
  {
    id: 'longleaf-home-lending',
    name: 'Longleaf Home Lending',
    kind: 'non-bank',
    loanTypes: ['conventional-fixed', 'fha', 'va', 'refinance'],
    knownFor: 'Fast pre-approvals and clear communication.',
    onPanel: true,
  },
  {
    id: 'red-clay-cu',
    name: 'Red Clay Credit Union',
    kind: 'credit-union',
    loanTypes: ['conventional-fixed', 'usda', 'refinance'],
    knownFor: 'Member pricing for Triangle locals.',
    onPanel: true,
  },
  {
    id: 'hearthstone-mutual',
    name: 'Hearthstone Mutual Bank',
    kind: 'bank',
    loanTypes: ['conventional-fixed', 'jumbo', 'arm'],
    knownFor: 'Strong on larger loans and relocations.',
    onPanel: true,
  },
  {
    id: 'tobacco-road-federal',
    name: 'Tobacco Road Federal',
    kind: 'bank',
    loanTypes: ['conventional-fixed', 'fha', 'refinance'],
    knownFor: 'Patient with first-time buyers.',
    onPanel: true,
  },
  {
    id: 'bluebird-mortgage',
    name: 'Bluebird Mortgage Co.',
    kind: 'non-bank',
    loanTypes: ['fha', 'va', 'usda'],
    knownFor: 'Government-backed loan specialists.',
    onPanel: true,
  },
  {
    id: 'sweetgum-savings',
    name: 'Sweetgum Savings',
    kind: 'bank',
    loanTypes: ['conventional-fixed', 'arm', 'refinance'],
    knownFor: 'Competitive adjustable-rate options.',
    onPanel: true,
  },
  {
    id: 'cardinal-heights-lending',
    name: 'Cardinal Heights Lending',
    kind: 'non-bank',
    loanTypes: ['bank-statement', 'arm', 'jumbo'],
    knownFor: 'Flexible income documentation.',
    onPanel: true,
  },
  {
    id: 'eno-river-cu',
    name: 'Eno River Credit Union',
    kind: 'credit-union',
    loanTypes: ['conventional-fixed', 'fha', 'refinance'],
    knownFor: 'Low closing costs for members.',
    onPanel: true,
  },
  {
    id: 'ironwood-capital-home',
    name: 'Ironwood Capital Home',
    kind: 'non-bank',
    loanTypes: ['jumbo', 'bank-statement'],
    knownFor: 'High-balance and complex income.',
    onPanel: true,
  },
  {
    id: 'porchlight-lending',
    name: 'Porchlight Lending Group',
    kind: 'non-bank',
    loanTypes: ['va', 'fha', 'conventional-fixed'],
    knownFor: 'VA loans and military moves.',
    onPanel: true,
  },
  {
    id: 'magnolia-row-bank',
    name: 'Magnolia Row Bank',
    kind: 'bank',
    loanTypes: ['conventional-fixed', 'usda', 'arm'],
    knownFor: 'Rural and small-town properties.',
    onPanel: true,
  },
  {
    id: 'blue-ridge-rail',
    name: 'Blue Ridge Rail Mortgage',
    kind: 'non-bank',
    loanTypes: ['refinance', 'conventional-fixed', 'va'],
    knownFor: 'Quick, tidy refinances.',
    onPanel: true,
  },
];

/** Active lenders currently shown on Home, Lenders and filters. */
export function getActiveLenders(list: readonly Lender[] = lenders): Lender[] {
  return list.filter(lender => lender.onPanel);
}

const SMALL_WORDS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
];

/** Convert small counts to plain English ("twelve", "thirteen") or digits for larger panels. */
export function lenderCountWord(count: number, { capitalize = false } = {}): string {
  const word = count >= 0 && count < SMALL_WORDS.length ? SMALL_WORDS[count] : String(count);
  return capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}
