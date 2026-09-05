import { HashRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageProvider';
import { AttractPage } from '../pages/AttractPage';
import { ExploreMapPage } from '../pages/ExploreMapPage';
import { ProvincePage } from '../pages/ProvincePage';
import { CategoryPage } from '../pages/CategoryPage';
import { CultureDetailPage } from '../pages/CultureDetailPage';
import { NotFoundPage } from '../pages/NotFoundPage';

/**
 * Root application router.
 * Uses HashRouter for static-file kiosk server compatibility (no server rewrites needed).
 *
 * Route map:
 *  /                              → AttractPage
 *  /explore                       → ExploreMapPage
 *  /province/:provinceId          → ProvincePage
 *  /province/:provinceId/:categoryId → CategoryPage
 *  /culture/:cultureId            → CultureDetailPage
 *  *                              → NotFoundPage (bilingual 404)
 */
export function AppRouter() {
  return (
    <HashRouter>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<AttractPage />} />
          <Route path="/explore" element={<ExploreMapPage />} />
          <Route path="/province/:provinceId" element={<ProvincePage />} />
          <Route
            path="/province/:provinceId/:categoryId"
            element={<CategoryPage />}
          />
          <Route path="/culture/:cultureId" element={<CultureDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LanguageProvider>
    </HashRouter>
  );
}
