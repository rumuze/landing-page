import { describe, expect, it } from 'vitest';
import { calcAdPlan, formatNumber, parseNumber } from './adBudget';

describe('parseNumber', () => {
  it('reads numbers with Arabic digits, separators and a percent sign', () => {
    expect(parseNumber('2.5%')).toBe(2.5);
    expect(parseNumber('١٬٢٠٠')).toBe(1200);
    expect(parseNumber('٠٫٧٥')).toBe(0.75);
    expect(parseNumber('٣٫٥')).toBe(3.5);
  });
  it('refuses empty, zero, negative, text and too many decimals', () => {
    for (const bad of ['', '0', '0.00', '-1', 'x', '1.234']) expect(parseNumber(bad), bad).toBeNull();
    expect(parseNumber('2000', { max: 100 })).toBeNull();
  });
});

describe('calcAdPlan: target mode', () => {
  it('works out clicks, budget and cost per result', () => {
    const plan = calcAdPlan({ mode: 'target', target: 100, conversionRate: 2, cpc: 1.5 });
    expect(plan.ok).toBe(true);
    expect(plan.clicks).toBe(5000);
    expect(plan.budget).toBe(7500);
    expect(plan.cpa).toBe(75);
    expect(plan.impressions).toBeNull();
    expect(plan.revenue).toBeNull();
  });
  it('rounds the clicks up so the target is reached', () => {
    expect(calcAdPlan({ mode: 'target', target: 10, conversionRate: 3, cpc: 1 }).clicks).toBe(334);
  });
  it('adds views, revenue, ROAS, break-even ROAS and profit when given the optional numbers', () => {
    const plan = calcAdPlan({ mode: 'target', target: 100, conversionRate: 2, cpc: 1.5, ctr: 1, aov: 200, margin: 40 });
    expect(plan.impressions).toBe(500000);
    expect(plan.revenue).toBe(20000);
    expect(plan.roas).toBeCloseTo(2.667, 3);
    expect(plan.breakEvenRoas).toBe(2.5);
    expect(plan.profit).toBe(500); // 40% of 20000 is 8000, minus 7500
  });
});

describe('calcAdPlan: budget mode', () => {
  it('works out the results a budget can buy', () => {
    const plan = calcAdPlan({ mode: 'budget', budget: 3000, conversionRate: 2, cpc: 1.5 });
    expect(plan.clicks).toBe(2000);
    expect(plan.conversions).toBe(40);
    expect(plan.budget).toBe(3000);
    expect(plan.cpa).toBe(75);
  });
});

describe('calcAdPlan: missing numbers', () => {
  it('names what is missing', () => {
    expect(calcAdPlan({ mode: 'target', conversionRate: 2 })).toEqual({ ok: false, missing: ['cpc', 'target'] });
    expect(calcAdPlan({ mode: 'budget', cpc: 1 })).toEqual({ ok: false, missing: ['conversionRate', 'budget'] });
    expect(calcAdPlan({ mode: 'target', target: 5, conversionRate: 150, cpc: 1 }).missing).toEqual(['conversionRate']);
  });
});

describe('formatNumber', () => {
  it('groups thousands and fixes the decimals', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
    expect(formatNumber(7.5, 2)).toBe('7.50');
    expect(formatNumber(-1500.256, 1)).toBe('-1,500.3');
    expect(formatNumber(0)).toBe('0');
  });
  it('shows a dash for numbers that do not exist', () => {
    expect(formatNumber(Number.NaN)).toBe('–');
    expect(formatNumber(Infinity)).toBe('–');
  });
});
