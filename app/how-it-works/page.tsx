import type { Metadata } from 'next';
import { BalusterRail } from '../../components/art/dividers';
import {
  CheckIcon,
  DocumentIcon,
  PaidFlowDiagram,
  RockingChairs,
  SweetTeaGlass,
} from '../../components/art/motifs';
import { PorchSteps } from '../../components/art/porch-steps';
import { MailboxCta } from '../../components/mailbox-cta';
import { PageHead } from '../../components/page-head';
import { faqItems } from '../../content/faq';
import { documentChecklist, processSteps } from '../../content/process';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'Walk up all six porch steps from a first chat to closing day, see what documents to gather, learn how a mortgage broker is paid and read our FAQ.',
  alternates: { canonical: absoluteUrl('/how-it-works/') },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHead eyebrow="Our process" title="Six porch steps to the front door" motif="steps">
        <p>
          Buying or refinancing shouldn’t feel like guessing in the dark. Here is every step, what
          you handle, what we handle and how we’re paid.
        </p>
      </PageHead>

      {/* Section 2: Full PorchSteps with You do / We do */}
      <section className="wrap py-10 sm:py-14" aria-labelledby="full-steps-heading">
        <h2 id="full-steps-heading" className="sr-only">
          The six steps from porch chat to closing day
        </h2>
        <PorchSteps steps={processSteps} variant="full" />
      </section>

      <BalusterRail />

      {/* Section 3: What you'll need — clipboard checklist hung on a brass nail */}
      <section className="clapboard-alt py-14 sm:py-16" aria-labelledby="checklist-heading">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            {/* Brass hanging nail & clipboard clip */}
            <div className="flex flex-col items-center" aria-hidden="true">
              <span className="h-4 w-4 rounded-full border-2 border-ink/80 bg-brass" />
              <div className="-mt-1 h-7 w-32 rounded-t-xl border-2 border-b-0 border-ink/80 bg-brass/90" />
            </div>

            <div className="rounded-2xl border-2 border-ink/85 bg-paper p-6 shadow-[0_6px_0_rgba(42,38,34,0.16)] sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-line pb-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg border-2 border-ink/75 bg-haint p-2 text-ink">
                    <DocumentIcon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="eyebrow">Document checklist</p>
                    <h2 id="checklist-heading" className="font-display text-3xl font-bold text-ink">
                      What you’ll need when you’re ready
                    </h2>
                  </div>
                </div>
                <span className="hand-note text-xl text-primary dark:text-porch-light">
                  Not needed for our first chat!
                </span>
              </div>

              <div className="mt-7 grid gap-6 md:grid-cols-2">
                {documentChecklist.map(group => (
                  <div key={group.category} className="rounded-xl border border-line bg-paper-2/65 p-5">
                    <h3 className="font-display text-lg font-bold text-ink">{group.category}</h3>
                    <ul className="mt-3 space-y-2.5 text-sm text-muted">
                      {group.items.map(item => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: How we're paid — full-bleed haint band with flow diagram */}
      <section className="haint-ceiling border-y-2 border-ink/70 py-14 sm:py-16" aria-labelledby="how-paid-heading">
        <div className="wrap">
          <div className="max-w-2xl">
            <p className="eyebrow text-ink/80">Plain dealing</p>
            <h2 id="how-paid-heading" className="font-display mt-1 text-3xl font-bold text-ink sm:text-4xl">
              How we’re paid
            </h2>
            <p className="mt-2 text-base text-ink/90">
              When your loan closes, the lender pays our broker compensation. The exact dollar
              amount appears clearly on your official Loan Estimate before you agree to move
              forward — and there is never any charge to sit down and talk through your options.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-ink/75 bg-paper/90 p-5 sm:p-7">
            <PaidFlowDiagram className="mx-auto h-auto w-full max-w-3xl" />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <SweetTeaGlass className="h-9 w-8" />
            <p className="hand-note text-2xl text-ink">
              No consultation fee, no upfront retainers, and no obligation to borrow.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ — native <details> accordion beside RockingChairs */}
      <section className="wrap py-14 sm:py-16" aria-labelledby="faq-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">Common questions</p>
            <h2 id="faq-heading" className="font-display mt-1 text-3xl font-bold text-ink sm:text-4xl">
              Questions people ask on the porch
            </h2>
            <p className="mt-3 text-base text-muted">
              No question is too basic. If yours isn’t listed here, drop us a line and we’ll answer
              it straight.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <RockingChairs className="h-auto w-60" />
            </div>
          </div>

          <div className="porch-faq space-y-3 lg:col-span-8">
            {faqItems.map(item => (
              <details key={item.id} id={item.id}>
                <summary className="text-ink hover:bg-paper-2/70">{item.question}</summary>
                <div className="border-t border-line px-5 py-4 text-[0.96rem] leading-relaxed text-muted">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <MailboxCta>
        <MailboxCta.Heading>Ready for Step 1 — a 30-minute porch chat?</MailboxCta.Heading>
        <MailboxCta.Body>
          Tell us where you are in your search and we’ll talk through realistic next steps at your
          pace.
        </MailboxCta.Body>
        <MailboxCta.Action>Start a conversation</MailboxCta.Action>
      </MailboxCta>
    </>
  );
}
