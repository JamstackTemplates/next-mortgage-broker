// Six plain-English FAQ entries shown with native <details> disclosure on /how-it-works/.
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: readonly FaqItem[] = [
  {
    id: 'cost-to-talk',
    question: 'Does it cost me anything to talk?',
    answer:
      'No. A first porch chat, reviewing your options and walking through estimated monthly payments never costs a dime, and there is no obligation to apply or borrow through us.',
  },
  {
    id: 'how-paid',
    question: 'How are you paid?',
    answer:
      'When your loan closes, the lender you choose pays our broker compensation. The exact dollar amount is disclosed in black and white on your official Loan Estimate before you commit to anything.',
  },
  {
    id: 'credit-check',
    question: 'Will checking options hurt my credit?',
    answer:
      'Talking through ballpark scenarios does not require a credit pull at all. When you decide you want a full pre-approval, one mortgage credit check is used across the lenders we compare — and credit bureaus treat mortgage inquiries made within a short shopping window as a single pull.',
  },
  {
    id: 'how-much-saved',
    question: 'How much do I need saved?',
    answer:
      'It depends on the loan program. Eligible VA and USDA buyers can start with 0% down, many first-time conventional buyers start at 3% down, and FHA loans start at 3.5% down. Plan for closing costs too — usually 2% to 4% of the purchase price — though seller credits or assistance programs can sometimes help.',
  },
  {
    id: 'self-employed',
    question: 'Can you help if I’m self-employed?',
    answer:
      'Yes — Marcus works with business owners, freelancers and contractors every week. We look at your two-year tax returns first for standard conventional options, and if heavy write-offs mask your real cash flow, we can also compare bank-statement lenders on our panel.',
  },
  {
    id: 'outside-durham',
    question: 'Do you work outside Durham?',
    answer:
      'We serve Durham, Orange, Wake and Chatham counties in person from our American Tobacco Campus office, and we happily meet by phone or video with homebuyers and homeowners anywhere in North Carolina.',
  },
] as const;
