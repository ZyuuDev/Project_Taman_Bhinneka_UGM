import { useParams } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { BackButton } from '../components/BackButton';
import { HomeButton } from '../components/HomeButton';
import { LanguageToggle } from '../components/LanguageToggle';
import { KioskLayout } from '../layouts/KioskLayout';
import { getCultureById } from '../utils/contentHelpers';
import { ContentNotFound } from '../components/ContentNotFound';
import { SafeImage } from '../components/SafeImage';
import { useLanguage } from '../context/useLanguage';

/**
 * Minimal Culture Detail integration.
 */
export function CultureDetailPage() {
  const { cultureId } = useParams<{ cultureId: string }>();
  const { language } = useLanguage();

  const culture = cultureId ? getCultureById(cultureId) : undefined;

  if (!culture) {
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

  return (
    <KioskLayout>
      <AppHeader
        title={culture.name[language]}
        left={<BackButton />}
        right={
          <div className="flex items-center gap-2">
            <HomeButton />
            <LanguageToggle />
          </div>
        }
      />

      <main className="flex flex-1 flex-col p-8 text-center">
         <div className="relative mx-auto mb-8 h-96 w-full max-w-2xl overflow-hidden rounded-2xl shadow-md">
            <SafeImage
              src={culture.image}
              alt={culture.imageAlt[language]}
              className="h-full w-full object-cover"
            />
         </div>
         <h2 className="mb-4 text-3xl font-bold text-[var(--color-forest)]">
           {culture.name[language]}
         </h2>
         <p className="text-lg text-[var(--color-text-main)]">
           {culture.shortDescription[language]}
         </p>
      </main>
    </KioskLayout>
  );
}
