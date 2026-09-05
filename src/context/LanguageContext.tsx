import { createContext } from 'react';

export interface LanguageContextValue {
  language: 'id' | 'en';
  setLanguage: (lang: 'id' | 'en') => void;
  toggleLanguage: () => void;
  resetLanguage: () => void;
}

/**
 * Raw context object — imported by provider and hook only.
 * Not a React component, so it is isolated here to satisfy
 * react-refresh/only-export-components (no components in this file).
 */
export const LanguageContext = createContext<LanguageContextValue | null>(null);
