import { describe, expect, it } from 'vitest';
import { filterOptions, firstIndex, lastIndex, normalizeSearch, stepIndex, typeAheadIndex } from './selectLogic';

const options = [
  { value: 'SA', label: 'السعودية', meta: '+966', keywords: 'Saudi Arabia' },
  { value: 'AE', label: 'الإمارات', meta: '+971', keywords: 'United Arab Emirates' },
  { value: 'EG', label: 'مصر', meta: '+20', keywords: 'Egypt', disabled: true },
  { value: 'KW', label: 'الكويت', meta: '+965', keywords: 'Kuwait' },
];

describe('normalizeSearch', () => {
  it('ignores case, diacritics and the different ways of writing alef, teh marbuta and yeh', () => {
    expect(normalizeSearch('  Saudi  ARABIA ')).toBe('saudi arabia');
    expect(normalizeSearch('الإمارات')).toBe(normalizeSearch('الامارات'));
    expect(normalizeSearch('السعوديّة')).toBe(normalizeSearch('السعوديه'));
    expect(normalizeSearch('مصـر')).toBe('مصر');
  });
});

describe('filterOptions', () => {
  it('matches the label, the meta and the keywords', () => {
    expect(filterOptions(options, 'الامارات').map((o) => o.value)).toEqual(['AE']);
    expect(filterOptions(options, '965').map((o) => o.value)).toEqual(['KW']);
    expect(filterOptions(options, 'saudi').map((o) => o.value)).toEqual(['SA']);
  });
  it('keeps everything for an empty query and nothing for no match', () => {
    expect(filterOptions(options, '  ')).toBe(options);
    expect(filterOptions(options, 'zzz')).toEqual([]);
  });
});

describe('moving through the options', () => {
  it('skips disabled options and stops at the ends', () => {
    expect(stepIndex(options, 1, 1)).toBe(3);
    expect(stepIndex(options, 3, 1)).toBe(3);
    expect(stepIndex(options, 3, -1)).toBe(1);
    expect(stepIndex(options, 0, -1)).toBe(0);
  });
  it('finds the first and last enabled option', () => {
    expect(firstIndex(options)).toBe(0);
    expect(lastIndex(options)).toBe(3);
    expect(lastIndex([{ value: 'x', label: 'x', disabled: true }])).toBe(-1);
  });
});

describe('typeAheadIndex', () => {
  const list = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta' },
    { value: 'b2', label: 'Bravo' },
    { value: 'c', label: 'Charlie' },
  ];
  it('jumps to the next option that starts with the letter and wraps', () => {
    expect(typeAheadIndex(list, 'b', 0)).toBe(1);
    expect(typeAheadIndex(list, 'b', 1)).toBe(2);
    expect(typeAheadIndex(list, 'b', 2)).toBe(1);
  });
  it('matches a longer prefix from the current option', () => {
    expect(typeAheadIndex(list, 'br', 0)).toBe(2);
    expect(typeAheadIndex(list, 'ch', 0)).toBe(3);
  });
  it('returns -1 when nothing matches or nothing was typed', () => {
    expect(typeAheadIndex(list, 'z', 0)).toBe(-1);
    expect(typeAheadIndex(list, '', 0)).toBe(-1);
  });
});
