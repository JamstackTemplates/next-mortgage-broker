import { business } from '../content/business.ts';
import { officeHours } from '../content/hours.ts';
import { loans } from '../content/loans.ts';
import { absoluteUrl } from './paths.ts';

/**
 * Schema.org FinancialService structured data derived strictly from typed content/.
 * Lists each loan type as a MortgageLoan with name and description only (no rates).
 */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const openingHoursSpecification = officeHours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: business.name,
    description: business.introduction,
    email: business.email,
    telephone: business.phone,
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${business.address.street}, ${business.address.suite}`,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: business.serviceAreaCounties.map(county => ({
      '@type': 'AdministrativeArea',
      name: `${county}, North Carolina`,
    })),
    openingHoursSpecification,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Home loan types',
      itemListElement: loans.map(loan => ({
        '@type': 'MortgageLoan',
        name: loan.name,
        description: loan.summary,
      })),
    },
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
