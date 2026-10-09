import type { CSSProperties } from 'react';

/**
 * The organization statement. Each word lights up as the paragraph scrolls through the
 * viewport (CSS scroll-driven animation); browsers without support show it fully lit.
 */
export function Manifesto({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <p className="manifesto" style={{ '--n': words.length } as CSSProperties}>
      {words.map((word, i) => (
        <span key={i} style={{ '--i': i } as CSSProperties}>
          {word}{' '}
        </span>
      ))}
    </p>
  );
}
