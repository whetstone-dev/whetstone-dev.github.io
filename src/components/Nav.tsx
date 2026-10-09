import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';
import { ORG_URL } from '@/lib/site';
import { LangSwitch, ThemeToggle } from './Preferences';

interface NavProps {
  lang: Locale;
  t: Dictionary['nav'];
}

export function Nav({ lang, t }: NavProps) {
  // Anchors point at the home sections, so they also work from a project page
  const home = `/${lang}/`;
  const links = [
    { href: `${home}#about`, label: t.about },
    { href: `${home}#work`, label: t.work },
    { href: `${home}#projects`, label: t.projects },
    { href: `${home}#team`, label: t.team },
    { href: `${home}#contact`, label: t.contact },
  ];
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href={home} aria-label={t.home}>
          <img src="/whetstone-mark.svg" alt="" width={28} height={28} />
          <span>whetstone-dev</span>
        </Link>
        <nav className="nav-links" aria-label={t.mainLabel}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>
        <div className="nav-end">
          <LangSwitch lang={lang} label={t.languageLabel} />
          <ThemeToggle label={t.themeLabel} />
          <a className="btn btn-ghost nav-gh" href={ORG_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
