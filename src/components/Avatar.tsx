'use client';

import { useState } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  name: string;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** GitHub avatar with an initials fallback when the image cannot load (offline, blocked, renamed user) */
export function Avatar({ src, alt, name }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="avatar avatar-fallback" role="img" aria-label={alt}>
        {initials(name)}
      </span>
    );
  }
  return (
    <img className="avatar" src={src} alt={alt} width={64} height={64} loading="lazy" decoding="async" onError={() => setFailed(true)} />
  );
}
