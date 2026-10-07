import { describe, expect, it } from 'vitest';
import {
  addDays,
  cycleDelta,
  gregorianToHijri,
  hijriMonthGrid,
  hijriToGregorian,
  illumination,
  isHijriSupported,
  litPath,
  moonCycle,
  phaseName,
  utcDate,
} from './hijri';

const iso = (date) => date.toISOString().slice(0, 10);

describe('Hijri conversion', () => {
  it('has the Umm al-Qura calendar available', () => {
    expect(isHijriSupported()).toBe(true);
  });

  it('converts a known date both ways', () => {
    const forward = gregorianToHijri(2026, 2, 18);
    expect(forward.ok).toBe(true);
    expect(forward.hijri).toEqual({ year: 1447, month: 9, day: 1 });
    const back = hijriToGregorian(1447, 9, 1);
    expect(back.ok).toBe(true);
    expect(iso(back.date)).toBe('2026-02-18');
  });

  it('round-trips dates across the supported range', () => {
    let checked = 0;
    for (let t = 0; t < 520; t += 1) {
      const date = addDays(utcDate(1901, 1, 1), t * 120);
      const forward = gregorianToHijri(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
      expect(forward.ok).toBe(true);
      const back = hijriToGregorian(forward.hijri.year, forward.hijri.month, forward.hijri.day);
      expect(back.ok).toBe(true);
      expect(iso(back.date)).toBe(iso(date));
      checked += 1;
    }
    expect(checked).toBe(520);
  });

  it('rejects dates that do not exist or are outside the range', () => {
    expect(gregorianToHijri(2026, 2, 30)).toEqual({ ok: false, error: 'invalid' });
    expect(gregorianToHijri(2026, 13, 1)).toEqual({ ok: false, error: 'invalid' });
    expect(gregorianToHijri(1800, 1, 1)).toEqual({ ok: false, error: 'range' });
    expect(gregorianToHijri(Number.NaN, 1, 1)).toEqual({ ok: false, error: 'empty' });
    expect(hijriToGregorian(1000, 1, 1)).toEqual({ ok: false, error: 'range' });
    expect(hijriToGregorian(1447, 13, 1)).toEqual({ ok: false, error: 'invalid' });
  });

  it('rejects day 30 in a month that has 29 days', () => {
    const grid = hijriMonthGrid(1447, 9);
    const short = grid.length === 29 ? [1447, 9] : [1447, 10];
    const shortGrid = hijriMonthGrid(...short);
    if (shortGrid.length === 29) expect(hijriToGregorian(short[0], short[1], 30).ok).toBe(false);
  });
});

describe('hijriMonthGrid', () => {
  it('gives 29 or 30 days and the weekday of the first', () => {
    for (let month = 1; month <= 12; month += 1) {
      const grid = hijriMonthGrid(1447, month);
      expect([29, 30]).toContain(grid.length);
      expect(grid.firstWeekday).toBe(grid.first.getUTCDay());
    }
  });
});

describe('moon phase', () => {
  it('is new at the reference new moon and full about two weeks later', () => {
    expect(illumination(moonCycle(utcDate(2000, 1, 6)))).toBeLessThan(0.05);
    expect(illumination(moonCycle(utcDate(2000, 1, 21)))).toBeGreaterThan(0.95);
  });
  it('names the phases', () => {
    expect(phaseName(0)).toBe('new');
    expect(phaseName(0.25)).toBe('firstQuarter');
    expect(phaseName(0.5)).toBe('full');
    expect(phaseName(0.75)).toBe('lastQuarter');
    expect(phaseName(0.999)).toBe('new');
  });
  it('turns the short way round the cycle', () => {
    expect(cycleDelta(0.95, 0.05)).toBeCloseTo(0.1);
    expect(cycleDelta(0.05, 0.95)).toBeCloseTo(-0.1);
  });
  it('draws a lit shape for every phase', () => {
    for (const cycle of [0.02, 0.15, 0.25, 0.4, 0.5, 0.6, 0.75, 0.9]) {
      expect(litPath(cycle)).toMatch(/^M50 6 A44 44 0 0 [01] 50 94 A[\d.]+ 44 0 0 [01] 50 6Z$/);
    }
  });
});
