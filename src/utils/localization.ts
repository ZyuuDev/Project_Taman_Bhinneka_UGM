import type { Language, LocalizedText } from '../types/content';

export const DEFAULT_LANGUAGE: Language = 'id';
export const SUPPORTED_LANGUAGES: readonly Language[] = ['id', 'en'] as const;

/**
 * Type guard to check if a given value is a valid Language ('id' | 'en').
 */
export function isLanguage(value: unknown): value is Language {
  return value === 'id' || value === 'en';
}

/**
 * Type-safe localization helper.
 * Retrieves text for the requested language from a LocalizedText object.
 * Falls back to Indonesian ('id'), then English ('en'), or an empty string if undefined.
 */
export function getLocalizedText(
  text: LocalizedText | null | undefined,
  lang: Language = DEFAULT_LANGUAGE
): string {
  if (!text) return '';
  return text[lang] || text.id || text.en || '';
}
