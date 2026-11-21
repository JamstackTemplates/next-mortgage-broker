// Fictitious visitor situations referenced by loan types on /loans/ and Home.
export interface VisitorSituation {
  /** Unique URL-safe identifier used in query strings (?for=<id>) and loan.suits references. */
  id: string;
  /** Short visitor-facing label shown on porch chair seats and filter chips. */
  label: string;
  /** Plain-English description of this visitor's situation. */
  summary: string;
}

export const situations: readonly VisitorSituation[] = [
  {
    id: 'first-home',
    label: 'Buying my first home',
    summary: 'You’re renting now and want to understand what you could borrow and what you’ll need saved.',
  },
  {
    id: 'moving',
    label: 'Moving or upsizing',
    summary: 'You own a home and want to buy the next one, possibly before you sell.',
  },
  {
    id: 'veteran',
    label: 'Veteran or service member',
    summary: 'You may be eligible for a VA loan with no down payment.',
  },
  {
    id: 'self-employed',
    label: 'Self-employed',
    summary: 'Your income is real but your tax returns don’t tell the whole story.',
  },
  {
    id: 'refinance',
    label: 'Refinancing',
    summary: 'You want a lower payment, a shorter term or cash for a project.',
  },
] as const;

export type SituationId = (typeof situations)[number]['id'];
