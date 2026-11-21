import type { Metadata } from 'next';
import { BalusterRail } from '../../components/art/dividers';
import { ShieldIcon } from '../../components/art/motifs';
import { LoansExplorer } from '../../components/loans-explorer';
import { MailboxCta } from '../../components/mailbox-cta';
import { PageHead } from '../../components/page-head';
import { loans } from '../../content/loans';
import { situations } from '../../content/situations';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Loan types',
  description:
    'Compare conventional, FHA, VA, USDA, jumbo, ARM, bank-statement and refinance home loans in plain English with Front Porch Home Loans.',
  alternates: { canonical: absoluteUrl('/loans/') },
};

export default function LoansPage() {
  return (
    <>
      <PageHead eyebrow="Home loans" title="Every loan type, explained plainly" motif="house">
        <p>
          Mortgage menus are full of acronyms. Here is what each loan actually does, who it suits
          best and what to watch out for before you borrow.
        </p>
      </PageHead>

      <LoansExplorer loans={loans} situations={situations} />

      <BalusterRail />

      {/* Note band on lender & borrower eligibility — no rates or approval promises */}
      <section className="haint-ceiling border-b-2 border-ink/50 py-10" aria-labelledby="loan-note-heading">
        <div className="wrap flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="rounded-xl border-2 border-ink/75 bg-paper p-3 text-primary dark:text-porch-light">
            <ShieldIcon className="h-7 w-7" />
          </div>
          <div className="max-w-3xl">
            <h2 id="loan-note-heading" className="font-display text-2xl font-bold text-ink">
              A quick note on rates and eligibility
            </h2>
            <p className="mt-2 text-base text-ink/90">
              Every borrower and property is different. Interest rates, fees, down-payment rules and
              program eligibility depend on the lender, the home and your own financial picture.
              Nothing on this page is a rate quote, commitment to lend or guarantee of approval —
              when you’re ready, we’ll compare real written Loan Estimates side by side.
            </p>
          </div>
        </div>
      </section>

      <MailboxCta>
        <MailboxCta.Heading>Not sure which door fits your move?</MailboxCta.Heading>
        <MailboxCta.Body>
          Tell June or Marcus a little about what you’re hoping to do and we’ll walk through two or
          three realistic paths together.
        </MailboxCta.Body>
        <MailboxCta.Action>Start a conversation</MailboxCta.Action>
      </MailboxCta>
    </>
  );
}
