import { LanguageCode, supportedLanguages, translations, TranslationSet } from './dictionaries';

export * from './dictionaries';

export function getTranslation(lang: LanguageCode = 'en'): TranslationSet {
  return translations[lang] || translations.en;
}
