import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/useLanguage';
import { AppHeader } from '../components/AppHeader';
import { BackButton } from '../components/BackButton';
import { HomeButton } from '../components/HomeButton';
import { LanguageToggle } from '../components/LanguageToggle';
import { KioskLayout } from '../layouts/KioskLayout';
import { getProvinceById, getCategoryById, getCulturesByProvinceAndCategory } from '../utils/contentHelpers';
import { ContentNotFound } from '../components/ContentNotFound';
import { EmptyState } from '../components/EmptyState';
import { AppButton } from '../components/AppButton';
import { Scroll } from 'lucide-react';

/**
 * Minimal Category Page integration.
 */
export function CategoryPage() {
  const { provinceId, categoryId } = useParams<{ provinceId: string; categoryId: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const province = provinceId ? getProvinceById(provinceId) : undefined;
  const category = categoryId ? getCategoryById(categoryId) : undefined;

  if (!province || !category) {
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

  const items = getCulturesByProvinceAndCategory(province.id, category.id);

  return (
    <KioskLayout>
      <AppHeader
        title={`${category.name[language]} - ${province.name[language]}`}
        left={<BackButton />}
        right={
          <div className="flex items-center gap-2">
            <HomeButton />
            <LanguageToggle />
          </div>
        }
      />

      <main className="flex flex-1 flex-col items-center justify-center p-8">
        {items.length === 0 ? (
          <EmptyState
            icon={<Scroll size={64} strokeWidth={1} />}
            title={{
              id: `Belum Ada Data ${category.name.id}`,
              en: `No ${category.name.en} Data Yet`
            }}
            description={{
              id: `Koleksi budaya untuk kategori ini di provinsi ${province.name.id} belum tersedia.`,
              en: `Cultural collection for this category in ${province.name.en} province is not available yet.`
            }}
            action={
              <AppButton onClick={() => navigate(-1)} className="min-h-[56px] min-w-[160px]">
                {language === 'id' ? 'Kembali' : 'Go Back'}
              </AppButton>
            }
          />
        ) : (
          <div className="w-full text-center">
             <p className="text-xl text-[var(--color-text-main)]">
                {items.length} {language === 'id' ? 'item ditemukan' : 'items found'}
             </p>
             <div className="mt-8 flex flex-wrap justify-center gap-4">
                {items.map(item => (
                   <AppButton
                     key={item.id}
                     onClick={() => navigate(`/culture/${item.id}`)}
                     className="min-h-[56px] px-6"
                   >
                     {item.name[language]}
                   </AppButton>
                ))}
             </div>
          </div>
        )}
      </main>
    </KioskLayout>
  );
}
