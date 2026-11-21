import type { ReactNode } from 'react';
import { Mailbox, SweetTeaGlass } from './art/motifs';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

function MailboxCtaSection({ children }: ContentProps) {
  return (
    <section className="wrap py-12">
      <div className="mailbox-trigger relative rounded-2xl border-2 border-ink/80 bg-haint/60 p-6 shadow-[0_5px_0_rgba(42,38,34,0.14)] sm:p-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Mailbox className="h-24 w-28" />
            <div className="max-w-xl">{children}</div>
          </div>
          <div className="flex items-center gap-2 self-start rounded-xl border-2 border-ink/30 bg-paper/85 px-4 py-2.5 md:self-center">
            <SweetTeaGlass className="h-9 w-8" />
            <span className="hand-note text-xl text-ink">No fee to talk — ever</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Heading({ children }: ContentProps) {
  return <h2 className="font-display text-2xl leading-snug font-bold text-ink sm:text-3xl">{children}</h2>;
}

function Body({ children }: ContentProps) {
  return <p className="mt-2 text-base text-ink/85">{children}</p>;
}

function Action({ children, href = '/contact/' }: { children: ReactNode; href?: string }) {
  return (
    <div className="mt-5">
      <SiteLink href={href} className="button">
        {children}
      </SiteLink>
    </div>
  );
}

export const MailboxCta = Object.assign(MailboxCtaSection, { Heading, Body, Action });
