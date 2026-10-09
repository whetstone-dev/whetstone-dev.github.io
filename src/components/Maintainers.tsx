import { avatarUrl, maintainers } from '@/content/maintainers';
import { format, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';
import { Avatar } from './Avatar';
import { Glow } from './Glow';

interface MaintainersProps {
  lang: Locale;
  t: Dictionary['team'];
}

export function Maintainers({ lang, t }: MaintainersProps) {
  if (maintainers.length === 0) return null;
  return (
    <ul className="team">
      {maintainers.map((m) => (
        <li key={m.github} className="reveal">
          <Glow className="team-card">
            <Avatar src={avatarUrl(m.github, 240)} alt={format(t.avatarAlt, { name: m.name })} name={m.name} />
            <div className="team-who">
              <h3>{m.name}</h3>
              <a href={`https://github.com/${m.github}`} target="_blank" rel="noopener noreferrer">@{m.github}</a>
            </div>
            <p className="team-bio">{m.bio[lang]}</p>
            <p className="team-meta">
              <span>{m.role[lang]}</span>
              <span>{m.location}</span>
            </p>
          </Glow>
        </li>
      ))}
    </ul>
  );
}
