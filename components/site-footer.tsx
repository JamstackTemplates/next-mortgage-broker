import { business } from '../content/business';
import { officeHours } from '../content/hours';
import { DurhamSkyline } from './art/durham-skyline';
import { Lantern } from './art/lantern';
import { MailIcon, PhoneIcon, PinIcon } from './art/motifs';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/loans/', label: 'Loans' },
  { href: '/repayments/', label: 'Repayments' },
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/lenders/', label: 'Lenders' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteFooter() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="mt-12">
      <DurhamSkyline
        tone="silhouette"
        className="-mb-px block h-[max(4rem,min(15.28vw,13.75rem))] w-full text-floor no-print"
        preserveAspectRatio="xMidYMax slice"
      />
      <div className="floor-planks py-12 text-floor-ink">
        <div className="wrap grid gap-10 md:grid-cols-12">
          {/* Brand, lantern & address */}
          <div className="md:col-span-5">
            <div className="flex items-start gap-3">
              <Lantern lit chain={false} className="mt-0.5 h-12 w-10 shrink-0 no-print" />
              <div>
                <p className="font-display text-2xl leading-tight font-bold text-floor-ink">
                  {business.name}
                </p>
                <p className="hand-note mt-1 text-xl text-porch-light">
                  Durham’s neighbourhood mortgage brokers
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5 text-sm text-floor-muted">
              <p className="flex items-start gap-2">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-porch-light" />
                <span>
                  <strong className="font-semibold text-floor-ink">{business.address.formatted}</strong>
                  <br />
                  {business.landmark}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 shrink-0 text-porch-light" />
                <a href={telHref} className="font-semibold text-floor-ink underline">
                  {business.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MailIcon className="h-4 w-4 shrink-0 text-porch-light" />
                <a href={`mailto:${business.email}`} className="break-all font-semibold text-floor-ink underline">
                  {business.email}
                </a>
              </p>
            </div>
          </div>

          {/* Office hours & live porch light */}
          <div className="md:col-span-4">
            <h2 className="font-display text-lg font-bold text-floor-ink">Office hours</h2>
            <p className="mt-2 text-sm text-floor-muted">
              Monday – Friday: 9:00 am – 5:30 pm
              <br />
              Saturday: 10:00 am – 1:00 pm
              <br />
              Sunday: Closed
            </p>
            <div className="mt-3">
              <OpenBadge hours={officeHours} variant="floor" />
            </div>
            <p className="mt-3 text-xs text-floor-muted">
              Serving {business.serviceAreaCounties.join(', ')}. {business.serviceAreaNote}
            </p>
          </div>

          {/* Navigation repeat */}
          <div className="md:col-span-3">
            <h2 className="font-display text-lg font-bold text-floor-ink">Around the porch</h2>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-1">
              {footerLinks.map(item => (
                <li key={item.href}>
                  <SiteLink href={item.href} className="font-medium text-floor-ink hover:text-porch-light">
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Licensing line (words only, no HUD logo) & credit */}
        <div className="wrap mt-10 border-t border-floor-ink/20 pt-6 text-xs leading-relaxed text-floor-muted">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl">{business.licensingLine}</p>
            <span className="shrink-0 no-print">
              Template for{' '}
              <a
                className="font-semibold text-floor-ink underline hover:text-porch-light"
                href="https://jamstacks.net"
              >
                jamstacks.net
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
