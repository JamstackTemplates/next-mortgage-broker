import type { ReactNode } from 'react';
import { HouseMotif } from './art/house-plaque';
import { DurhamSkyline } from './art/durham-skyline';
import { KeyIcon, Mailbox, StepsIcon, SweetTeaGlass } from './art/motifs';

export type PageHeadMotif = 'house' | 'tea' | 'steps' | 'key' | 'mailbox';

function MotifMark({ motif }: { motif: PageHeadMotif }) {
  switch (motif) {
    case 'house':
      return <HouseMotif loanId="conventional-fixed" className="h-14 w-16" />;
    case 'tea':
      return <SweetTeaGlass className="h-14 w-12" />;
    case 'steps':
      return <StepsIcon className="h-12 w-12" />;
    case 'key':
      return <KeyIcon className="h-12 w-12" />;
    case 'mailbox':
      return <Mailbox raised className="h-14 w-16" />;
  }
}

/**
 * Inner-page heading: a smaller cut of the home hero. Sky gradient, the Durham horizon along the
 * bottom edge, a nailed-up porch sign for the eyebrow and a brass-ringed medallion for the motif.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  motif = 'house',
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  motif?: PageHeadMotif;
}) {
  return (
    <header className="page-head relative isolate overflow-hidden border-b-2 border-ink/70">
      <div aria-hidden="true" className="hero-sky absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 opacity-75">
        <DurhamSkyline
          className="block h-[clamp(4.5rem,9vw,8rem)] w-full"
          preserveAspectRatio="xMaxYMax meet"
        />
        <div className="hero-lawn h-2.5" />
      </div>

      <div className="wrap grid items-end gap-6 pt-8 pb-[clamp(4.75rem,11vw,9rem)] sm:pt-12 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <p className="porch-sign">
            <span aria-hidden="true" className="porch-sign__nail" />
            <span>{eyebrow}</span>
            <span aria-hidden="true" className="porch-sign__nail" />
          </p>
          <h1
            id={id}
            className="font-display mt-5 max-w-[18ch] text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1] font-bold tracking-[-0.025em] text-ink"
          >
            {title}
          </h1>
          {children ? (
            <div className="mt-4 max-w-(--measure) text-[clamp(1.02rem,1.4vw,1.2rem)] leading-relaxed text-ink/80">
              {children}
            </div>
          ) : null}
        </div>
        <div className="hidden justify-end lg:col-span-3 lg:flex">
          <div className="motif-medallion" aria-hidden="true">
            <MotifMark motif={motif} />
          </div>
        </div>
      </div>
    </header>
  );
}
