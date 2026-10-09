'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { LANG_KEY, THEME_KEY } from '@/lib/site';
import { MoonIcon, SunIcon } from './Icons';

function savePreference(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // No storage (private mode): the preference lasts only for this visit
  }
}

function currentTheme(): 'dark' | 'light' {
  const forced = document.documentElement.dataset.theme;
  if (forced === 'dark' || forced === 'light') return forced;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle({ label }: { label: string }) {
  function toggle(): void {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    savePreference(THEME_KEY, next);
  }

  return (
    <button className="icon-btn" type="button" onClick={toggle} aria-label={label}>
      <MoonIcon className="theme-moon" />
      <SunIcon className="theme-sun" />
    </button>
  );
}

/** Keeps the visitor on the same page when switching language: /en/skills/x/ to /es/skills/x/ */
export function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() ?? `/${lang}/`;
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

  return (
    <div className="lang" role="group" aria-label={label}>
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          aria-current={l === lang ? 'true' : undefined}
          onClick={() => savePreference(LANG_KEY, l)}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
