import type { Metadata } from 'next';
import { BalusterRail, FloorboardBand } from '../../components/art/dividers';
import { CutawayHouse } from '../../components/art/motifs';
import { MailboxCta } from '../../components/mailbox-cta';
import { PageHead } from '../../components/page-head';
import { RepaymentEstimator } from '../../components/repayment-estimator';
import {
  amortizationByYear,
  formatDollarsCents,
  formatWholeDollars,
  monthlyPayment,
  REPAYMENT_DISCLAIMER,
  totalInterestPaid,
  workedExample,
} from '../../content/repayments';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Repayments',
  description:
    'Understand principal, interest, taxes, insurance and PMI, walk through a worked mortgage example and explore our interactive repayment estimator.',
  alternates: { canonical: absoluteUrl('/repayments/') },
};

const PITI_PARTS = [
  {
    number: '1',
    name: 'Principal',
    metaphor: 'The foundation',
    body: 'The piece of every payment that actually shrinks the balance you borrowed. Early on it starts modest and grows steadily each year.',
  },
  {
    number: '2',
    name: 'Interest',
    metaphor: 'The walls',
    body: 'What the lender charges for the use of the money, calculated each month on whatever principal balance is still left.',
  },
  {
    number: '3',
    name: 'Property taxes',
    metaphor: 'The roof',
    body: 'Local county and city taxes (like Durham or Wake County), usually collected 1/12th at a time in an escrow account so the bill is ready when due.',
  },
  {
    number: '4',
    name: 'Homeowners insurance',
    metaphor: 'The fence',
    body: 'Coverage protecting the house against fire, storms and other hazards. Like taxes, it is normally bundled into your monthly escrow payment.',
  },
  {
    number: '5',
    name: 'Mortgage insurance (PMI / MIP)',
    metaphor: 'The temporary scaffold',
    body: 'An extra monthly fee on many loans when you put less than 20% down. On conventional loans it comes off once your equity reaches 20%–22%.',
  },
] as const;

const WAYS_TO_PAY_LESS = [
  {
    title: 'Put a little more down if you comfortably can',
    body: 'A larger down payment trims the amount you borrow from day one — and reaching 20% down on a conventional loan skips monthly private mortgage insurance altogether.',
  },
  {
    title: 'Consider a shorter loan term',
    body: 'Moving from 30 years to 20 or 15 raises the monthly payment, but cuts tens or hundreds of thousands of dollars in lifetime interest.',
  },
  {
    title: 'Add occasional extra principal payments',
    body: 'Even one extra principal-only payment a year — or rounding up your monthly bill — shaves years off the back end of a mortgage with no prepayment penalty on standard home loans.',
  },
  {
    title: 'Shop more than one lender before you lock',
    body: 'Rates and origination fees vary surprisingly widely from bank to bank on the exact same day. Comparing our panel side by side is the whole reason a broker exists.',
  },
] as const;

export default function RepaymentsPage() {
  const { principal, annualRatePercent, years, comparisonYears } = workedExample;
  const payment30 = monthlyPayment(principal, annualRatePercent, years);
  const interest30 = totalInterestPaid(principal, annualRatePercent, years);
  const year1 = amortizationByYear(principal, annualRatePercent, years)[0];
  const payment15 = monthlyPayment(principal, annualRatePercent, comparisonYears);
  const interest15 = totalInterestPaid(principal, annualRatePercent, comparisonYears);
  const interestSaved = Math.max(0, interest30 - interest15);
  const ratio15 = Math.max(24, Math.round((interest15 / (interest30 || 1)) * 100));

  return (
    <>
      <PageHead eyebrow="Repayment explainer" title="See what a monthly payment really looks like" motif="tea">
        <p>
          Before you look at houses, it helps to see how principal, interest and time actually work
          together — with real numbers instead of fine print.
        </p>
      </PageHead>

      {/* Section 2: What's in a monthly payment (CutawayHouse + keyed side list) */}
      <section className="wrap py-10 sm:py-14" aria-labelledby="piti-heading">
        <div className="max-w-2xl">
          <p className="eyebrow">PITI + PMI</p>
          <h2 id="piti-heading" className="font-display mt-1 text-3xl font-bold text-ink sm:text-4xl">
            What’s in a monthly payment
          </h2>
          <p className="mt-2 text-base text-muted">
            Most monthly mortgage bills hold four pieces — sometimes five. Think of them like the
            parts of the house itself.
          </p>
        </div>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <CutawayHouse className="h-auto w-full rounded-2xl border-2 border-ink/75 shadow-[0_5px_0_rgba(42,38,34,0.14)]" />
          </div>
          <ol className="space-y-4 lg:col-span-6">
            {PITI_PARTS.map(item => (
              <li
                key={item.name}
                className="flex gap-4 rounded-xl border-2 border-line bg-paper p-4"
              >
                <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-ink/80 bg-haint text-lg font-bold text-ink tabular">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {item.name}{' '}
                    <span className="hand-note ml-1 text-xl font-normal text-primary dark:text-porch-light">
                      — {item.metaphor}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BalusterRail />

      {/* Section 3: Worked example as static recipe-card notepad */}
      <section className="clapboard-alt py-12 sm:py-16" aria-labelledby="worked-example-heading">
        <div className="wrap">
          <div className="mx-auto max-w-4xl rounded-2xl border-2 border-ink/85 bg-paper p-6 shadow-[0_6px_0_rgba(42,38,34,0.16)] sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-dashed border-line pb-5">
              <div>
                <p className="eyebrow">Worked example</p>
                <h2 id="worked-example-heading" className="font-display mt-1 text-3xl font-bold text-ink">
                  A {formatWholeDollars(principal)} home loan, spelled out
                </h2>
              </div>
              <span className="hand-note -rotate-2 rounded-lg border-2 border-ink/70 bg-porch-light px-3.5 py-1 text-2xl text-[#2A2622]">
                That’s the one!
              </span>
            </div>

            <div className="mt-6 grid gap-8 md:grid-cols-12">
              <div className="space-y-4 md:col-span-6">
                <h3 className="font-display text-lg font-bold text-ink">Starting ingredients</h3>
                <dl className="divide-y divide-line rounded-xl border border-line bg-paper-2/70 px-4 text-sm tabular">
                  <div className="flex justify-between py-2.5">
                    <dt className="text-muted">Loan amount</dt>
                    <dd className="font-bold text-ink">{formatWholeDollars(principal)}</dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="text-muted">Illustrative rate (not a quote)</dt>
                    <dd className="font-bold text-ink">{annualRatePercent.toFixed(2)}%</dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="text-muted">Repayment term</dt>
                    <dd className="font-bold text-ink">{years} years ({years * 12} payments)</dd>
                  </div>
                </dl>
                <p className="text-sm leading-relaxed text-muted">
                  <strong className="text-ink">How the math works in plain words:</strong> every
                  month, the lender multiplies your remaining balance by one-twelfth of the annual
                  rate. That piece is interest; the rest of your level payment chips away at
                  principal. Because the balance shrinks a tiny bit each month, next month’s
                  interest is slightly smaller and principal grows.
                </p>
              </div>

              <div className="flex flex-col justify-between rounded-xl border-2 border-ink/75 bg-haint/45 p-5 md:col-span-6">
                <div>
                  <p className="eyebrow text-ink/80">Monthly principal &amp; interest</p>
                  <p className="font-display mt-1 text-4xl font-bold text-ink sm:text-5xl tabular">
                    {formatDollarsCents(payment30)}
                  </p>
                  <dl className="mt-4 space-y-2 border-t border-ink/20 pt-4 text-sm tabular">
                    <div className="flex justify-between">
                      <dt className="text-ink/85">Total interest over {years} years</dt>
                      <dd className="font-bold text-ink">about {formatWholeDollars(interest30)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink/85">First-year interest</dt>
                      <dd className="font-bold text-ink">about {formatWholeDollars(year1.interest)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink/85">First-year principal</dt>
                      <dd className="font-bold text-ink">about {formatWholeDollars(year1.principal)}</dd>
                    </div>
                  </dl>
                </div>
                <p className="mt-4 border-t border-ink/20 pt-3 text-xs leading-relaxed text-ink/85">
                  {REPAYMENT_DISCLAIMER}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Interactive payment estimator on a full-bleed floor band */}
      <FloorboardBand ariaLabelledby="estimator-heading" className="py-14 sm:py-16">
        <div className="wrap">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-bold tracking-[0.14em] text-floor-muted uppercase">
              Interactive estimator
            </p>
            <h2 id="estimator-heading" className="font-display mt-1 text-3xl font-bold text-floor-ink sm:text-4xl">
              Try your own numbers on the porch
            </h2>
            <p className="mt-2 text-base text-floor-muted">
              Move the loan amount, illustrative rate or term to see how the monthly payment and
              yearly mix respond.
            </p>
          </div>

          <RepaymentEstimator />
        </div>
      </FloorboardBand>

      {/* Section 5: Where the money goes over time (30-year vs 15-year porch columns) */}
      <section className="wrap py-14 sm:py-16" aria-labelledby="over-time-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow">Where the money goes over time</p>
            <h2 id="over-time-heading" className="font-display mt-1 text-3xl font-bold text-ink sm:text-4xl">
              {years} years compared with {comparisonYears}
            </h2>
            <p className="mt-3 text-base text-muted">
              In year one of a {years}-year loan at {annualRatePercent.toFixed(2)}%, about{' '}
              <strong className="text-ink">{formatWholeDollars(year1.interest)}</strong> pays
              interest while <strong className="text-ink">{formatWholeDollars(year1.principal)}</strong>{' '}
              reduces principal. Shortening the term to {comparisonYears} years raises the monthly
              bill, yet slices total interest by roughly{' '}
              <strong className="text-ink">{formatWholeDollars(interestSaved)}</strong>.
            </p>
            <p className="hand-note mt-4 text-2xl text-primary dark:text-porch-light">
              Shorter column = far less interest paid over the life of the loan
            </p>
          </div>

          {/* Two proportional white porch columns comparing total interest */}
          <div className="rounded-2xl border-2 border-ink/80 bg-paper-2 p-6 sm:p-8 lg:col-span-7">
            <div className="grid grid-cols-2 items-end gap-6 sm:gap-10">
              {/* 30-year porch column */}
              <div className="flex flex-col items-center text-center">
                <span className="font-display text-2xl font-bold text-ink sm:text-3xl tabular">
                  {formatWholeDollars(interest30)}
                </span>
                <span className="text-xs font-semibold text-muted uppercase">Total interest</span>
                <div className="mt-3 flex h-56 w-24 flex-col justify-end sm:w-28" aria-hidden="true">
                  <div className="h-3 w-full rounded-t-sm border-2 border-ink/80 bg-trim" />
                  <div className="mx-2 flex-1 border-x-2 border-ink/80 bg-trim bg-[repeating-linear-gradient(90deg,transparent_0,transparent_12px,rgba(42,38,34,0.12)_12px,rgba(42,38,34,0.12)_14px)]" />
                  <div className="h-4 w-full rounded-b-sm border-2 border-ink/80 bg-trim" />
                </div>
                <p className="font-display mt-4 text-xl font-bold text-ink">{years}-year fixed</p>
                <p className="text-sm font-semibold text-muted tabular">
                  {formatDollarsCents(payment30)} / mo
                </p>
              </div>

              {/* 15-year porch column */}
              <div className="flex flex-col items-center text-center">
                <span className="font-display text-2xl font-bold text-primary dark:text-porch-light sm:text-3xl tabular">
                  {formatWholeDollars(interest15)}
                </span>
                <span className="text-xs font-semibold text-muted uppercase">Total interest</span>
                <div className="mt-3 flex h-56 w-24 flex-col justify-end sm:w-28" aria-hidden="true">
                  <div
                    className="flex flex-col justify-end"
                    style={{ height: `${ratio15}%` }}
                  >
                    <div className="h-3 w-full rounded-t-sm border-2 border-ink/80 bg-haint" />
                    <div className="mx-2 flex-1 border-x-2 border-ink/80 bg-haint bg-[repeating-linear-gradient(90deg,transparent_0,transparent_12px,rgba(42,38,34,0.12)_12px,rgba(42,38,34,0.12)_14px)]" />
                    <div className="h-4 w-full rounded-b-sm border-2 border-ink/80 bg-haint" />
                  </div>
                </div>
                <p className="font-display mt-4 text-xl font-bold text-ink">{comparisonYears}-year fixed</p>
                <p className="text-sm font-semibold text-muted tabular">
                  {formatDollarsCents(payment15)} / mo
                </p>
              </div>
            </div>
            <p className="mt-6 border-t border-line pt-3 text-center text-xs text-muted">
              Both columns compare {formatWholeDollars(principal)} at an illustrative {annualRatePercent.toFixed(2)}% (principal &amp; interest only).
            </p>
          </div>
        </div>
      </section>

      <BalusterRail />

      {/* Section 6: Ways to pay less — numbered list along a railing */}
      <section className="clapboard-alt py-14 sm:py-16" aria-labelledby="ways-less-heading">
        <div className="wrap">
          <div className="max-w-2xl">
            <p className="eyebrow">Practical levers</p>
            <h2 id="ways-less-heading" className="font-display mt-1 text-3xl font-bold text-ink sm:text-4xl">
              Four honest ways to pay less
            </h2>
          </div>

          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {WAYS_TO_PAY_LESS.map((way, idx) => (
              <li
                key={way.title}
                className="relative rounded-2xl border-2 border-ink/75 bg-paper p-6 pl-16 shadow-[0_4px_0_rgba(42,38,34,0.12)]"
              >
                <span className="font-display absolute top-5 left-5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink/80 bg-porch-light text-lg font-bold text-[#2A2622] tabular">
                  {idx + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-ink">{way.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{way.body}</p>
              </li>
            ))}
          </ol>

          <p className="mt-8 rounded-xl border border-line bg-paper p-4 text-xs leading-relaxed text-muted">
            {REPAYMENT_DISCLAIMER}
          </p>
        </div>
      </section>

      <MailboxCta>
        <MailboxCta.Heading>Want real numbers for a house you have your eye on?</MailboxCta.Heading>
        <MailboxCta.Body>
          Send us a quick note with a rough price range and we’ll estimate taxes, insurance and
          lender options for Durham or anywhere in North Carolina.
        </MailboxCta.Body>
        <MailboxCta.Action>Start a conversation</MailboxCta.Action>
      </MailboxCta>
    </>
  );
}
