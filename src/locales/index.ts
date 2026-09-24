import { en, LocaleTranslations } from './en';
import { hi } from './hi';

export type SupportedLocale = 'en' | 'hi';
export type { LocaleTranslations };

export const locales: Record<SupportedLocale, LocaleTranslations> = {
  en,
  hi,
};

export function getLocale(lang: string = 'en'): LocaleTranslations {
  if (lang === 'hi') return hi;
  return en;
}

export * from './en';
