import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { defaultLocale, locales } from '@/i18n/config';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...projects.map((p) => `/projects/${p.slug}/`)];
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      alternates: {
        languages: { ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])), 'x-default': `${SITE_URL}/${defaultLocale}${path}` },
      },
    })),
  );
}
