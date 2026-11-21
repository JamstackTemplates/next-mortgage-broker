'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { documentHref, isContactRoute, route, routePathname } from '../lib/paths';

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /** Site route such as /loans/ or /loans/?for=first-home (without the base path). */
  href: string;
  children: ReactNode;
  /** Mark as the current page when the route matches (navigation links). */
  markCurrent?: 'page' | 'section';
};

/**
 * Internal link. Uses client-side navigation everywhere except to and from Contact.
 *
 * The hosted Jamstacks runtime discovers its host element when its bootstrap runs and stops
 * observing after ten seconds; it has no public remount API. A full document load for Contact
 * guarantees one fresh bootstrap after the host exists, including on delayed or repeated visits.
 */
export function SiteLink({ href, children, markCurrent, ...rest }: SiteLinkProps) {
  const pathname = usePathname();
  const target = route(href);
  const targetPath = routePathname(target);
  const current = routePathname(pathname || '/');
  const isCurrent =
    markCurrent === 'page'
      ? current === targetPath
      : markCurrent === 'section'
        ? current === targetPath || current.startsWith(targetPath)
        : false;
  const ariaCurrent = isCurrent ? (current === targetPath ? 'page' : 'true') : undefined;

  if (isContactRoute(targetPath) || isContactRoute(current)) {
    return (
      <a href={documentHref(target)} aria-current={ariaCurrent} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={target} aria-current={ariaCurrent} {...rest}>
      {children}
    </Link>
  );
}
