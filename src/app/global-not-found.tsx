import type { Metadata } from 'next';
import { en } from '@/i18n/dictionaries/en';
import { es } from '@/i18n/dictionaries/es';
import { fontVars, THEME_SCRIPT } from './fonts';
import './globals.css';

export const metadata: Metadata = { title: '404 | whetstone-dev', robots: { index: false } };

// Served by GitHub Pages as 404.html for any unknown path. The language is unknown here,
// so the page shows English first and Spanish below it.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <main className="not-found">
          <div className="wrap">
            <img src="/whetstone-mark.svg" alt="" width={96} height={96} />
            <h1>{en.notFound.title}</h1>
            <p className="lede">{en.notFound.body}</p>
            <p className="lede" lang="es">{es.notFound.title} {es.notFound.body}</p>
            <div className="not-found-links">
              <a className="btn btn-solid" href="/en/">{en.notFound.cta}</a>
              <a className="btn btn-ghost" href="/es/" lang="es">{es.notFound.cta}</a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
