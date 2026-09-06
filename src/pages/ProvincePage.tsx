import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import { AppHeader } from '../components/AppHeader';
import { BackButton } from '../components/BackButton';
import { HomeButton } from '../components/HomeButton';
import { LanguageToggle } from '../components/LanguageToggle';
import { KioskLayout } from '../layouts/KioskLayout';
import { getProvinceById, getActiveCategoriesByProvince } from '../utils/contentHelpers';
import { ContentNotFound } from '../components/ContentNotFound';
import { SafeImage } from '../components/SafeImage';
import { AppButton } from '../components/AppButton';
import { EmptyState } from '../components/EmptyState';

/**
 * Minimal Province Detail integration.
 */
export function ProvincePage() {
  const { provinceId } = useParams<{ provinceId: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const province = provinceId ? getProvinceById(provinceId) : undefined;

  if (!province) {
    return (
      <KioskLayout>
        <AppHeader
          left={<BackButton />}
          right={
            <div className="flex items-center gap-2">
              <HomeButton />
              <LanguageToggle />
            </div>
          }
        />
        <ContentNotFound />
      </KioskLayout>
    );
  }

  const activeCategories = getActiveCategoriesByProvince(province.id);

  return (
    <KioskLayout>
      <AppHeader
        title={province.name[language]}
        left={<BackButton />}
        right={
          <div className="flex items-center gap-2">
            <HomeButton />
            <LanguageToggle />
          </div>
        }
      />

      <main className="flex flex-1 flex-col p-8">
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl">
          <SafeImage
            src={province.heroImage}
            alt={province.name[language]}
            className="h-full w-full object-cover"
          />
        </div>

        <h2 className="mb-4 text-3xl font-bold text-[var(--color-forest)]">
          {province.name[language]}
        </h2>
        <p className="mb-8 text-lg text-[var(--color-text-main)]">
          {province.description[language]}
        </p>

        <h3 className="mb-4 text-xl font-semibold text-[var(--color-brown)]">
          {language === 'id' ? 'Kategori Aktif' : 'Active Categories'} ({activeCategories.length})
        </h3>

        {activeCategories.length === 0 ? (
          <EmptyState
            title={{
              id: 'Belum Ada Data Batik',
              en: 'No Batik Data Yet',
            }}
            description={{
              id: 'Koleksi Batik untuk provinsi ini belum tersedia.',
              en: 'Batik collection for this province is not available yet.',
            }}
          />
        ) : (
          <div className="flex flex-wrap gap-4">
            {activeCategories.map(cat => (
              <AppButton
                key={cat.id}
                onClick={() => navigate(`/province/${province.id}/${cat.id}`)}
                className="min-h-[56px] px-6"
              >
                {cat.name[language]}
              </AppButton>
            ))}
          </div>
        )}
      </main>
    </KioskLayout>
  );
}
