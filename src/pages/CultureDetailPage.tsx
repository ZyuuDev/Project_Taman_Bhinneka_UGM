import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import { AppHeader } from '../components/AppHeader';
import { BackButton } from '../components/BackButton';
import { HomeButton } from '../components/HomeButton';
import { LanguageToggle } from '../components/LanguageToggle';
import { KioskLayout } from '../layouts/KioskLayout';

const text = {
  title: { id: 'Detail Budaya', en: 'Culture Detail' },
  paramLabel: { id: 'ID Karya Budaya', en: 'Culture ID' },
  placeholder: {
    id: '[Detail budaya — implementasi final di FAIRUZ-07]',
    en: '[Culture detail — final implementation in FAIRUZ-07]',
  },
};

/**
 * Screen 5 — Culture Detail placeholder.
 * Displays cultureId param safely to confirm routing works.
 * Full implementation (photo, narrative, QR modal) done in FAIRUZ-07.
 */
export function CultureDetailPage() {
  const { cultureId } = useParams<{ cultureId: string }>();
  const { language } = useLanguage();

  return (
    <KioskLayout>
      <AppHeader
        title={text.title[language]}
        left={<BackButton />}
        right={
          <div className="flex items-center gap-2">
            <HomeButton />
            <LanguageToggle />
          </div>
        }
      />

      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
        <p className="text-sm font-medium text-[var(--color-text-muted)]">
          {text.paramLabel[language]}:{' '}
          <code className="rounded bg-[var(--color-surface)] px-2 py-0.5 text-[var(--color-brown)]">
            {cultureId ?? '—'}
          </code>
        </p>
        <div className="rounded-2xl border-2 border-dashed border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-8 py-12 text-sm text-[var(--color-text-muted)]">
          {text.placeholder[language]}
        </div>
      </main>
    </KioskLayout>
  );
}
