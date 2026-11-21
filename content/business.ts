// Shared business details for Front Porch Home Loans.
// This is a fictitious sample business for the Jamstacks template gallery.
// Replace with the owner's real details and update site.config.json when renaming.

export interface BrokerProfile {
  /** Unique, URL-safe identifier. */
  id: string;
  /** Broker's display name. */
  name: string;
  /** Role title shown beneath the broker's name. */
  role: string;
  /** Whole years of mortgage brokering experience. */
  yearsBrokering: number;
  /** Short, neighborly first-person or third-person biography. */
  bio: string;
  /** Loan-type IDs from content/loans.ts that this broker specializes in. */
  specialties: readonly string[];
  /** Short handwritten sign-off rendered in Caveat. */
  signature: string;
}

export interface PostalAddress {
  suite: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  /** Single-line formatted address for display. */
  formatted: string;
  /** Public landmark query passed to Google Maps helpers. */
  mapQuery: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short display headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and structured data. */
  introduction: string;
  /** Public contact email address (always visible). */
  email: string;
  /** Human-formatted phone number shown on screen. */
  phoneDisplay: string;
  /** International telephone string for tel: links and schema.org. */
  phone: string;
  /** Office postal address (public landmark with fictional suite). */
  address: PostalAddress;
  /** Friendly directions cue for finding the office. */
  landmark: string;
  /** Counties served in person (plus statewide phone/video). */
  serviceAreaCounties: readonly string[];
  /** Statewide meeting note. */
  serviceAreaNote: string;
  /** Sample licensing & Equal Housing Opportunity notice (words only, no HUD logo). */
  licensingLine: string;
  /** Two brokers who run the office. */
  brokers: readonly BrokerProfile[];
  /** Contact page copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Plain-English enquiry note with no approval, quote or delivery claims. */
    introduction: string;
    /** Expected response rhythm without promising delivery or confirmation. */
    replyNote: string;
    /** Suggestions for what visitors might mention in the message box. */
    usefulToInclude: readonly string[];
    /** Privacy warning against sharing sensitive financial identifiers. */
    privacyWarning: string;
  };
}

export const business: Business = {
  name: 'Front Porch Home Loans',
  tagline: 'Pull up a chair. Let’s talk about your home loan.',
  introduction:
    'Front Porch Home Loans is a friendly Durham mortgage broker. We compare loans from a panel of lenders, explain your repayments plainly and walk with you to closing day.',
  email: 'hello@frontporchhomeloans.example',
  phoneDisplay: '(919) 555-0142',
  phone: '+1 919-555-0142',
  address: {
    suite: 'Suite 210',
    street: '318 Blackwell Street',
    city: 'Durham',
    state: 'NC',
    postalCode: '27701',
    country: 'US',
    formatted: 'Suite 210, 318 Blackwell Street, Durham, NC 27701',
    mapQuery: 'American Tobacco Campus, 318 Blackwell Street, Durham, NC 27701',
  },
  landmark: 'Across the lawn from the Lucky Strike water tower, on the second floor.',
  serviceAreaCounties: ['Durham County', 'Orange County', 'Wake County', 'Chatham County'],
  serviceAreaNote: 'Phone and video meetings are available anywhere in North Carolina.',
  licensingLine:
    'Front Porch Home Loans is a fictitious business shown as a Jamstacks template sample. NMLS #0000000 is a placeholder. Equal Housing Opportunity.',
  brokers: [
    {
      id: 'june-okafor',
      name: 'June Okafor',
      role: 'Founder & Mortgage Broker',
      yearsBrokering: 14,
      bio: 'After fourteen years helping Durham renters pick up their first set of keys, June still loves spreading two Loan Estimates across the table and turning fine print into plain English.',
      specialties: ['conventional-fixed', 'fha', 'refinance'],
      signature: '— June',
    },
    {
      id: 'marcus-bell',
      name: 'Marcus Bell',
      role: 'Mortgage Broker',
      yearsBrokering: 9,
      bio: 'Marcus specialises in VA loans for military families relocating to the Triangle and untangling real-world income for self-employed business owners and contractors.',
      specialties: ['va', 'bank-statement', 'arm'],
      signature: '— Marcus',
    },
  ],
  enquiries: {
    title: 'Pull up a chair and drop us a line',
    introduction:
      'Send an enquiry about buying, moving, refinancing or simply making sense of your options. Every message is a conversation starter — never a loan application, rate lock or confirmed appointment.',
    replyNote: 'June or Marcus will reply, usually within one working day.',
    usefulToInclude: [
      'What you’re hoping to do (buy, move or refinance)',
      'A rough price range or loan amount',
      'Your timing',
      'Whether you’re a veteran or self-employed',
      'The best time to call you back',
    ],
    privacyWarning:
      'Please don’t send Social Security numbers or account details by email or this form.',
  },
};
