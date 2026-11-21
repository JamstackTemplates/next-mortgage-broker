import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { getActiveLenders, lenderCountWord, lenders } from '../content/lenders.ts';
import { loans } from '../content/loans.ts';
import { processSteps } from '../content/process.ts';
import { situations } from '../content/situations.ts';
import { validateCollections } from '../content/validation.ts';
import { isContactRoute, route, routePathname } from '../lib/paths.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields and licensing notice', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'licensingLine'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.match(business.licensingLine, /Equal Housing Opportunity/, 'licensingLine must include Equal Housing Opportunity');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 5, 'business.enquiries.usefulToInclude: include message guidance');
  assert.match(business.enquiries.privacyWarning, /Social Security/i, 'privacyWarning must warn against sending SSNs');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
});

test('all structured collections pass validation', () => {
  assert.doesNotThrow(() => validateCollections());
});

test('collection validation fails with item-specific errors', () => {
  // Duplicate / non-URL-safe IDs
  assert.throws(
    () => validateCollections({ situations: [{ ...situations[0], id: 'Bad ID!' }, ...situations.slice(1)], loans, lenders, processSteps }),
    /Bad ID!/,
  );
  assert.throws(
    () => validateCollections({ situations, loans: [loans[0], loans[0], ...loans.slice(2)], lenders, processSteps }),
    new RegExp(loans[0].id),
  );

  // Unknown situation in loan.suits
  assert.throws(
    () =>
      validateCollections({
        situations,
        loans: loans.map(l => (l.id === 'fha' ? { ...l, suits: ['unknown-seat'] } : l)),
        lenders,
        processSteps,
      }),
    /loans\/fha.*unknown-seat/,
  );

  // Unknown loan type in lender.loanTypes
  assert.throws(
    () =>
      validateCollections({
        situations,
        loans,
        lenders: lenders.map(l => (l.id === 'red-clay-cu' ? { ...l, loanTypes: ['no-such-loan'] } : l)),
        processSteps,
      }),
    /lenders\/red-clay-cu.*no-such-loan/,
  );

  // Down payment percentage out of 0-100
  assert.throws(
    () =>
      validateCollections({
        situations,
        loans: loans.map(l => (l.id === 'va' ? { ...l, minDownPaymentPercent: -5 } : l)),
        lenders,
        processSteps,
      }),
    /loans\/va/,
  );
  assert.throws(
    () =>
      validateCollections({
        situations,
        loans: loans.map(l => (l.id === 'jumbo' ? { ...l, minDownPaymentPercent: 105 } : l)),
        lenders,
        processSteps,
      }),
    /loans\/jumbo/,
  );

  // Terms outside 10-30
  assert.throws(
    () =>
      validateCollections({
        situations,
        loans: loans.map(l => (l.id === 'usda' ? { ...l, termsYears: [40] } : l)),
        lenders,
        processSteps,
      }),
    /loans\/usda/,
  );

  // Featured count !== 4
  assert.throws(
    () =>
      validateCollections({
        situations,
        loans: loans.map(l => (l.id === 'usda' ? { ...l, featured: true } : l)),
        lenders,
        processSteps,
      }),
    /expected exactly 4 featured loans/,
  );

  // Non-consecutive process steps
  assert.throws(
    () =>
      validateCollections({
        situations,
        loans,
        lenders,
        processSteps: processSteps.map(s => (s.id === 'closing-day' ? { ...s, step: 7 } : s)),
      }),
    /processSteps\/closing-day/,
  );

  // Loan type with zero active lenders on panel
  assert.throws(
    () =>
      validateCollections({
        situations,
        loans,
        lenders: lenders.map(l =>
          l.loanTypes.includes('bank-statement') ? { ...l, onPanel: false } : l,
        ),
        processSteps,
      }),
    /bank-statement/,
  );
});

test('common owner edit: hiding a lender and adding another derives panel count cleanly', () => {
  const edited = [
    ...lenders.map(l => (l.id === 'sweetgum-savings' ? { ...l, onPanel: false } : l)),
    {
      id: 'haw-river-home-bank',
      name: 'Haw River Home Bank',
      kind: 'bank' as const,
      loanTypes: ['conventional-fixed', 'arm'],
      knownFor: 'Local Chatham County underwriting.',
      onPanel: true,
    },
    {
      id: 'piedmont-oak-cu',
      name: 'Piedmont Oak Credit Union',
      kind: 'credit-union' as const,
      loanTypes: ['conventional-fixed', 'refinance'],
      knownFor: 'Straightforward rate-and-term refinances.',
      onPanel: true,
    },
  ];
  assert.doesNotThrow(() => validateCollections({ situations, loans, lenders: edited, processSteps }));
  const active = getActiveLenders(edited);
  assert.equal(active.length, 13);
  assert.equal(active.some(l => l.id === 'sweetgum-savings'), false);
  assert.equal(lenderCountWord(active.length, { capitalize: true }), 'Thirteen');
});

test('FinancialService structured data derives from content without stating rates', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'FinancialService');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.address.addressLocality, 'Durham');
  assert.equal(schema.areaServed.length, 4);
  assert.equal(schema.openingHoursSpecification.length, 6);
  assert.equal(schema.hasOfferCatalog.itemListElement.length, loans.length);
  for (const offer of schema.hasOfferCatalog.itemListElement) {
    assert.equal(offer['@type'], 'MortgageLoan');
    assert.ok(offer.name && offer.description);
    assert.equal('interestRate' in offer, false);
  }
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('route helpers preserve query strings and identify Contact accurately', () => {
  assert.equal(route('/loans?for=first-home'), '/loans/?for=first-home');
  assert.equal(route('/loans/?for=va#va'), '/loans/?for=va#va');
  assert.equal(routePathname('/loans/?for=first-home'), '/loans/');
  assert.equal(isContactRoute('/contact'), true);
  assert.equal(isContactRoute('/contact/?ref=home'), true);
  assert.equal(isContactRoute('/loans/'), false);
});
