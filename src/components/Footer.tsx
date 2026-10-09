import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';
import { LICENSE_URL, ORG_URL, SKILLS_SH_URL } from '@/lib/site';

interface FooterProps {
  lang: Locale;
  t: Dictionary['footer'];
  home: string;
}

export function Footer({ lang, t, home }: FooterProps) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-brand">
          <Link className="brand" href={`/${lang}/`} aria-label={home}>
            <img src="/whetstone-mark.svg" alt="" width={28} height={28} />
            <span>whetstone-dev</span>
          </Link>
          <p>{t.tagline}</p>
        </div>
        <nav aria-label={t.linksLabel}>
          <a href={ORG_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={SKILLS_SH_URL} target="_blank" rel="noopener noreferrer">skills.sh</a>
          <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer">{t.license}</a>
        </nav>
      </div>
    </footer>
  );
}
