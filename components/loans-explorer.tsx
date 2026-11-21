'use client';

import { useEffect, useState } from 'react';
import type { LoanType } from '../content/loans';
import type { VisitorSituation } from '../content/situations';
import { HouseMotif } from './art/house-plaque';
import { CheckIcon } from './art/motifs';
import { SiteLink } from './site-link';

type Props = {
  loans: readonly LoanType[];
  situations: readonly VisitorSituation[];
};

/**
 * Interactive situation filter & street of wide house-front loan plaques on /loans/.
 * - Syncs `?for=<id>` in the URL query string when JS is available.
 * - Without JS, all 8 loan types show and the chips work as in-page anchor links.
 */
export function LoansExplorer({ loans, situations }: Props) {
  const [selected, setSelected] = useState<string>('all');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const initial = params.get('for');
      if (initial && situations.some(s => s.id === initial)) {
        setSelected(initial);
      }
    };
    syncFromUrl();
    const raf = window.requestAnimationFrame(syncFromUrl);
    window.addEventListener('popstate', syncFromUrl);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('popstate', syncFromUrl);
    };
  }, [situations]);

  function choose(situationId: string) {
    setSelected(situationId);
    const url = new URL(window.location.href);
    if (situationId === 'all') {
      url.searchParams.delete('for');
    } else {
      url.searchParams.set('for', situationId);
    }
    window.history.replaceState({}, '', url.toString());
  }

  const visibleLoans =
    selected === 'all' ? loans : loans.filter(loan => loan.suits.includes(selected));
  const activeSituation = situations.find(s => s.id === selected);

  return (
    <div>
      {/* Painted filter chips bar */}
      <div className="wrap py-8">
        <div className="rounded-2xl border-2 border-line bg-paper-2/90 p-5 sm:p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="font-display text-2xl font-bold text-ink">Which one sounds like you?</h2>
            <p className="text-sm font-medium text-muted tabular" aria-live="polite">
              Showing {visibleLoans.length} of {loans.length} loan types
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5" role="group" aria-label="Filter loan types by your situation">
            {hydrated ? (
              <>
                <button
                  type="button"
                  className="porch-chip"
                  aria-pressed={selected === 'all'}
                  onClick={() => choose('all')}
                >
                  All loan types
                </button>
                {situations.map(situation => (
                  <button
                    key={situation.id}
                    type="button"
                    className="porch-chip"
                    aria-pressed={selected === situation.id}
                    onClick={() => choose(situation.id)}
                  >
                    {situation.label}
                  </button>
                ))}
              </>
            ) : (
              <>
                <a href="#loan-list" className="porch-chip" data-active="true">
                  All loan types
                </a>
                {situations.map(situation => {
                  const firstMatch = loans.find(loan => loan.suits.includes(situation.id));
                  return (
                    <a
                      key={situation.id}
                      href={`#${firstMatch?.id ?? 'loan-list'}`}
                      className="porch-chip"
                    >
                      {situation.label}
                    </a>
                  );
                })}
              </>
            )}
          </div>

          {activeSituation ? (
            <p className="mt-4 border-t border-line pt-3 text-sm text-muted">
              <strong className="text-ink">{activeSituation.label}:</strong> {activeSituation.summary}
            </p>
          ) : null}
        </div>
      </div>

      {/* Street of house fronts — alternating clapboard paper and paper-2 bands */}
      <div id="loan-list" className="divide-y-2 divide-line border-t-2 border-line">
        {visibleLoans.map((loan, index) => {
          const isAlt = index % 2 === 1;
          const downLabel =
            loan.minDownPaymentPercent === null
              ? 'Equity'
              : `${loan.minDownPaymentPercent}%`;
          const downSub =
            loan.minDownPaymentPercent === null ? 'varies by goal' : 'min. down';

          return (
            <article
              key={loan.id}
              id={loan.id}
              className={`scroll-mt-8 py-10 sm:py-12 ${isAlt ? 'clapboard-alt' : 'clapboard'}`}
            >
              <div className="wrap">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                  {/* Left: House-front plaque header, motif & painted house numbers */}
                  <div className="lg:col-span-4">
                    <div className="relative rounded-2xl border-2 border-ink/80 bg-paper p-5 shadow-[0_4px_0_rgba(42,38,34,0.14)]">
                      <span aria-hidden="true" className="absolute top-2.5 left-2.5 h-2 w-2 rounded-full border border-ink/70 bg-brass" />
                      <span aria-hidden="true" className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full border border-ink/70 bg-brass" />
                      <div className="flex items-start justify-between gap-3">
                        <HouseMotif loanId={loan.id} className="h-16 w-20" />
                        <div className="flex gap-2">
                          <div className="rounded-lg border-2 border-ink/75 bg-haint px-2.5 py-1.5 text-center">
                            <span className="font-display block text-xl leading-none font-bold text-ink tabular">
                              {downLabel}
                            </span>
                            <span className="mt-0.5 block text-[0.65rem] font-bold tracking-wider text-ink/80 uppercase">
                              {downSub}
                            </span>
                          </div>
                          <div className="rounded-lg border-2 border-ink/75 bg-paper-2 px-2.5 py-1.5 text-center">
                            <span className="font-display block text-base leading-none font-bold text-ink tabular">
                              {loan.termsYears.join('/')}
                            </span>
                            <span className="mt-1 block text-[0.65rem] font-bold tracking-wider text-muted uppercase">
                              years
                            </span>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-display mt-4 text-2xl leading-tight font-bold text-ink">
                        {loan.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{loan.summary}</p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {loan.suits.map(sid => {
                          const match = situations.find(s => s.id === sid);
                          return (
                            <span
                              key={sid}
                              className="rounded-full border border-line bg-paper-2 px-2.5 py-0.5 text-xs font-semibold text-ink"
                            >
                              {match?.label ?? sid}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right: Good to know + Watch out for columns */}
                  <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
                    <div className="rounded-xl border-2 border-line bg-paper/90 p-5">
                      <h4 className="font-display text-lg font-bold text-ink">Good to know</h4>
                      <ul className="mt-3 space-y-2.5 text-[0.95rem] text-muted">
                        {loan.goodToKnow.map(note => (
                          <li key={note} className="flex items-start gap-2.5">
                            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border-2 border-line bg-paper/90 p-5">
                      <h4 className="font-display text-lg font-bold text-ink">Watch out for</h4>
                      <ul className="mt-3 space-y-2.5 text-[0.95rem] text-muted">
                        {loan.watchOutFor.map(note => (
                          <li key={note} className="flex items-start gap-2.5">
                            <span
                              aria-hidden="true"
                              className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                            />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 border-t border-line pt-3 text-sm">
                        <SiteLink href={`/lenders/?loan=${loan.id}`} className="text-link">
                          See lenders offering {loan.shortName}
                        </SiteLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
