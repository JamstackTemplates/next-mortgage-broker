import { DarkModeToggle } from 'jamstacks';
import { officeHours } from '../content/hours';
import { Lantern } from './art/lantern';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

const navLinks = [
  { href: '/loans/', label: 'Loans' },
  { href: '/repayments/', label: 'Repayments' },
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/lenders/', label: 'Lenders' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  return (
    <header className="haint-ceiling relative border-b-2 border-ink/75">
      <div className="wrap flex min-h-20 items-center justify-between gap-3 py-3">
        {/* Wordmark: Fraunces "Front Porch" + Figtree small-caps "Home Loans" */}
        <SiteLink
          href="/"
          className="group flex items-center gap-2.5 no-underline hover:no-underline"
        >
          <span className="site-header-art hidden sm:inline-flex">
            <Lantern lit chain={false} className="h-10 w-8" />
          </span>
          <span className="flex flex-col">
            <span className="font-display text-2xl leading-none font-bold tracking-tight text-ink sm:text-[1.65rem]">
              Front Porch
            </span>
            <span className="mt-0.5 text-[0.72rem] font-bold tracking-[0.2em] text-ink/80 uppercase">
              Home Loans
            </span>
          </span>
        </SiteLink>

        {/* Desktop navigation + porch-light status + dark mode toggle + hanging lantern */}
        <div className="hidden items-center gap-4 lg:flex">
          <nav aria-label="Main" className="flex items-center gap-5 text-[0.95rem] font-semibold text-ink">
            {navLinks.map(item => (
              <SiteLink
                key={item.href}
                href={item.href}
                markCurrent="page"
                className="py-1 text-ink transition-colors hover:text-primary dark:hover:text-porch-light"
              >
                {item.label}
              </SiteLink>
            ))}
          </nav>

          <OpenBadge hours={officeHours} variant="chip" className="hidden xl:inline-flex" />

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <span className="site-header-art -my-3 hidden xl:inline-flex" aria-hidden="true">
              <Lantern lit chain className="h-12 w-10" />
            </span>
          </div>
        </div>

        {/* Mobile / tablet controls: toggle + native <details> screen-door disclosure menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <DarkModeToggle />
          <details className="screen-door-menu relative">
            <summary
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border-2 border-ink/80 bg-primary px-3.5 py-2 text-sm font-semibold text-primary-ink shadow-[0_2px_0_rgba(42,38,34,0.2)]"
              aria-label="Open navigation menu"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M3 5h14M3 10h14M3 15h14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              <span>Menu</span>
            </summary>

            {/* Swinging screen-door panel */}
            <div className="clapboard absolute top-full right-0 z-50 mt-2.5 w-[min(19rem,calc(100vw-2rem))] rounded-xl border-4 border-primary bg-paper p-4 shadow-[0_14px_30px_rgba(42,38,34,0.28)]">
              <div className="mb-3 flex items-center justify-between border-b border-line pb-2.5">
                <span className="hand-note text-lg text-primary dark:text-porch-light">
                  Come on in
                </span>
                <Lantern lit chain={false} className="h-7 w-6" />
              </div>

              <nav aria-label="Mobile" className="flex flex-col gap-1">
                <SiteLink
                  href="/"
                  markCurrent="page"
                  className="rounded-md px-3 py-2.5 text-base font-semibold text-ink hover:bg-haint/45 hover:no-underline"
                >
                  Home
                </SiteLink>
                {navLinks.map(item => (
                  <SiteLink
                    key={item.href}
                    href={item.href}
                    markCurrent="page"
                    className="rounded-md px-3 py-2.5 text-base font-semibold text-ink hover:bg-haint/45 hover:no-underline"
                  >
                    {item.label}
                  </SiteLink>
                ))}
              </nav>

              <div className="mt-3 border-t border-line pt-3">
                <OpenBadge hours={officeHours} variant="inline" />
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Compact porch-light bar on tablet widths where XL chip is hidden */}
      <div className="border-t border-ink/15 bg-paper/75 py-1.5 xl:hidden">
        <div className="wrap flex items-center justify-between gap-2 text-xs">
          <OpenBadge hours={officeHours} variant="inline" className="text-xs" />
          <span className="hidden text-muted sm:inline">Durham, NC</span>
        </div>
      </div>
    </header>
  );
}
