import type { Metadata } from 'next';
import { BalusterRail } from '../../components/art/dividers';
import { MailIcon, Mailbox, PhoneIcon, PinIcon, ShieldIcon, SweetTeaGlass } from '../../components/art/motifs';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { HoursTable, OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business } from '../../content/business';
import { officeHours } from '../../content/hours';
import { mapDirectionsUrl } from '../../lib/maps';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <>
      <PageHead eyebrow="Drop us a line" title={business.enquiries.title} motif="mailbox">
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap grid gap-10 py-8 lg:grid-cols-12 lg:items-start">
        {/* Left: Hosted Jamstacks support form or visible email fallback on a clapboard panel */}
        <section aria-label="Enquiry form" className="lg:col-span-7">
          <div className="rounded-2xl border-2 border-ink/85 bg-paper p-6 shadow-[0_5px_0_rgba(42,38,34,0.14)] sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-ink">Send an enquiry</h2>
                <p className="mt-1 text-sm text-muted">{business.enquiries.replyNote}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <SweetTeaGlass className="h-8 w-7" />
                <span className="hand-note text-lg text-primary dark:text-porch-light">
                  No fee to talk
                </span>
              </div>
            </div>

            {hosted ? (
              <JamstacksSupportForm
                siteId={site.jamstacksSite}
                embedUrl={site.jamstacksEmbedUrl}
                email={business.email}
              />
            ) : (
              <div className="rounded-xl border-2 border-line bg-paper-2/80 p-6">
                <h3 className="font-display text-xl font-bold text-ink">Write to us directly</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Our online enquiry form isn’t connected on this preview. Send your note straight
                  to{' '}
                  <a className="text-link break-all" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>{' '}
                  or call{' '}
                  <a className="text-link" href={telHref}>
                    {business.phoneDisplay}
                  </a>{' '}
                  — it lands in the exact same inbox.
                </p>
                <p className="mt-3 text-sm text-muted">{business.enquiries.replyNote}</p>
              </div>
            )}

            <p className="mt-5 flex items-start gap-2 rounded-lg border border-line bg-paper-2/70 p-3.5 text-xs leading-relaxed text-muted">
              <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary dark:text-porch-light" />
              <span>
                <strong className="text-ink">Privacy reminder:</strong>{' '}
                {business.enquiries.privacyWarning} Messages sent here are general enquiries only
                and do not constitute a mortgage application, pre-approval, rate lock or confirmed
                appointment.
              </span>
            </p>
          </div>
        </section>

        {/* Right: Handwritten "Useful to include" note card + email/mailbox + phone + address + hours */}
        <aside aria-label="Contact details" className="space-y-6 lg:col-span-5">
          {/* Handwritten note card: Useful to include */}
          <div className="rounded-2xl border-2 border-ink/80 bg-haint/45 p-6 shadow-[0_4px_0_rgba(42,38,34,0.12)]">
            <h2 className="hand-note text-3xl text-ink">Useful to include in your note</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink/90">
              {business.enquiries.usefulToInclude.map(tip => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <p className="mt-4 border-t border-ink/20 pt-3 text-xs font-semibold text-ink">
              {business.enquiries.privacyWarning}
            </p>
          </div>

          {/* Direct contact card with interactive Mailbox (flag rises on email hover/focus) */}
          <div className="mailbox-trigger rounded-2xl border-2 border-ink/80 bg-paper p-6 shadow-[0_4px_0_rgba(42,38,34,0.12)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-ink">Email &amp; phone</h2>
                <p className="mt-2 flex items-center gap-2 text-sm">
                  <MailIcon className="h-4 w-4 shrink-0 text-primary dark:text-porch-light" />
                  <a className="text-link break-all" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <CopyEmail email={business.email} />
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm">
                  <PhoneIcon className="h-4 w-4 shrink-0 text-primary dark:text-porch-light" />
                  <a className="text-link" href={telHref}>
                    {business.phoneDisplay}
                  </a>
                </p>
              </div>
              <Mailbox className="hidden h-20 w-24 sm:block" />
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-ink">Durham office &amp; hours</h3>
                <OpenBadge hours={officeHours} variant="inline" className="text-xs" />
              </div>
              <address className="mt-2.5 flex items-start gap-2 not-italic text-sm text-muted">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary dark:text-porch-light" />
                <span>
                  <strong className="text-ink">{business.address.formatted}</strong>
                  <br />
                  {business.landmark}
                </span>
              </address>
              <div className="mt-4">
                <HoursTable hours={officeHours} />
                <TimeZoneNote />
              </div>
              <p className="mt-3 text-xs text-muted">
                Serving {business.serviceAreaCounties.join(', ')}. {business.serviceAreaNote}
              </p>
            </div>
          </div>
        </aside>
      </div>

      <BalusterRail className="mt-6" />

      {/* Map section */}
      <section className="wrap py-10" aria-labelledby="contact-map-heading">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h2 id="contact-map-heading" className="font-display text-2xl font-bold text-ink">
              Find our front porch in Durham
            </h2>
            <p className="text-sm text-muted">{business.landmark}</p>
          </div>
          <a
            href={mapDirectionsUrl(business.address.mapQuery)}
            target="_blank"
            rel="noreferrer"
            className="text-link text-sm"
          >
            Open directions in Google Maps
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border-2 border-ink/80 bg-paper-2 p-2 shadow-[0_5px_0_rgba(42,38,34,0.14)]">
          <GoogleMap
            address={business.address.mapQuery}
            title="Map showing American Tobacco Campus, 318 Blackwell Street, Durham, NC 27701"
            className="overflow-hidden rounded-xl"
          />
        </div>

        {/* Licensing line (words only, no HUD logo) */}
        <p className="mt-6 rounded-xl border border-line bg-paper-2/75 p-4 text-xs leading-relaxed text-muted">
          {business.licensingLine}
        </p>
      </section>
    </>
  );
}
