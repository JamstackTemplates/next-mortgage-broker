// The six porch steps from first chat to keys in hand.
export interface ProcessStep {
  /** Unique, URL-safe identifier. */
  id: string;
  /** Consecutive step number from 1 to 6. */
  step: number;
  /** Short step heading painted on the stair tread. */
  title: string;
  /** Plain-English summary shown on /how-it-works/. */
  summary: string;
  /** What the borrower handles at this step. */
  youDo: string;
  /** What June or Marcus handles at this step. */
  weDo: string;
  /** Short Caveat tag summarising who carries the weight. */
  brokerTag: string;
  /** Typical elapsed time for this step. */
  typicalTime: string;
}

export const processSteps: readonly ProcessStep[] = [
  {
    id: 'porch-chat',
    step: 1,
    title: 'A porch chat',
    summary: 'Sit down with June or Marcus by phone, video or at our Blackwell Street table. Tell us where you are and where you want to be.',
    youDo: 'Share your rough budget, timeline and questions — no documents or credit pull needed yet.',
    weDo: 'Listen, explain your loan paths in plain English and give you honest ballpark numbers.',
    brokerTag: 'Just a conversation',
    typicalTime: '30 minutes',
  },
  {
    id: 'pre-approval',
    step: 2,
    title: 'Pre-approval',
    summary: 'When you are ready to look seriously, we review your income, savings and credit once and prepare a strong pre-approval letter.',
    youDo: 'Upload your pay stubs, tax returns or bank statements through a secure portal.',
    weDo: 'Verify the numbers carefully so your letter holds up when sellers look at it.',
    brokerTag: 'One application',
    typicalTime: '2–5 days',
  },
  {
    id: 'compare-lenders',
    step: 3,
    title: 'Compare lenders',
    summary: 'We line up side-by-side Loan Estimates from lenders on our panel that fit your loan type and property.',
    youDo: 'Review the plain-language comparison sheet with us and pick the lender that feels right.',
    weDo: 'Shop our panel, check fees line by line and explain why we suggest a particular option.',
    brokerTag: 'We do the shopping',
    typicalTime: '1–3 days',
  },
  {
    id: 'make-an-offer',
    step: 4,
    title: 'Make an offer',
    summary: 'House-hunting with your agent? We tailor your pre-approval letter to each property and answer the listing agent’s questions.',
    youDo: 'Walk through homes, decide on the one and sign the purchase contract with your agent.',
    weDo: 'Update numbers for taxes and insurance on that exact address and stay on call for offer night.',
    brokerTag: 'We back your offer',
    typicalTime: 'when you find the house',
  },
  {
    id: 'underwriting',
    step: 5,
    title: 'Underwriting and appraisal',
    summary: 'The lender orders the home appraisal and checks every document before issuing the final clear-to-close.',
    youDo: 'Keep your finances steady and answer any quick follow-up questions from the underwriter.',
    weDo: 'Chase paperwork, track appraisal dates and translate every lender request before it hits your inbox.',
    brokerTag: 'We wrangle the file',
    typicalTime: '2–4 weeks',
  },
  {
    id: 'closing-day',
    step: 6,
    title: 'Closing day — keys in hand',
    summary: 'Meet at the North Carolina closing attorney’s table, review the final Closing Disclosure we walked through together, sign and head home.',
    youDo: 'Bring your photo ID, review the final figures and sign your closing papers.',
    weDo: 'Check every fee against your earlier Loan Estimate and stay available right through funding.',
    brokerTag: 'Keys in hand!',
    typicalTime: 'one afternoon',
  },
] as const;

export const documentChecklist: readonly { category: string; items: readonly string[] }[] = [
  {
    category: 'Identity and basics',
    items: [
      'Government-issued photo ID (driver’s license or passport)',
      'Two years of residential address history',
    ],
  },
  {
    category: 'Income (W-2 employees)',
    items: [
      'Most recent 30 days of pay stubs',
      'Last two years of W-2 forms and federal tax returns',
    ],
  },
  {
    category: 'Self-employed or business owners',
    items: [
      'Last two years of personal and business tax returns (all schedules)',
      'Year-to-date profit and loss statement, or 12–24 months of bank statements for bank-statement loans',
    ],
  },
  {
    category: 'Savings and down payment',
    items: [
      'Two most recent monthly statements for checking, savings or retirement accounts',
      'Gift letter and transfer paper trail if family is helping with the down payment',
    ],
  },
  {
    category: 'Special situations',
    items: [
      'VA Certificate of Eligibility (COE) and DD-214 if using a VA loan — we can help pull your COE',
      'Current mortgage statement and homeowners insurance declaration page if refinancing',
    ],
  },
] as const;
