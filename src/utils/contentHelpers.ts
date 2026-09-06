import type { Province, Category, CultureItem } from '../types/content';
import provincesData from '../data/provinces.json';
import categoriesData from '../data/categories.json';
import culturesData from '../data/cultures.json';

// Type assertion for imported JSON data
export const provinces = provincesData as Province[];
export const categories = categoriesData as Category[];
export const cultures = culturesData as CultureItem[];

/**
 * Retrieves a province by its unique ID.
 */
export function getProvinceById(id: string): Province | undefined {
  return provinces.find((p) => p.id === id);
}

/**
 * Retrieves a category by its unique ID.
 */
export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

/**
 * Retrieves a culture item by its unique ID.
 */
export function getCultureById(id: string): CultureItem | undefined {
  return cultures.find((c) => c.id === id);
}

/**
 * Retrieves all culture items belonging to a specific province.
 */
export function getCulturesByProvince(provinceId: string): CultureItem[] {
  return cultures.filter((c) => c.provinceId === provinceId);
}

/**
 * Retrieves all culture items belonging to a specific province and category.
 */
export function getCulturesByProvinceAndCategory(provinceId: string, categoryId: string): CultureItem[] {
  return cultures.filter((c) => c.provinceId === provinceId && c.categoryId === categoryId);
}

/**
 * Derives the active categories for a province strictly based on actual culture items.
 * Ignores Province.categories field to ensure truthfulness.
 */
export function getActiveCategoriesByProvince(provinceId: string): Category[] {
  const provinceCultures = getCulturesByProvince(provinceId);
  const activeCategoryIds = new Set(provinceCultures.map((c) => c.categoryId));

  return categories.filter((c) => activeCategoryIds.has(c.id));
}
