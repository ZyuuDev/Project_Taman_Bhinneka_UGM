import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import { AppButton } from '../components/AppButton';
import { KioskLayout } from '../layouts/KioskLayout';
import { LanguageToggle } from '../components/LanguageToggle';

const text = {
  heading: { id: 'Halaman Tidak Ditemukan', en: 'Page Not Found' },
  body: {
    id: 'Maaf, rute yang Anda minta tidak tersedia.',
    en: 'Sorry, the route you requested is not available.',
  },
  cta: { id: 'Kembali ke Peta', en: 'Back to Map' },
};

/**
 * Wildcard 404 fallback for unknown hash routes.
 * Provides bilingual error message and navigation back to /explore.
 */
export function NotFoundPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <KioskLayout>
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-forest)]">
          {text.heading[language]}
        </h1>
        <p className="text-base text-[var(--color-text-muted)]">
          {text.body[language]}
        </p>
        <AppButton onClick={() => navigate('/explore')}>
          {text.cta[language]}
        </AppButton>
      </main>
    </KioskLayout>
  );
}
