import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../context/useLanguage';
import { AppButton } from '../components/AppButton';
import { LanguageToggle } from '../components/LanguageToggle';

const text = {
  title: { id: 'Warisan Nusantara', en: 'Warisan Nusantara' },
  subtitle: {
    id: 'Jelajahi Kekayaan Budaya Indonesia',
    en: "Explore Indonesia's Cultural Heritage",
  },
  cta: { id: 'Sentuh untuk Menjelajah', en: 'Touch to Explore' },
};

/**
 * Screen 1 — Attract Screen.
 * Features ambient animations, bilingual support, and clear call-to-action.
 */
export function AttractPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            staggerChildren: 0.2,
            delayChildren: 0.1,
          },
    },
  };

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: prefersReducedMotion
      ? { opacity: 1, y: 0, transition: { duration: 0 } }
      : { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
  };

  const pulseAnimation = prefersReducedMotion
    ? {}
    : {
        scale: [1, 1.03, 1],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  const floatAnimation1 = prefersReducedMotion
    ? {}
    : {
        y: [0, -15, 0],
        transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
      };

  const floatAnimation2 = prefersReducedMotion
    ? {}
    : {
        y: [0, 20, 0],
        transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' as const },
      };

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[var(--color-bone)] p-8 text-center">
      {/* Abstract CSS Ornaments for cultural/batik feel */}
      <motion.div
        animate={floatAnimation1}
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full border-[16px] border-[var(--color-brown)] opacity-5"
        aria-hidden="true"
      />
      <motion.div
        animate={floatAnimation2}
        className="pointer-events-none absolute -right-40 bottom-10 h-[500px] w-[500px] rounded-full bg-[var(--color-forest)] opacity-5 blur-3xl"
        aria-hidden="true"
      />

      <div className="absolute top-6 right-6 z-10">
        <LanguageToggle />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex max-w-2xl flex-col items-center gap-12"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-[var(--color-forest)] md:text-6xl lg:text-7xl">
            {text.title[language]}
          </h1>
          <p className="text-xl font-medium text-[var(--color-brown)] md:text-2xl">
            {text.subtitle[language]}
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.div animate={pulseAnimation}>
            <AppButton
              onClick={() => navigate('/explore')}
              className="min-h-[72px] px-12 text-xl shadow-lg"
            >
              {text.cta[language]}
            </AppButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
