import { provinces, categories, cultures } from './contentHelpers';

export interface ValidationIssue {
  type: 'error' | 'warning';
  message: string;
  item: string;
}

export interface ValidationOptions {
  availableAssetPaths?: string[];
  mode?: 'staging' | 'release';
}

function isRecord(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

function isNonEmptyString(val: unknown): val is string {
  return typeof val === 'string' && val.trim().length > 0;
}

function isValidLocalizedText(val: unknown): boolean {
  return isRecord(val) && isNonEmptyString(val.id) && isNonEmptyString(val.en);
}

function isValidHttpsUrl(val: unknown): boolean {
  if (!isNonEmptyString(val)) return false;
  try {
    const url = new URL(val);
    if (url.protocol !== 'https:') return false;

    const host = url.hostname.toLowerCase();
    if (
      host === 'example.com' ||
      host === 'example.org' ||
      host === 'example.net' ||
      host === 'localhost' ||
      host.endsWith('.example.com') ||
      host.endsWith('.example.org') ||
      host.endsWith('.example.net') ||
      host.endsWith('.invalid')
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Validates the integrity of the JSON content database.
 * Does not mutate data or use fs. Safe for browser execution.
 */
export function validateContentDatabase(options: ValidationOptions = {}): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const { availableAssetPaths, mode = 'staging' } = options;

  if (!Array.isArray(provinces)) {
    issues.push({ type: 'error', message: 'provinces is not an array', item: 'provinces.json' });
    return issues;
  }
  if (!Array.isArray(categories)) {
    issues.push({ type: 'error', message: 'categories is not an array', item: 'categories.json' });
    return issues;
  }
  if (!Array.isArray(cultures)) {
    issues.push({ type: 'error', message: 'cultures is not an array', item: 'cultures.json' });
    return issues;
  }

  const categoryIds = new Set<string>();
  categories.forEach((c: unknown, index: number) => {
    if (!isRecord(c)) {
      issues.push({ type: 'error', message: `Category at index ${index} is not an object`, item: 'categories.json' });
      return;
    }
    const cid = isNonEmptyString(c.id) ? c.id : `index-${index}`;
    if (!isNonEmptyString(c.id)) {
      issues.push({ type: 'error', message: `Missing or invalid ID`, item: `Category ${cid}` });
    } else {
      if (categoryIds.has(c.id)) {
        issues.push({ type: 'error', message: `Duplicate Category ID: ${c.id}`, item: 'categories.json' });
      }
      categoryIds.add(c.id);
    }

    if (!isValidLocalizedText(c.name)) issues.push({ type: 'error', message: `Missing or invalid ID/EN text in name`, item: `Category ${cid}` });
    if (!isValidLocalizedText(c.description)) issues.push({ type: 'error', message: `Missing or invalid ID/EN text in description`, item: `Category ${cid}` });
    if (!isNonEmptyString(c.icon)) issues.push({ type: 'error', message: `Missing or invalid icon`, item: `Category ${cid}` });
  });

  const provinceIds = new Set<string>();
  const provinceCodes = new Set<string>();

  provinces.forEach((p: unknown, index: number) => {
    if (!isRecord(p)) {
      issues.push({ type: 'error', message: `Province at index ${index} is not an object`, item: 'provinces.json' });
      return;
    }
    const pid = isNonEmptyString(p.id) ? p.id : `index-${index}`;

    if (!isNonEmptyString(p.id)) {
      issues.push({ type: 'error', message: `Missing or invalid ID`, item: `Province ${pid}` });
    } else {
      if (provinceIds.has(p.id)) issues.push({ type: 'error', message: `Duplicate Province ID: ${p.id}`, item: 'provinces.json' });
      provinceIds.add(p.id);
    }

    if (!isNonEmptyString(p.code)) {
      issues.push({ type: 'error', message: `Missing or invalid code`, item: `Province ${pid}` });
    } else {
      if (provinceCodes.has(p.code)) issues.push({ type: 'error', message: `Duplicate Province Code: ${p.code}`, item: `Province ${pid}` });
      provinceCodes.add(p.code);
    }

    if (!isValidLocalizedText(p.name)) issues.push({ type: 'error', message: `Missing or invalid ID/EN text in name`, item: `Province ${pid}` });
    if (!isValidLocalizedText(p.island)) issues.push({ type: 'error', message: `Missing or invalid ID/EN text in island`, item: `Province ${pid}` });
    if (!isValidLocalizedText(p.description)) issues.push({ type: 'error', message: `Missing or invalid ID/EN text in description`, item: `Province ${pid}` });

    if (!isNonEmptyString(p.heroImage)) {
      issues.push({ type: 'error', message: `Missing or invalid heroImage`, item: `Province ${pid}` });
    } else {
      if (!p.heroImage.startsWith('/assets/') || !p.heroImage.endsWith('.webp')) {
        issues.push({ type: 'error', message: `heroImage must be a local /assets/** .webp path: ${p.heroImage}`, item: `Province ${pid}` });
      } else {
        if (!availableAssetPaths) {
          issues.push({ type: 'warning', message: `Existence of heroImage not verified`, item: `Province ${pid}` });
        } else if (!availableAssetPaths.includes(p.heroImage)) {
          issues.push({ type: mode === 'release' ? 'error' : 'warning', message: `heroImage file not found in assets: ${p.heroImage}`, item: `Province ${pid}` });
        }
      }
    }

    if (!Array.isArray(p.categories)) {
      issues.push({ type: 'error', message: `categories must be an array`, item: `Province ${pid}` });
    }
    const declaredCategories = Array.isArray(p.categories) ? p.categories : [];
    const declaredSet = new Set<string>();

    for (const cat of declaredCategories) {
      if (!isNonEmptyString(cat)) {
        issues.push({ type: 'error', message: `Invalid category item in categories array`, item: `Province ${pid}` });
        continue;
      }
      if (declaredSet.has(cat)) {
        issues.push({ type: 'error', message: `Duplicate category ID in Province.categories: ${cat}`, item: `Province ${pid}` });
      }
      declaredSet.add(cat);

      if (!categoryIds.has(cat)) {
        issues.push({ type: 'error', message: `Unknown category ID declared: ${cat}`, item: `Province ${pid}` });
      }
      if (cat !== 'kain-tradisional') {
        issues.push({ type: 'error', message: `Province category must only be 'kain-tradisional' in Batik-first phase: ${cat}`, item: `Province ${pid}` });
      }
    }

    // Compare with actual derived cultures
    const actualCategories = new Set<string>();
    cultures.forEach((c: unknown) => {
       if (isRecord(c) && c.provinceId === p.id && isNonEmptyString(c.categoryId)) {
           actualCategories.add(c.categoryId as string);
       }
    });

    for (const cat of declaredSet) {
      if (!actualCategories.has(cat)) {
        issues.push({ type: 'error', message: `Category '${cat}' declared but no culture items exist for it`, item: `Province ${pid}` });
      }
    }

    for (const cat of actualCategories) {
      if (!declaredSet.has(cat)) {
        issues.push({ type: 'error', message: `Culture item exists for category '${cat}' but it is not declared in Province.categories`, item: `Province ${pid}` });
      }
    }
  });

  const cultureIds = new Set<string>();
  cultures.forEach((c: unknown, index: number) => {
    if (!isRecord(c)) {
      issues.push({ type: 'error', message: `Culture at index ${index} is not an object`, item: 'cultures.json' });
      return;
    }
    const cid = isNonEmptyString(c.id) ? c.id : `index-${index}`;
    if (!isNonEmptyString(c.id)) {
       issues.push({ type: 'error', message: `Missing or invalid ID`, item: `Culture ${cid}` });
    } else {
      if (cultureIds.has(c.id)) issues.push({ type: 'error', message: `Duplicate Culture ID: ${c.id}`, item: 'cultures.json' });
      cultureIds.add(c.id);
    }

    if (!isValidLocalizedText(c.name)) issues.push({ type: 'error', message: `Missing or invalid ID/EN text in name`, item: `Culture ${cid}` });
    if (!isValidLocalizedText(c.shortDescription)) issues.push({ type: 'error', message: `Missing or invalid ID/EN text in shortDescription`, item: `Culture ${cid}` });
    if (!isValidLocalizedText(c.description)) issues.push({ type: 'error', message: `Missing or invalid ID/EN text in description`, item: `Culture ${cid}` });
    if (!isValidLocalizedText(c.imageAlt)) issues.push({ type: 'error', message: `Missing or invalid ID/EN text in imageAlt`, item: `Culture ${cid}` });

    if (c.fact !== undefined && !isValidLocalizedText(c.fact)) {
      issues.push({ type: 'error', message: `Invalid ID/EN text in fact`, item: `Culture ${cid}` });
    }

    if (!isNonEmptyString(c.provinceId) || !provinceIds.has(c.provinceId)) {
      issues.push({ type: 'error', message: `Invalid or missing provinceId: ${c.provinceId}`, item: `Culture ${cid}` });
    }
    if (!isNonEmptyString(c.categoryId) || !categoryIds.has(c.categoryId)) {
      issues.push({ type: 'error', message: `Invalid or missing categoryId: ${c.categoryId}`, item: `Culture ${cid}` });
    }

    if (c.categoryId !== 'kain-tradisional') {
      issues.push({ type: 'error', message: `Culture item categoryId must be 'kain-tradisional' in Batik-first phase`, item: `Culture ${cid}` });
    }

    if (!isValidHttpsUrl(c.sourceUrl)) {
      issues.push({ type: 'error', message: `Missing or invalid HTTPS sourceUrl: ${c.sourceUrl}`, item: `Culture ${cid}` });
    }
    if (!isValidHttpsUrl(c.imageSourceUrl)) {
      issues.push({ type: 'error', message: `Missing or invalid HTTPS imageSourceUrl: ${c.imageSourceUrl}`, item: `Culture ${cid}` });
    }

    if (c.shopUrl !== undefined && !isValidHttpsUrl(c.shopUrl)) {
      issues.push({ type: 'error', message: `Invalid HTTPS shopUrl: ${c.shopUrl}`, item: `Culture ${cid}` });
    }

    if (!isNonEmptyString(c.image)) {
       issues.push({ type: 'error', message: `Missing or invalid image`, item: `Culture ${cid}` });
    } else {
       if (!c.image.startsWith('/assets/') || !c.image.endsWith('.webp')) {
         issues.push({ type: 'error', message: `image must be a local /assets/** .webp path: ${c.image}`, item: `Culture ${cid}` });
       } else {
         if (!availableAssetPaths) {
           issues.push({ type: 'warning', message: `Existence of image not verified`, item: `Culture ${cid}` });
         } else if (!availableAssetPaths.includes(c.image)) {
           issues.push({ type: mode === 'release' ? 'error' : 'warning', message: `image file not found in assets: ${c.image}`, item: `Culture ${cid}` });
         }
       }
    }

    if (c.images !== undefined) {
      if (!Array.isArray(c.images)) {
        issues.push({ type: 'error', message: `images must be an array if provided`, item: `Culture ${cid}` });
      } else {
        c.images.forEach((img: unknown, i: number) => {
          if (!isNonEmptyString(img)) {
            issues.push({ type: 'error', message: `image at index ${i} is not a valid string`, item: `Culture ${cid}` });
          } else if (!img.startsWith('/assets/') || !img.endsWith('.webp')) {
            issues.push({ type: 'error', message: `image at index ${i} must be a local /assets/** .webp path: ${img}`, item: `Culture ${cid}` });
          } else {
            if (!availableAssetPaths) {
              issues.push({ type: 'warning', message: `Existence of image at index ${i} not verified`, item: `Culture ${cid}` });
            } else if (!availableAssetPaths.includes(img)) {
              issues.push({ type: mode === 'release' ? 'error' : 'warning', message: `image at index ${i} file not found in assets: ${img}`, item: `Culture ${cid}` });
            }
          }
        });
      }
    }
  });

  return issues;
}
