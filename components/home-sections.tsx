import type { ReactNode } from 'react';
import { business, type BrokerProfile } from '../content/business';
import { officeHours } from '../content/hours';
import { getActiveLenders, type Lender } from '../content/lenders';
import { loans, type LoanType } from '../content/loans';
import type { ProcessStep } from '../content/process';
import {
  amortizationByYear,
  formatWholeDollars,
  monthlyPayment,
  REPAYMENT_DISCLAIMER,
  splitPaymentParts,
  workedExample,
} from '../content/repayments';
import type { VisitorSituation } from '../content/situations';
import { mapDirectionsUrl } from '../lib/maps';
import { BalusterRail, FloorboardBand } from './art/dividers';
import { HouseNumberPlaque } from './art/house-plaque';
import { KeyRail, KeyTag } from './art/key-tag';
import { DurhamSkyline } from './art/durham-skyline';
import { MailIcon, PhoneIcon, PinIcon, RockingChairs } from './art/motifs';
import { PorchScene } from './art/porch-scene';
import { PorchSteps } from './art/porch-steps';
import { GoogleMap } from './google-map';
import { HoursTable, OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type ContentProps = { children: ReactNode };

/* --------------------------------------------------------------------------
   1. Hero — one full-bleed scene: sky, Durham warehouse skyline on the
      horizon, the porch standing on the lawn, and a brick front walk that
      carries the key facts.
   -------------------------------------------------------------------------- */
function PorchHeroRoot({ children, walk }: ContentProps & { walk?: ReactNode }) {
  return (
    <section className="relative isolate overflow-x-clip" aria-labelledby="hero-heading">
      <div className="relative">
        {/* Sky, dusk stars, horizon and lawn */}
        <div aria-hidden="true" className="hero-sky absolute inset-0 -z-10" />
        <HeroStars />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10">
          <DurhamSkyline
            className="block h-[max(7.5rem,15.28vw)] w-full"
            preserveAspectRatio="xMidYMax slice"
          />
          <div className="hero-lawn h-[7.5vw] lg:h-[3.4vw]" />
        </div>

        <div className="wrap grid gap-2 pt-7 sm:pt-12 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pt-10">
          <div className="relative z-10 lg:col-span-6 lg:pb-[clamp(7rem,10vw,9.5rem)]">
            {children}
          </div>
          <div className="relative -mx-4 mt-4 sm:mx-0 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:-mr-16 xl:-mr-32">
            <PorchScene bare className="relative block h-auto w-full" />
          </div>
        </div>
      </div>
      {walk}
    </section>
  );
}

function HeroStars() {
  return (
    <svg
      aria-hidden="true"
      className="porch-fireflies pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 w-full"
      viewBox="0 0 1440 256"
      preserveAspectRatio="xMidYMin slice"
      fill="var(--porch-light)"
    >
      {[
        [80, 40, 1.4], [210, 92, 1.1], [360, 28, 1.6], [520, 70, 1.2], [690, 22, 1.3],
        [860, 58, 1.1], [1010, 30, 1.5], [1180, 84, 1.2], [1320, 36, 1.4], [1400, 120, 1],
        [600, 150, 1], [140, 170, 1.1],
      ].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} opacity="0.7" />
      ))}
    </svg>
  );
}

function HeroSign({ children }: ContentProps) {
  return (
    <p className="porch-sign mb-5 sm:mb-6">
      <span aria-hidden="true" className="porch-sign__nail" />
      <span>{children}</span>
      <span aria-hidden="true" className="porch-sign__nail" />
    </p>
  );
}

function HeroHeading({ kicker, children }: ContentProps & { kicker?: ReactNode }) {
  return (
    <h1
      id="hero-heading"
      className="font-display text-[clamp(2.6rem,5vw,4.35rem)] leading-[0.98] font-bold tracking-[-0.025em] text-ink"
    >
      {kicker ? (
        <span className="hero-kicker relative mb-2 block w-fit text-[0.6em] leading-tight font-semibold italic">
          {kicker}
          <svg
            aria-hidden="true"
            viewBox="0 0 300 18"
            preserveAspectRatio="none"
            className="hero-kicker__swash absolute -bottom-2 left-0 h-3.5 w-full"
          >
            <path d="M3 12C70 4 160 3 297 9" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </span>
      ) : null}
      <span className="block">{children}</span>
    </h1>
  );
}

function HeroLead({ children }: ContentProps) {
  return (
    <p className="mt-5 max-w-[34rem] text-[clamp(1.02rem,1.35vw,1.2rem)] leading-relaxed text-ink/80 sm:mt-6">
      {children}
    </p>
  );
}

function HeroActions({ primary, secondary, note }: { primary: ReactNode; secondary: ReactNode; note?: ReactNode }) {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <SiteLink href="/contact/" className="button button-lg">
          {primary}
        </SiteLink>
        <SiteLink href="/repayments/" className="button button-quiet button-lg">
          {secondary}
        </SiteLink>
      </div>
      {note ? (
        <p className="hand-note mt-3 ml-3 flex items-center gap-1.5 text-[1.35rem] text-primary dark:text-porch-light">
          <svg aria-hidden="true" viewBox="0 0 40 30" className="h-7 w-9 -scale-x-100 rotate-12">
            <path
              d="M4 26C10 14 20 8 34 6M34 6l-8-4M34 6l-6 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {note}
        </p>
      ) : null}
    </div>
  );
}

type WalkFact = { value: ReactNode; label: ReactNode };

/** Brick front walk at the foot of the porch steps, carrying the key facts and the phone. */
function HeroWalk({ facts }: { facts: readonly WalkFact[] }) {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;
  return (
    <div className="brick-walk relative border-t-4 border-ink/70 text-floor-ink">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-5 py-6 sm:py-7 lg:grid-cols-12 lg:items-center lg:gap-8">
        {facts.map((fact, idx) => (
          <div key={idx} className="flex items-baseline gap-3 lg:col-span-2 xl:col-span-2">
            <span className="font-display text-[clamp(2rem,3.6vw,2.9rem)] leading-none font-bold text-porch-light tabular">
              {fact.value}
            </span>
            <span className="text-sm leading-snug font-medium text-floor-ink/90">{fact.label}</span>
          </div>
        ))}
        <div className="col-span-2 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-floor-ink/25 pt-4 lg:col-span-6 lg:col-start-7 lg:justify-end lg:border-t-0 lg:pt-0">
          <a
            href={telHref}
            className="inline-flex items-center gap-2 font-display text-xl font-bold text-floor-ink no-underline hover:text-porch-light hover:underline"
          >
            <PhoneIcon className="h-5 w-5 text-porch-light" />
            {business.phoneDisplay}
          </a>
          <OpenBadge hours={officeHours} variant="floor" />
        </div>
      </div>
    </div>
  );
}

export const PorchHero = Object.assign(PorchHeroRoot, {
  Sign: HeroSign,
  Heading: HeroHeading,
  Lead: HeroLead,
  Actions: HeroActions,
  Walk: HeroWalk,
});

/* --------------------------------------------------------------------------
   2. Who sits on our porch — haint-blue ceiling band; a guest list of seats,
      each row showing how many loan types fit that situation.
   -------------------------------------------------------------------------- */
export function PorchSeatsBand({
  heading,
  intro,
  handNote,
  situations,
}: {
  heading: ReactNode;
  intro: ReactNode;
  handNote?: ReactNode;
  situations: readonly VisitorSituation[];
}) {
  return (
    <section className="haint-ceiling border-b-2 border-ink/70 py-14 sm:py-20" aria-labelledby="porch-seats-heading">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <h2
              id="porch-seats-heading"
              className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.02] font-bold text-ink"
            >
              {heading}
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-ink/85">{intro}</p>
            {handNote ? (
              <p className="hand-note mt-6 hidden text-2xl text-primary lg:block dark:text-porch-light">{handNote}</p>
            ) : null}
            <RockingChairs className="mt-4 hidden h-auto w-52 lg:block" />
          </div>
        </div>

        <ol className="seat-list lg:col-span-8">
          {situations.map((seat, idx) => {
            const count = loans.filter(loan => loan.suits.includes(seat.id)).length;
            return (
              <li key={seat.id}>
                <SiteLink href={`/loans/?for=${seat.id}`} className="seat-row group">
                  <span aria-hidden="true" className="seat-row__number font-display">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="font-display block text-[clamp(1.35rem,2.3vw,1.85rem)] leading-tight font-bold text-ink">
                      {seat.label}
                    </span>
                    <span className="mt-1.5 block max-w-xl text-[0.98rem] leading-relaxed text-ink/80">
                      {seat.summary}
                    </span>
                  </span>
                  <span className="seat-row__go">
                    <span className="text-sm font-bold whitespace-nowrap text-ink">
                      {count} loan {count === 1 ? 'type' : 'types'}
                    </span>
                    <span aria-hidden="true" className="seat-row__arrow">
                      →
                    </span>
                  </span>
                </SiteLink>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   3. Loan types preview — 4 staggered HouseNumberPlaques on clapboard paper
   -------------------------------------------------------------------------- */
const STAGGER = ['md:mt-0', 'md:mt-7', 'md:mt-2', 'md:mt-9'];

export function FeaturedLoansSection({
  heading,
  intro,
  ctaLabel,
  loans,
}: {
  heading: ReactNode;
  intro: ReactNode;
  ctaLabel: ReactNode;
  loans: readonly LoanType[];
}) {
  return (
    <section className="py-14 sm:py-16" aria-labelledby="featured-loans-heading">
      <div className="wrap">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Loan types</p>
            <h2 id="featured-loans-heading" className="font-display mt-1 text-3xl font-bold text-ink sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-2 text-base text-muted">{intro}</p>
          </div>
          <SiteLink href="/loans/" className="button button-quiet self-start md:self-auto">
            {ctaLabel}
          </SiteLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {loans.map((loan, idx) => (
            <div key={loan.id} className={STAGGER[idx % STAGGER.length]}>
              <HouseNumberPlaque
                loanId={loan.id}
                badgeNumber={loan.minDownPaymentPercent === null ? 'Refi' : `${loan.minDownPaymentPercent}%`}
                badgeLabel={loan.minDownPaymentPercent === null ? 'equity' : 'min. down'}
                title={loan.name}
                className="h-full"
              >
                <p>{loan.summary}</p>
                <p className="mt-4 text-sm">
                  <SiteLink href={`/loans/#${loan.id}`} className="text-link">
                    Read what to know
                  </SiteLink>
                </p>
              </HouseNumberPlaque>
            </div>
          ))}
        </div>
      </div>

      <BalusterRail className="mt-14" />
    </section>
  );
}

/* --------------------------------------------------------------------------
   4. Repayment teaser — Floor band, giant Fraunces numeral + year-1 bar
   -------------------------------------------------------------------------- */
export function RepaymentTeaserBand({
  heading,
  handNote,
  ctaLabel,
}: {
  heading: ReactNode;
  handNote: ReactNode;
  ctaLabel: ReactNode;
}) {
  const payment = monthlyPayment(
    workedExample.principal,
    workedExample.annualRatePercent,
    workedExample.years,
  );
  const parts = splitPaymentParts(payment);
  const year1 = amortizationByYear(
    workedExample.principal,
    workedExample.annualRatePercent,
    workedExample.years,
  )[0];
  const year1Total = year1.interest + year1.principal;
  const interestPct = Math.round((year1.interest / year1Total) * 100);
  const principalPct = 100 - interestPct;

  return (
    <FloorboardBand ariaLabelledby="repayment-teaser-heading" className="py-14 sm:py-16">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="text-xs font-bold tracking-[0.14em] text-floor-muted uppercase">
            Worked repayment example · {formatWholeDollars(workedExample.principal)} over {workedExample.years} years at {workedExample.annualRatePercent.toFixed(2)}%
          </p>
          <h2 id="repayment-teaser-heading" className="sr-only">
            {heading}
          </h2>
          <p className="font-display mt-3 flex flex-wrap items-baseline leading-none font-bold text-floor-ink tabular">
            <span className="text-[clamp(4.4rem,12vw,9rem)] tracking-[-0.03em] text-porch-light">{parts.dollars}</span>
            <span className="text-[clamp(1.8rem,4vw,3.4rem)]">{parts.cents}</span>
            <span className="ml-2.5 text-xl font-medium text-floor-muted sm:text-2xl">a month</span>
          </p>
          <p className="mt-4 max-w-xl text-base text-floor-muted">
            In year one of this example, about{' '}
            <strong className="text-floor-ink">{formatWholeDollars(year1.interest)}</strong> goes to interest and{' '}
            <strong className="text-floor-ink">{formatWholeDollars(year1.principal)}</strong> pays down the loan balance.
          </p>
          <p className="mt-3 max-w-xl text-xs text-floor-muted/90">{REPAYMENT_DISCLAIMER}</p>
        </div>

        <div className="rounded-2xl border-2 border-floor-ink/25 bg-black/15 p-6 lg:col-span-5">
          <p className="hand-note text-2xl text-porch-light">{handNote}</p>

          {/* Slim two-colour first-year bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs font-bold text-floor-ink tabular">
              <span>Year 1 interest ({interestPct}%)</span>
              <span>Principal ({principalPct}%)</span>
            </div>
            <div
              className="mt-2 flex h-5 w-full overflow-hidden rounded-full border border-floor-ink/35"
              role="img"
              aria-label={`First year payment split: ${interestPct}% interest and ${principalPct}% principal`}
            >
              <span className="block bg-porch-light" style={{ width: `${interestPct}%` }} />
              <span className="block bg-haint" style={{ width: `${principalPct}%` }} />
            </div>
          </div>

          <div className="mt-6">
            <SiteLink href="/repayments/" className="button button-on-floor">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>
      </div>
    </FloorboardBand>
  );
}

/* --------------------------------------------------------------------------
   5. Porch steps (compact) — Drawn rising stair on clapboard paper-2
   -------------------------------------------------------------------------- */
export function HomeStepsSection({
  heading,
  intro,
  ctaLabel,
  steps,
}: {
  heading: ReactNode;
  intro: ReactNode;
  ctaLabel: ReactNode;
  steps: readonly ProcessStep[];
}) {
  return (
    <section className="clapboard-alt pt-14 sm:pt-16" aria-labelledby="home-steps-heading">
      <div className="wrap">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 id="home-steps-heading" className="font-display mt-1 text-3xl font-bold text-ink sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-2 text-base text-muted">{intro}</p>
          </div>
          <SiteLink href="/how-it-works/" className="button button-quiet self-start md:self-auto">
            {ctaLabel}
          </SiteLink>
        </div>

        <div className="mt-10">
          <PorchSteps steps={steps} variant="compact" />
        </div>
      </div>

      <BalusterRail className="mt-14" />
    </section>
  );
}

/* --------------------------------------------------------------------------
   6. Lender panel strip — Hanging KeyTags in a wrapped, gently angled row
   -------------------------------------------------------------------------- */
const STRIP_TILTS = ['-rotate-1', 'rotate-1', '-rotate-[0.8deg]', 'rotate-[0.7deg]', '-rotate-[0.5deg]', 'rotate-[1.1deg]'];

export function HomeLenderStrip({
  heading,
  intro,
  ctaLabel,
  lenders = getActiveLenders(),
}: {
  heading: ReactNode;
  intro: ReactNode;
  ctaLabel: ReactNode;
  lenders?: readonly Lender[];
}) {
  return (
    <section className="py-14 sm:py-16" aria-labelledby="lender-strip-heading">
      <div className="wrap">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Our lender panel</p>
            <h2 id="lender-strip-heading" className="font-display mt-1 text-3xl font-bold text-ink sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-2 text-base text-muted">{intro}</p>
          </div>
          <SiteLink href="/lenders/" className="button button-quiet self-start md:self-auto">
            {ctaLabel}
          </SiteLink>
        </div>

        <div className="mt-8">
          <KeyRail />
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {lenders.map((lender, idx) => (
              <li key={lender.id}>
                <KeyTag
                  name={lender.name}
                  compact
                  tiltClass={STRIP_TILTS[idx % STRIP_TILTS.length]}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   7. Meet June and Marcus — two chairs on the porch, each with a brass
      nameplate, years brokering as a big numeral and their loan specialties.
   -------------------------------------------------------------------------- */
function initials(name: string) {
  return name
    .split(/\s+/)
    .map(part => part[0])
    .join('')
    .slice(0, 2);
}

function BrokerCard({ broker, align }: { broker: BrokerProfile; align: 'left' | 'right' }) {
  const specialties = broker.specialties
    .map(id => loans.find(loan => loan.id === id))
    .filter((loan): loan is LoanType => Boolean(loan));
  return (
    <article
      className={`broker-card relative rounded-[1.75rem] border-2 border-ink/80 bg-paper p-6 shadow-[0_6px_0_rgba(42,38,34,0.16)] sm:p-8 ${
        align === 'right' ? 'lg:-rotate-[0.6deg]' : 'lg:rotate-[0.6deg]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="nameplate font-display">
            {initials(broker.name)}
          </span>
          <div>
            <h3 className="font-display text-2xl leading-tight font-bold text-ink sm:text-[1.75rem]">{broker.name}</h3>
            <p className="text-sm font-semibold text-muted">{broker.role}</p>
          </div>
        </div>
        <p className="shrink-0 text-right">
          <span className="font-display block text-5xl leading-none font-bold text-primary tabular dark:text-porch-light">
            {broker.yearsBrokering}
          </span>
          <span className="text-xs font-bold tracking-[0.1em] text-muted uppercase">years</span>
        </p>
      </div>
      <blockquote className="font-display mt-5 border-l-4 border-haint-deep pl-4 text-[1.08rem] leading-relaxed text-ink/90 italic">
        {broker.bio}
      </blockquote>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="eyebrow mr-1">Ask about</span>
        {specialties.map(loan => (
          <SiteLink key={loan.id} href={`/loans/#${loan.id}`} className="porch-chip porch-chip-sm">
            {loan.shortName}
          </SiteLink>
        ))}
      </div>
      <p className="hand-note mt-4 text-2xl text-primary dark:text-porch-light">{broker.signature}</p>
    </article>
  );
}

export function MeetBrokersBand({
  heading,
  intro,
}: {
  heading: ReactNode;
  intro: ReactNode;
}) {
  const [june, marcus] = business.brokers;
  const firstName = (name: string) => name.split(' ')[0];
  return (
    <section className="haint-ceiling border-y-2 border-ink/70 py-14 sm:py-20" aria-labelledby="brokers-heading">
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-ink/75">Two brokers, one porch</p>
          <h2 id="brokers-heading" className="font-display mt-1 text-[clamp(2.2rem,4vw,3.4rem)] leading-tight font-bold text-ink">
            {heading}
          </h2>
          <p className="mt-3 text-base text-ink/85">{intro}</p>
        </div>

        <div className="mt-10 grid items-center gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <BrokerCard broker={june} align="left" />
          </div>
          <figure className="order-first flex flex-col items-center lg:order-none lg:col-span-2">
            <RockingChairs className="h-auto w-56 lg:w-full" />
            <figcaption className="hand-note mt-1 flex w-full max-w-56 justify-between px-2 text-xl text-ink/75">
              <span>{firstName(june.name)}’s</span>
              <span>{firstName(marcus.name)}’s</span>
            </figcaption>
          </figure>
          <div className="lg:col-span-5">
            <BrokerCard broker={marcus} align="right" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   8. Visit the office — Mailbox-door address card + hours + GoogleMap
   -------------------------------------------------------------------------- */
export function VisitOfficeSection({
  heading,
  intro,
  ctaLabel,
}: {
  heading: ReactNode;
  intro: ReactNode;
  ctaLabel: ReactNode;
}) {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;
  return (
    <section className="py-14 sm:py-16" aria-labelledby="visit-office-heading">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-stretch">
        {/* Left: Address card shaped like an arched rural mailbox door */}
        <div className="flex flex-col justify-between rounded-t-[3rem] rounded-b-2xl border-2 border-ink/85 bg-paper p-6 shadow-[0_5px_0_rgba(42,38,34,0.14)] sm:p-8 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-line pb-4">
              <span className="font-display rounded-md border-2 border-ink/80 bg-haint px-3 py-1 text-lg font-bold text-ink">
                318 · Suite 210
              </span>
              <OpenBadge hours={officeHours} variant="inline" className="text-xs" />
            </div>

            <h2 id="visit-office-heading" className="font-display mt-5 text-3xl font-bold text-ink">
              {heading}
            </h2>
            <p className="mt-2 text-sm text-muted">{intro}</p>

            <address className="mt-4 space-y-2 not-italic text-sm">
              <p className="flex items-start gap-2 font-semibold text-ink">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary dark:text-porch-light" />
                <span>
                  {business.address.formatted}
                  <span className="mt-0.5 block font-normal text-muted">{business.landmark}</span>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 shrink-0 text-primary dark:text-porch-light" />
                <a href={telHref} className="text-link">
                  {business.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 shrink-0 text-primary dark:text-porch-light" />
                <a href={`mailto:${business.email}`} className="text-link break-all">
                  {business.email}
                </a>
              </p>
            </address>

            <div className="mt-6">
              <HoursTable hours={officeHours} />
              <TimeZoneNote />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
            <SiteLink href="/contact/" className="button">
              {ctaLabel}
            </SiteLink>
            <a
              href={mapDirectionsUrl(business.address.mapQuery)}
              target="_blank"
              rel="noreferrer"
              className="button button-quiet"
            >
              Directions
            </a>
          </div>
        </div>

        {/* Right: Map framed like a porch window, with a Blackwell Street postcard tucked in the corner */}
        <div className="relative flex flex-col gap-5 lg:col-span-7">
          <figure className="postcard order-first lg:absolute lg:-top-6 lg:-right-4 lg:z-10 lg:order-none lg:w-[21rem]">
            <div className="overflow-hidden rounded-md border-2 border-ink/70">
              <div className="postcard__sky">
                <DurhamSkyline className="block h-36 w-full" preserveAspectRatio="xMidYMax slice" />
              </div>
            </div>
            <figcaption className="mt-2.5 flex items-baseline justify-between gap-3">
              <span className="hand-note text-xl text-primary dark:text-porch-light">Greetings from Blackwell St.</span>
              <span className="text-[0.7rem] font-bold tracking-[0.12em] text-muted uppercase">Durham, NC</span>
            </figcaption>
          </figure>
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border-2 border-ink/85 bg-paper-2 p-2 shadow-[0_5px_0_rgba(42,38,34,0.14)]">
          <GoogleMap
            address={business.address.mapQuery}
            title="Map showing American Tobacco Campus, 318 Blackwell Street, Durham, NC"
            className="flex-1 overflow-hidden rounded-xl [&>iframe]:h-full [&>iframe]:min-h-[24rem]"
          />
          <p className="px-3 py-2.5 text-xs text-muted">
            Serving {business.serviceAreaCounties.join(', ')} in person. {business.serviceAreaNote}
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
