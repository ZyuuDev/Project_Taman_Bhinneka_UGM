import { useLanguage } from '../context/useLanguage';
import { AppHeader } from '../components/AppHeader';
import { LanguageToggle } from '../components/LanguageToggle';
import { KioskLayout } from '../layouts/KioskLayout';

const text = {
  title: { id: 'Jelajahi Nusantara', en: 'Explore Nusantara' },
  subtitle: {
    id: 'Pilih provinsi di peta untuk mulai menjelajah',
    en: 'Select a province on the map to begin exploring',
  },
};

/**
 * Screen 2 — Interactive Map placeholder.
 * Full map implementation (SVG, touch targets, province card) done in FAIRUZ-05.
 * HomeButton dihilangkan karena halaman ini sudah merupakan tujuan Home (/explore).
 */
export function ExploreMapPage() {
  const { language } = useLanguage();

  return (
    <KioskLayout>
      <AppHeader
        title={text.title[language]}
        right={<LanguageToggle />}
      />

      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
        <p className="text-lg text-[var(--color-text-muted)]">
          {text.subtitle[language]}
        </p>
        <div className="rounded-2xl border-2 border-dashed border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-8 py-12 text-sm text-[var(--color-text-muted)]">
          {/* Peta interaktif diimplementasikan di FAIRUZ-05 */}
        </div>
      </main>
    </KioskLayout>
  );
}
