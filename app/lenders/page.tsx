import type { Metadata } from 'next';
import { BalusterRail } from '../../components/art/dividers';
import { ShieldIcon } from '../../components/art/motifs';
import { LendersPanel } from '../../components/lenders-panel';
import { MailboxCta } from '../../components/mailbox-cta';
import { PageHead } from '../../components/page-head';
import { getActiveLenders, lenderCountWord } from '../../content/lenders';
import { loans } from '../../content/loans';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Lenders',
  description:
    'Browse the Front Porch Home Loans lender panel — local credit unions, regional banks and specialist non-bank lenders compared through one conversation.',
  alternates: { canonical: absoluteUrl('/lenders/') },
};

export default function LendersPage() {
  const activeLenders = getActiveLenders();
  const countWordLower = lenderCountWord(activeLenders.length);

  return (
    <>
      <PageHead eyebrow="Our lender panel" title="One broker, a whole rail of keys" motif="key">
        <p>
          Walk into a single bank and you only see that bank’s loans. Sit on our porch and we compare{' '}
          {countWordLower} different lenders from one application.
        </p>
      </PageHead>

      {/* Why a panel: asymmetric split with giant Fraunces dynamic count */}
      <section className="wrap py-10 sm:py-12" aria-labelledby="why-panel-heading">
        <div className="grid items-center gap-8 rounded-2xl border-2 border-ink/80 bg-paper p-6 shadow-[0_5px_0_rgba(42,38,34,0.14)] sm:p-9 lg:grid-cols-12">
          <div className="flex items-baseline gap-4 lg:col-span-4">
            <span className="font-display text-[clamp(4.5rem,10vw,7.5rem)] leading-none font-bold text-primary dark:text-porch-light tabular">
              {activeLenders.length}
            </span>
            <div>
              <span className="font-display block text-2xl font-bold text-ink">lenders</span>
              <span className="hand-note text-xl text-muted">one conversation</span>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2 id="why-panel-heading" className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Why a panel matters
            </h2>
            <p className="mt-2.5 text-base leading-relaxed text-muted">
              Credit unions, regional banks and specialist non-bank lenders each shine at different
              things — one may have sharper VA guidelines, another lower closing fees for Durham
              members, and another flexible bank-statement underwriting for self-employed owners.
              You fill out one application with us, and we put the best-fitting options on the table
              together.
            </p>
          </div>
        </div>
      </section>

      {/* Filterable hanging KeyTag rails grouped by institution kind */}
      <LendersPanel lenders={activeLenders} loans={loans} />

      <BalusterRail />

      {/* Independence note */}
      <section className="haint-ceiling border-b-2 border-ink/50 py-10" aria-labelledby="independence-heading">
        <div className="wrap flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="rounded-xl border-2 border-ink/75 bg-paper p-3 text-primary dark:text-porch-light">
            <ShieldIcon className="h-7 w-7" />
          </div>
          <div className="max-w-3xl">
            <h2 id="independence-heading" className="font-display text-2xl font-bold text-ink">
              We’re not tied to any lender and we’ll tell you why we suggest one.
            </h2>
            <p className="mt-1.5 text-sm text-ink/85">
              Note: All lender names listed above are fictitious sample entries created for the
              Front Porch Home Loans Jamstacks gallery template.
            </p>
          </div>
        </div>
      </section>

      <MailboxCta>
        <MailboxCta.Heading>Want to see which lenders fit your loan?</MailboxCta.Heading>
        <MailboxCta.Body>
          Tell us what you’re buying or refinancing and we’ll walk through the strengths and trade-offs
          of the lenders suited to your situation.
        </MailboxCta.Body>
        <MailboxCta.Action>Start a conversation</MailboxCta.Action>
      </MailboxCta>
    </>
  );
}
