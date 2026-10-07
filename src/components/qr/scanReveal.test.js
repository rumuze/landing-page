import { describe, it, expect } from 'vitest';
import {
  SCAN_MS,
  isFinderModule,
  isLogoModule,
  moduleScale,
  qrGeometry,
  roundedCorners,
  scanFrame,
  withAlpha,
} from './scanReveal';

describe('scanFrame', () => {
  it('starts covered with nothing lit, and ends handed over to the real code', () => {
    const start = scanFrame(0);
    expect(start.scan).toBe(0);
    expect(start.laser).toBe(0);
    expect(start.flash).toBe(0);
    expect(start.bracketAlpha).toBe(0);
    expect(start.logo).toBe(0);
    expect(start.cover).toBe(1);
    expect(start.done).toBe(false);

    const end = scanFrame(1);
    expect(end.scan).toBe(1);
    expect(end.laser).toBe(0);
    expect(end.flash).toBeCloseTo(0, 10);
    expect(end.bracketAlpha).toBe(0);
    expect(end.logo).toBe(1);
    expect(end.cover).toBe(0);
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

  it('finishes the sweep, then flashes, then lands the logo, in that order', () => {
    expect(scanFrame(0.76).scan).toBe(1);
    expect(scanFrame(0.7).flash).toBe(0);
    expect(scanFrame(0.84).flash).toBeGreaterThan(0);
    expect(scanFrame(0.82).logo).toBeGreaterThan(0);
    expect(scanFrame(0.79).logo).toBe(0);
  });

  it('keeps every value in range', () => {
    for (let i = -5; i <= 105; i += 1) {
      const f = scanFrame(i / 100);
      for (const value of [f.scan, f.laser, f.settle, f.bracket, f.bracketAlpha, f.logo, f.cover]) {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      }
    }
  });

  it('takes about two seconds, like the prototype', () => {
    expect(SCAN_MS).toBe(2000);
  });
});

describe('moduleScale', () => {
  it('grows a module as the laser moves past it and ends at full size', () => {
    expect(moduleScale(0, 9, 0)).toBeCloseTo(0, 10);
    expect(moduleScale(9 * 5, 9, 0)).toBeCloseTo(1, 10);
    expect(moduleScale(9 * 2.5, 9, 0)).toBeGreaterThan(moduleScale(9, 9, 0));
  });
  it('overshoots slightly before settling, which is the pop', () => {
    expect(moduleScale(9 * 3.5, 9, 0)).toBeGreaterThan(1);
  });
  it('brings modules the laser never reached up to full size once it has finished', () => {
    expect(moduleScale(0, 9, 1)).toBeCloseTo(1, 10);
  });
});

describe('qrGeometry', () => {
  // The values the generator uses: a 300 px canvas, margin 12, logo at 35% with an 8 px margin.
  const base = { width: 300, height: 300, margin: 12, imageSize: 0.35, level: 'Q', imageMargin: 8 };

  it('lays modules out like the library does', () => {
    const g = qrGeometry({ ...base, count: 29 });
    expect(g.dot).toBe(Math.floor(276 / 29));
    expect(g.x0).toBe(Math.floor((300 - 29 * g.dot) / 2));
    expect(g.y0).toBe(g.x0);
  });

  it('clears an odd, centred square of modules for a square logo', () => {
    const g = qrGeometry({ ...base, count: 29, imageAspect: 1 });
    expect(g.hideX).toBe(7);
    expect(g.hideY).toBe(7);
    expect(g.hideX % 2).toBe(1);
    expect(g.logoWidth).toBe(7 * g.dot - 16);
  });

  it('clears a wider area than tall for a wide logo', () => {
    const g = qrGeometry({ ...base, count: 37, imageAspect: 0.5 });
    expect(g.hideX).toBeGreaterThan(g.hideY);
  });

  it('never clears the finder patterns', () => {
    for (const count of [25, 29, 33, 37, 45]) {
      const g = qrGeometry({ ...base, count, imageAspect: 1 });
      for (let r = 0; r < count; r += 1) {
        for (let c = 0; c < count; c += 1) {
          if (isFinderModule(r, c, count)) expect(isLogoModule(r, c, count, g.hideX, g.hideY)).toBe(false);
        }
      }
    }
  });

  it('clears nothing when there is no logo', () => {
    const g = qrGeometry({ ...base, count: 29, imageSize: 0 });
    expect(g.hideX).toBe(0);
    expect(g.hideY).toBe(0);
  });
});

describe('isLogoModule / isFinderModule', () => {
  it('finds the middle of the code and the three corners', () => {
    expect(isLogoModule(14, 14, 29, 7, 7)).toBe(true);
    expect(isLogoModule(2, 2, 29, 7, 7)).toBe(false);
    expect(isFinderModule(0, 0, 29)).toBe(true);
    expect(isFinderModule(3, 25, 29)).toBe(true);
    expect(isFinderModule(25, 3, 29)).toBe(true);
    expect(isFinderModule(25, 25, 29)).toBe(false);
  });
});

describe('roundedCorners', () => {
  const none = { up: false, right: false, down: false, left: false };
  it('makes a lone module a circle', () => {
    expect(roundedCorners(none)).toEqual([true, true, true, true]);
  });
  it('rounds only the free end of a line', () => {
    expect(roundedCorners({ ...none, right: true })).toEqual([true, false, false, true]);
    expect(roundedCorners({ ...none, down: true })).toEqual([true, true, false, false]);
  });
  it('keeps the sides of a straight run square', () => {
    expect(roundedCorners({ ...none, left: true, right: true })).toEqual([false, false, false, false]);
  });
  it('rounds only the outside corner of an L', () => {
    expect(roundedCorners({ ...none, right: true, down: true })).toEqual([true, false, false, false]);
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
