'use client';

import { useEffect } from 'react';

/**
 * Marks every .reveal element with data-in when it enters the viewport (once).
 * The hidden starting state only applies when JavaScript runs (html[data-js]), so content
 * is never lost without JS, and reduced motion skips it entirely in CSS.
 */
export function Reveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => (el.dataset.in = 'true'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = 'true';
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
