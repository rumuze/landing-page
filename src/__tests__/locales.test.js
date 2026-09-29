import { describe, expect, it } from 'vitest';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

const flatten = (value, prefix = '') => {
  if (Array.isArray(value)) return value.flatMap((item, index) => flatten(item, `${prefix}[${index}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => flatten(child, prefix ? `${prefix}.${key}` : key));
  }
  return [[prefix, value]];
};

describe('locale files', () => {
  const englishEntries = new Map(flatten(en));
  const arabicEntries = new Map(flatten(ar));

  it('define the same keys in English and Arabic', () => {
    const missingInArabic = [...englishEntries.keys()].filter((key) => !arabicEntries.has(key));
    const missingInEnglish = [...arabicEntries.keys()].filter((key) => !englishEntries.has(key));
    expect(missingInArabic, 'keys missing from ar.json').toEqual([]);
    expect(missingInEnglish, 'keys missing from en.json').toEqual([]);
  });

  it('have no empty strings', () => {
    const empty = [...englishEntries, ...arabicEntries]
      .filter(([, value]) => typeof value === 'string' && value.trim() === '')
      .map(([key]) => key);
    expect(empty).toEqual([]);
  });
});
