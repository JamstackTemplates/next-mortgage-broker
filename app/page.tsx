import type { Metadata } from 'next';
import {
  FeaturedLoansSection,
  HomeLenderStrip,
  HomeStepsSection,
  MeetBrokersBand,
  PorchHero,
  PorchSeatsBand,
  RepaymentTeaserBand,
  VisitOfficeSection,
} from '../components/home-sections';
import { getActiveLenders, lenderCountWord } from '../content/lenders';
import { getFeaturedLoans } from '../content/loans';
import { processSteps } from '../content/process';
import { situations } from '../content/situations';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const activeLenders = getActiveLenders();
  const countLower = lenderCountWord(activeLenders.length);
  const countTitle = lenderCountWord(activeLenders.length, { capitalize: true });
  const featuredLoans = getFeaturedLoans();

  return (
    <>
      <PorchHero
        walk={
          <PorchHero.Walk
            facts={[
              { value: activeLenders.length, label: <>lenders on<br />one panel</> },
              { value: '$0', label: <>to sit down<br />and talk</> },
              { value: processSteps.length, label: <>porch steps<br />to your keys</> },
            ]}
          />
        }
      >
        <PorchHero.Sign>Mortgage brokers · Durham, North Carolina</PorchHero.Sign>
        <PorchHero.Heading kicker="Pull up a chair.">Let’s talk about your home loan.</PorchHero.Heading>
        <PorchHero.Lead>
          We compare mortgages from {countLower} lenders, explain every number in plain English and stay
          with you until you have the keys. No fee to talk, and no pressure to borrow.
        </PorchHero.Lead>
        <PorchHero.Actions
          primary="Start a conversation"
          secondary="See what a payment looks like"
          note="No fee to talk — ever"
        />
      </PorchHero>

      <PorchSeatsBand
        heading="Who sits on our porch"
        intro="Pick the seat that sounds most like you to see the home loan types that fit."
        handNote="There’s always a spare chair."
        situations={situations}
      />

      <FeaturedLoansSection
        heading="Plain-English home loan types"
        intro="Four of the loans we explain most often around Durham — with the trade-offs printed right beside the benefits."
        ctaLabel="See all eight loan types"
        loans={featuredLoans}
      />

      <RepaymentTeaserBand
        heading="See what a monthly payment looks like"
        handNote="Most of year one is interest — here’s why."
        ctaLabel="Explore the repayment explainer"
      />

      <HomeStepsSection
        heading="Six porch steps from first chat to closing day"
        intro="No mystery portals or disappearing loan officers. You always know what step you’re standing on and who is carrying the paperwork."
        ctaLabel="See every step"
        steps={processSteps}
      />

      <HomeLenderStrip
        heading={`${countTitle} lenders. One conversation.`}
        intro="Instead of calling banks one by one, you talk with June or Marcus once and we compare real options across our panel."
        ctaLabel="Browse the lender panel"
        lenders={activeLenders}
      />

      <MeetBrokersBand
        heading="Meet June and Marcus"
        intro="Two Durham brokers who answer their own phones and speak like neighbours, not bank lobbies."
      />

      <VisitOfficeSection
        heading="Visit the office in Durham"
        intro="Stop by our Blackwell Street table, or pull up a chair by phone or video from anywhere in North Carolina."
        ctaLabel="Start a conversation"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
