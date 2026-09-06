import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import { AppButton } from './AppButton';
import { FileQuestion } from 'lucide-react';

interface ContentNotFoundProps {
  title?: { id: string; en: string };
  description?: { id: string; en: string };
  showExploreButton?: boolean;
}

const defaultText = {
  title: {
    id: 'Konten Tidak Ditemukan',
    en: 'Content Not Found',
  },
  description: {
    id: 'Maaf, halaman atau data yang Anda cari tidak tersedia saat ini.',
    en: 'Sorry, the page or data you are looking for is currently unavailable.',
  },
  back: {
    id: 'Kembali',
    en: 'Go Back',
  },
  explore: {
    id: 'Kembali ke Peta',
    en: 'Back to Map',
  },
};

/**
 * Fallback component for invalid IDs or missing routes.
 */
export function ContentNotFound({
  title = defaultText.title,
  description = defaultText.description,
  showExploreButton = true
}: ContentNotFoundProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
      <div className="mb-6 rounded-full bg-[var(--color-surface)] p-6 text-[var(--color-border-subtle)]">
        <FileQuestion size={64} strokeWidth={1} />
      </div>
      <h2 className="mb-4 text-2xl font-bold text-[var(--color-forest)]">
        {title[language]}
      </h2>
      <p className="mb-10 max-w-md text-[var(--color-text-muted)]">
        {description[language]}
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <AppButton
          onClick={() => navigate(-1)}
          className="min-h-[56px] min-w-[160px]"
          variant="secondary"
        >
          {defaultText.back[language]}
        </AppButton>

        {showExploreButton && (
          <AppButton
            onClick={() => navigate('/explore')}
            className="min-h-[56px] min-w-[160px]"
            variant="primary"
          >
            {defaultText.explore[language]}
          </AppButton>
        )}
      </div>
    </div>
  );
}
