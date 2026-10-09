import type { Dictionary } from '@/i18n/types';

/** What the organization stands for (editorial rows) and a strip of plain facts about it */
export function Values({ t }: { t: Dictionary['about'] }) {
  return (
    <>
      <ul className="values">
        {t.values.map((v) => (
          <li key={v.title} className="reveal">
            <h3>{v.title}</h3>
            <p>{v.body}</p>
          </li>
        ))}
      </ul>
      <dl className="org-facts reveal">
        {t.facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
