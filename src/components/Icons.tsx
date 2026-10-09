import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

// Same stroke icon set as the network-engineering site (1.8 stroke, 24px grid)
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

export const MoonIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
);
export const SunIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const CopyIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" /></svg>
);
export const CheckIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={2.2} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const SearchIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.9} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const ExternalIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.9} {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" /></svg>
);
