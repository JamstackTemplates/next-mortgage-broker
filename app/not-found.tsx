import { MissingStepArt } from '../components/art/motifs';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="wrap py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <MissingStepArt className="h-auto w-full rounded-2xl border-2 border-ink/80 shadow-[0_5px_0_rgba(42,38,34,0.14)]" />

        <div className="mt-8 text-center">
          <p className="eyebrow">404 · Page not found</p>
          <h1 className="font-display mt-2 text-4xl font-bold text-ink sm:text-5xl">
            This step seems to be missing.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted">
            No harm done — step back onto solid boards using one of the risers below.
          </p>
        </div>

        {/* Three links painted on wooden stair risers */}
        <nav aria-label="Helpful pages" className="mx-auto mt-8 max-w-xl space-y-3">
          <SiteLink
            href="/"
            className="floor-planks flex items-center justify-between gap-3 rounded-xl border-2 border-ink/85 px-5 py-4 text-floor-ink no-underline shadow-[0_4px_0_rgba(42,38,34,0.18)] transition-colors hover:border-porch-light hover:no-underline sm:px-6"
          >
            <span className="font-display text-lg font-bold sm:text-xl">01 · Back to the front porch</span>
            <span className="shrink-0 text-sm font-semibold whitespace-nowrap text-porch-light">Home →</span>
          </SiteLink>
          <SiteLink
            href="/loans/"
            className="floor-planks ml-3 flex items-center justify-between gap-3 rounded-xl border-2 border-ink/85 px-5 py-4 text-floor-ink no-underline shadow-[0_4px_0_rgba(42,38,34,0.18)] transition-colors hover:border-porch-light hover:no-underline sm:ml-6 sm:px-6"
          >
            <span className="font-display text-lg font-bold sm:text-xl">02 · Compare loan types</span>
            <span className="shrink-0 text-sm font-semibold whitespace-nowrap text-porch-light">Loans →</span>
          </SiteLink>
          <SiteLink
            href="/contact/"
            className="floor-planks ml-6 flex items-center justify-between gap-3 rounded-xl border-2 border-ink/85 px-5 py-4 text-floor-ink no-underline shadow-[0_4px_0_rgba(42,38,34,0.18)] transition-colors hover:border-porch-light hover:no-underline sm:ml-12 sm:px-6"
          >
            <span className="font-display text-lg font-bold sm:text-xl">03 · Start a conversation</span>
            <span className="shrink-0 text-sm font-semibold whitespace-nowrap text-porch-light">Contact →</span>
          </SiteLink>
        </nav>
      </div>
    </section>
  );
}
