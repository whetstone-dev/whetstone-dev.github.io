import type { Dictionary } from './types';
import { en } from './dictionaries/en';
import { es } from './dictionaries/es';

// To add a language: create dictionaries/<code>.ts and register it here
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = { en: 'English', es: 'Español' };

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: string): Dictionary {
  if (!isLocale(locale)) throw new Error(`Unsupported language: ${locale}`);
  return dictionaries[locale];
}

/** Replaces {name} placeholders in a dictionary string */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
