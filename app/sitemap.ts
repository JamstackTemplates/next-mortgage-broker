import type { MetadataRoute } from 'next';
import { absoluteUrl } from '../lib/paths';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/loans/', '/repayments/', '/how-it-works/', '/lenders/', '/contact/'].flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
