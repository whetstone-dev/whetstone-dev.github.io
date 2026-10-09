'use client';

import { useRef, type ElementType, type PointerEvent, type ReactNode } from 'react';

interface GlowProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * Card whose border lights up under the pointer (spotlight border).
 * The pointer position is written straight to CSS variables on the element,
 * never to React state, so moving the mouse does not re-render anything.
 */
export function Glow({ as: Tag = 'div', className = '', children }: GlowProps) {
  const ref = useRef<HTMLElement>(null);

  function handleMove(e: PointerEvent<HTMLElement>): void {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const box = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - box.left}px`);
    el.style.setProperty('--my', `${e.clientY - box.top}px`);
  }

  return (
    <Tag ref={ref} className={`glow ${className}`} onPointerMove={handleMove}>
      {children}
    </Tag>
  );
}
