import { useLanguage } from '../context/useLanguage';
import { AppButton } from '../components/AppButton';
import { LanguageToggle } from '../components/LanguageToggle';
import { useNavigate } from 'react-router-dom';

const text = {
  title: { id: 'Warisan Nusantara', en: 'Warisan Nusantara' },
  subtitle: {
    id: 'Jelajahi Kekayaan Budaya Indonesia',
    en: "Explore Indonesia's Cultural Heritage",
  },
  cta: { id: 'Sentuh untuk Menjelajah', en: 'Touch to Explore' },
};

/**
 * Screen 1 — Attract Screen placeholder.
 * Full visual implementation is done in FAIRUZ-04.
 * This placeholder validates /#/ routing and bilingual context.
 */
export function AttractPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-[var(--color-forest)]">
          {text.title[language]}
        </h1>
        <p className="text-lg text-[var(--color-text-muted)]">
          {text.subtitle[language]}
        </p>
      </div>

      <AppButton onClick={() => navigate('/explore')}>
        {text.cta[language]}
      </AppButton>
    </main>
  );
}
