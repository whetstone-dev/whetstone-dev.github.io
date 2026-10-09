import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { defaultLocale, getDictionary, isLocale, locales } from '@/i18n/config';
import { SITE_URL } from '@/lib/site';
import { fontVars, THEME_SCRIPT } from '../fonts';
import '../globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    // English is the primary version: x-default points to it
    alternates: {
      canonical: `/${lang}/`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}/`])), 'x-default': `/${defaultLocale}/` },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: 'website',
      locale: lang,
      siteName: 'whetstone-dev',
      images: [{ url: '/og.png', width: 1280, height: 640, alt: 'whetstone-dev: Sharpen your agent.' }],
    },
    twitter: { card: 'summary_large_image', images: ['/og.png'] },
    icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/favicon.ico', sizes: '48x48' }], apple: '/apple-touch-icon.png' },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef2f7' },
    { media: '(prefers-color-scheme: dark)', color: '#0c111b' },
  ],
};

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) throw new Error(`Unsupported language: ${lang}`);
  const t = getDictionary(lang);
  return (
    <html lang={lang} className={fontVars} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Plain inline script (not next/script): runs before first paint and React never re-creates it on the client */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Nav lang={lang} t={t.nav} />
        {children}
        <Footer lang={lang} t={t.footer} home={t.nav.home} />
      </body>
    </html>
  );
}
