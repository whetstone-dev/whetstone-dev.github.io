import type { Locale } from '@/i18n/config';

export interface Maintainer {
  /** GitHub username; the avatar comes from https://github.com/<github>.png */
  github: string;
  name: string;
  role: Record<Locale, string>;
  /** One line about what they work on (editable by each maintainer) */
  bio: Record<Locale, string>;
  location: string;
}

// Members of the whetstone-dev GitHub organization
export const maintainers: Maintainer[] = [
  {
    github: 'Juanfrxz',
    name: 'Juan David',
    role: { en: 'Maintainer', es: 'Mantenedor' },
    bio: {
      en: 'Full-stack developer. Author of the network-engineering skill.',
      es: 'Desarrollador full stack. Autor de la skill network-engineering.',
    },
    location: 'Bucaramanga, Colombia',
  },
  {
    github: 'JoseDFlorez',
    name: 'Jose David Florez',
    role: { en: 'Maintainer', es: 'Mantenedor' },
    // Paraphrased from his public GitHub bio
    bio: {
      en: 'Backend, cloud and AI. Builds scalable solutions and explores blockchain.',
      es: 'Backend, nube e IA. Construye soluciones escalables y explora blockchain.',
    },
    location: 'Colombia',
  },
];

export function avatarUrl(github: string, size = 160): string {
  return `https://github.com/${encodeURIComponent(github)}.png?size=${size}`;
}
