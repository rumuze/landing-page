import { describe, it, expect } from 'vitest';
import { SCAN_MS, scanFrame, withAlpha } from './scanReveal';

describe('scanFrame', () => {
  it('starts fully covered and ends fully revealed with nothing left on screen', () => {
    const start = scanFrame(0);
    expect(start.scan).toBe(0);
    expect(start.laser).toBe(0);
    expect(start.flash).toBe(0);
    expect(start.bracketAlpha).toBe(0);
    expect(start.done).toBe(false);

    const end = scanFrame(1);
    expect(end.scan).toBe(1);
    expect(end.laser).toBe(0);
    expect(end.flash).toBeCloseTo(0, 10);
    expect(end.bracketAlpha).toBe(0);
    expect(end.done).toBe(true);
  });

  it('only ever sweeps downwards', () => {
    let last = -1;
    for (let i = 0; i <= 100; i += 1) {
      const { scan } = scanFrame(i / 100);
      expect(scan).toBeGreaterThanOrEqual(last);
      last = scan;
    }
  });

  it('has the whole code uncovered before the flash and brackets begin', () => {
    expect(scanFrame(0.76).scan).toBe(1);
    expect(scanFrame(0.8).flash).toBeGreaterThan(0);
    expect(scanFrame(0.85).bracket).toBeGreaterThan(0);
  });

  it('keeps every value in range', () => {
    for (let i = -5; i <= 105; i += 1) {
      const f = scanFrame(i / 100);
      for (const value of [f.scan, f.laser, f.bracket, f.bracketAlpha]) {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }
    }
  });

  it('is short enough not to hold the user up', () => {
    expect(SCAN_MS).toBeLessThanOrEqual(1600);
  });
});

describe('withAlpha', () => {
  it('converts six- and three-digit hex colours', () => {
    expect(withAlpha('#06150f', 0.5)).toBe('rgba(6, 21, 15, 0.5)');
    expect(withAlpha('#fff', 0.2)).toBe('rgba(255, 255, 255, 0.2)');
  });
  it('leaves other values alone', () => {
    expect(withAlpha('red', 0.5)).toBe('red');
    expect(withAlpha(undefined, 0.5)).toBe(undefined);
  });
});
