'use client';

import { useEffect, useState } from 'react';
import {
  LENDER_KIND_LABELS,
  LENDER_KIND_ORDER,
  type Lender,
} from '../content/lenders';
import type { LoanType } from '../content/loans';
import { KeyRail, KeyTag } from './art/key-tag';

type Props = {
  lenders: readonly Lender[];
  loans: readonly LoanType[];
};

const TILT_PATTERN = ['-rotate-1', 'rotate-1', '-rotate-[0.6deg]', 'rotate-[0.8deg]'];

/**
 * Interactive loan-type filter and hanging KeyTag key rails on /lenders/.
 * - Only active (`onPanel: true`) lenders should be passed in.
 * - Syncs `?loan=<id>` in the URL query string when JS is available.
 * - Without JS, all lenders show grouped by kind and chips link to kind anchors.
 */
export function LendersPanel({ lenders, loans }: Props) {
  const [selectedLoan, setSelectedLoan] = useState<string>('all');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const initial = params.get('loan');
      if (initial && loans.some(l => l.id === initial)) {
        setSelectedLoan(initial);
      }
    };
    syncFromUrl();
    const raf = window.requestAnimationFrame(syncFromUrl);
    window.addEventListener('popstate', syncFromUrl);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('popstate', syncFromUrl);
    };
  }, [loans]);

  function choose(loanId: string) {
    setSelectedLoan(loanId);
    const url = new URL(window.location.href);
    if (loanId === 'all') {
      url.searchParams.delete('loan');
    } else {
      url.searchParams.set('loan', loanId);
    }
    window.history.replaceState({}, '', url.toString());
  }

  const loanNameMap = new Map(loans.map(loan => [loan.id, loan.shortName]));
  const filtered =
    selectedLoan === 'all'
      ? lenders
      : lenders.filter(lender => lender.loanTypes.includes(selectedLoan));

  return (
    <div>
      {/* Loan-type filter chips */}
      <div className="wrap pb-8">
        <div className="rounded-2xl border-2 border-line bg-paper-2/90 p-5 sm:p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="font-display text-2xl font-bold text-ink">Filter our panel by loan type</h2>
            <p className="text-sm font-medium text-muted tabular" aria-live="polite">
              Showing {filtered.length} of {lenders.length} panel lenders
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter lenders by loan type">
            {hydrated ? (
              <>
                <button
                  type="button"
                  className="porch-chip"
                  aria-pressed={selectedLoan === 'all'}
                  onClick={() => choose('all')}
                >
                  All lenders ({lenders.length})
                </button>
                {loans.map(loan => {
                  const count = lenders.filter(l => l.loanTypes.includes(loan.id)).length;
                  return (
                    <button
                      key={loan.id}
                      type="button"
                      className="porch-chip"
                      aria-pressed={selectedLoan === loan.id}
                      onClick={() => choose(loan.id)}
                    >
                      {loan.shortName} ({count})
                    </button>
                  );
                })}
              </>
            ) : (
              <>
                <a href="#panel-bank" className="porch-chip" data-active="true">
                  All lenders ({lenders.length})
                </a>
                {loans.map(loan => {
                  const firstMatch = lenders.find(l => l.loanTypes.includes(loan.id));
                  return (
                    <a
                      key={loan.id}
                      href={`#panel-${firstMatch?.kind ?? 'bank'}`}
                      className="porch-chip"
                    >
                      {loan.shortName}
                    </a>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hanging key tags grouped by institution kind on wooden key rails */}
      <div className="wrap space-y-12 pb-12">
        {LENDER_KIND_ORDER.map(kind => {
          const group = filtered.filter(lender => lender.kind === kind);
          if (!group.length) return null;
          return (
            <section key={kind} id={`panel-${kind}`} aria-labelledby={`heading-${kind}`}>
              <h3 id={`heading-${kind}`} className="sr-only">
                {LENDER_KIND_LABELS[kind]}
              </h3>
              <KeyRail label={LENDER_KIND_LABELS[kind]} />

              <ul className="mt-2 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((lender, idx) => (
                  <li key={lender.id}>
                    <KeyTag
                      name={lender.name}
                      kindLabel={LENDER_KIND_LABELS[lender.kind]}
                      knownFor={lender.knownFor}
                      tiltClass={TILT_PATTERN[idx % TILT_PATTERN.length]}
                      chips={lender.loanTypes.map(loanId => (
                        <span
                          key={loanId}
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                            selectedLoan === loanId
                              ? 'border-primary bg-primary text-primary-ink'
                              : 'border-line bg-paper-2 text-ink'
                          }`}
                        >
                          {loanNameMap.get(loanId) ?? loanId}
                        </span>
                      ))}
                    />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
