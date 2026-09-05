import { motion } from 'motion/react';
import { useLanguage } from '../context/useLanguage';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Pilih bahasa / Select language"
      className="inline-flex rounded-xl border border-[var(--color-border-subtle)] overflow-hidden"
    >
      {(['id', 'en'] as const).map((lang) => {
        const isActive = language === lang;
        return (
          <motion.button
            key={lang}
            type="button"
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            onClick={() => setLanguage(lang)}
            aria-pressed={isActive}
            aria-label={lang === 'id' ? 'Bahasa Indonesia' : 'English'}
            className={
              'min-h-[56px] min-w-[56px] px-4 text-sm font-semibold uppercase ' +
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
              'focus-visible:outline-[var(--color-forest)] select-none cursor-pointer ' +
              'transition-colors ' +
              (isActive
                ? 'bg-[var(--color-forest)] text-[var(--color-bone)]'
                : 'bg-transparent text-[var(--color-text-muted)]')
            }
          >
            {lang.toUpperCase()}
          </motion.button>
        );
      })}
    </div>
  );
}
