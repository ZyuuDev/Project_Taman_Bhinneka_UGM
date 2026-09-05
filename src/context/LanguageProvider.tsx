import { useState, useCallback, type ReactNode } from 'react';
import { LanguageContext } from './LanguageContext';
import type { Language } from '../types/content';
import { DEFAULT_LANGUAGE } from '../utils/localization';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Language>(DEFAULT_LANGUAGE);

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  }, []);

  const resetLanguage = useCallback(() => {
    setLang(DEFAULT_LANGUAGE);
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, resetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
