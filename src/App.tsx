import { getLocalizedText } from './utils/localization';
import type { LocalizedText } from './types/content';

const title: LocalizedText = {
  id: 'Warisan Nusantara',
  en: 'Warisan Nusantara',
};

const subtitle: LocalizedText = {
  id: 'Pameran Budaya Interaktif Kiosk — Taman Bhinneka UGM',
  en: 'Interactive Cultural Kiosk Exhibition — Taman Bhinneka UGM',
};

function App() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center p-6 text-center">
      <div className="max-w-lg rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-forest)]">
          {getLocalizedText(title, 'id')}
        </h1>
        <p className="mt-3 text-base text-[var(--color-text-muted)]">
          {getLocalizedText(subtitle, 'id')}
        </p>
      </div>
    </main>
  );
}

export default App;
