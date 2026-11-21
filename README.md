# Front Porch Home Loans (`next-mortgage-broker`)

A self-contained Next.js static-export website template for an approachable mortgage broker, built for
the Jamstacks gallery. All business details, people (June Okafor and Marcus Bell), lenders, phone
numbers and email addresses are fictitious sample data.

Local development requires Node 24 or later and npm. Run `npm ci` and `npm run dev` to preview locally.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Full-bleed hero (porch in front of a Durham warehouse skyline, brick front walk with lender count, step count and phone), visitor situations as a numbered seat list, featured loans, repayment teaser, compact porch steps, lender panel strip, broker bios, Durham office map & `FinancialService` JSON-LD |
| `/loans/` | Situation filter (`?for=<id>`) and all eight home loan types with "Good to know" and "Watch out for" notes |
| `/repayments/` | PITI + PMI cutaway house explainer, worked example, interactive repayment estimator, 30-year vs 15-year comparison and ways to pay less |
| `/how-it-works/` | Full six-step porch stairs with "You do / We do", document checklist, broker compensation flow diagram and native `<details>` FAQ |
| `/lenders/` | Panel overview, loan-type filter (`?loan=<id>`) and hanging key-tag rails grouped by banks, credit unions and non-bank lenders |
| `/contact/` | Hosted Jamstacks support form when configured, visible email fallback, "Useful to include" note card, office hours, map and Equal Housing Opportunity notice |
| `/404.html` | Missing-step porch illustration with stair-riser links back to Home, Loans and Contact |

## Make it yours

Edit page-specific prose directly in the route's `app/**/page.tsx` file, and edit shared business
details or structured collections in `content/`:

| File | Owns |
| --- | --- |
| `content/business.ts` | Business name, email, phone, Durham office address, landmark line, service counties, licensing notice, broker profiles and Contact copy |
| `content/hours.ts` | Seven same-day `OpeningHours` entries used by the porch-light status badge, hours tables and schema.org |
| `content/situations.ts` | Visitor situations shown on Home ("Who sits on our porch") and `/loans/` filters |
| `content/loans.ts` | Eight loan types, minimum down payments, terms, featured flag (exactly four featured) and plain-English notes |
| `content/lenders.ts` | Fictitious lender panel (`onPanel: false` hides a lender without deleting it; lender counts derive automatically from active entries) |
| `content/process.ts` | Six consecutive porch steps (`1`–`6`) and the document checklist |
| `content/repayments.ts` | Worked example inputs, estimator limits, `monthlyPayment()` and `amortizationByYear()` helpers and disclaimer |
| `content/faq.ts` | Six questions and answers rendered with native `<details>` on `/how-it-works/` |
| `content/validation.ts` | Cross-collection validator catching invalid IDs, missing references, out-of-range numbers or unoffered loans |
| `app/**/page.tsx` | Page-specific headings, introductions, section labels and call-to-action copy |
| `site.config.json` | Public site name, meta description, hostname, `timeZone` (`America/New_York`) and Jamstacks form ID/CDN |
| `app/tailwind.input.css` | Light/dark porch palette tokens (including `--sky-*`, `--skyline-*`, `--lawn`, `--brick-walk` and `--accent-ink` for the horizon scene), clapboard/ceiling/floorboard textures, slider/accordion rules and print styles |
| `components/art/` | Inline SVG illustrations (`PorchScene`, `DurhamSkyline` (tobacco warehouses, smokestack and water tower; reused in the hero, page heads, office postcard and footer), `PorchSteps`, `Lantern`, `BalusterRail`, `HouseNumberPlaque`, `KeyTag`, `Mailbox`, `RockingChairs`, `CutawayHouse`, `MissingStepArt`) |
| `lib/structured-data.ts` | `FinancialService` + `MortgageLoan` JSON-LD derived from `content/` |

### Frequent owner edits

- **Add, hide or re-tag a lender:** edit `content/lenders.ts`. Set `onPanel: false` to hide a lender
  (for example `sweetgum-savings`) or add a new lender record; the Home strip, `/lenders/` rails,
  filter counts and "Twelve lenders" copy all update automatically from the data.
- **Change the worked example:** update `workedExample` in `content/repayments.ts` to refresh the
  Home repayment teaser, the `/repayments/` worked example card, the 30-vs-15 comparison and the
  estimator defaults together.
- **Edit a loan type or featured flag:** update `content/loans.ts` (keep exactly four loans marked
  `featured: true`).
- **Update office hours:** edit `content/hours.ts` (same-day `HH:MM` intervals only) and confirm
  `timeZone` in `site.config.json`.

## Fonts and visual system

Self-hosted SIL Open Font License (OFL) fonts installed via npm:
- **Fraunces** (`@fontsource-variable/fraunces`) — display headings, wordmark, house numbers and payment numerals
- **Figtree** (`@fontsource-variable/figtree`) — body copy, navigation, buttons and tabular tables
- **Caveat** (`@fontsource/caveat`, weights 500 & 700) — handwritten broker annotations and signatures

Light and dark themes use the "Haint-blue ceiling and the porch light" palette via CSS custom
properties mapped in `app/tailwind.input.css`, working with the `jamstacks` package's `ThemeProvider`,
`ThemeScript` and `DarkModeToggle`.

## Public configuration and Contact contract

`site.config.json` keeps the Jamstacks provisioner's shape (`name`, `description`, `domain`,
`timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`, optional `provisioningId`). Never add private
keys or business collections to it.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID renders the email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Only `/contact/` mounts `<jamstacks-support-form>` and loads `{cdn}/sites/{siteId}/embed.js` when
`JAMSTACKS_SITE` is configured. Navigation to and from Contact uses full-document loads via
`SiteLink`. The public email (`hello@frontporchhomeloans.example`) is always visible.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests verify configuration/provisioner compatibility, content validation rules, repayment math and
amortisation, `America/New_York` hours boundaries and DST transitions, embed states and JSON-LD
escaping.

## Publishing assets

The removable `jamstacks/` folder holds source-gallery metadata (`config.json`, captures and
`config.test.mjs`). Customer websites can delete `jamstacks/` cleanly without affecting tests,
builds or GitHub Pages deployment. Run gallery verification separately:

```sh
node --test jamstacks/config.test.mjs
```
