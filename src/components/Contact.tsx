import type { Dictionary } from '@/i18n/types';
import { DISCUSSIONS_URL, ORG_URL, PROPOSE_PROJECT_URL } from '@/lib/site';
import { ExternalIcon } from './Icons';

/** Every channel lives on GitHub, so conversations stay public */
export function Contact({ t }: { t: Dictionary['contact'] }) {
  const channels = [
    { href: DISCUSSIONS_URL, ...t.discussion },
    { href: PROPOSE_PROJECT_URL, ...t.propose },
    { href: ORG_URL, ...t.follow },
  ];
  return (
    <ul className="channels">
      {channels.map((c) => (
        <li key={c.href}>
          <a href={c.href} target="_blank" rel="noopener noreferrer">
            <strong>{c.title}<ExternalIcon /></strong>
            <span>{c.body}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
