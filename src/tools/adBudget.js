// Pure logic for the ad budget calculator. It does arithmetic on numbers the visitor supplies; it
// does not know what a good conversion rate or click price is, and the page says so.

import { toLatinDigits } from './whatsapp';

/** A positive number typed by a person (Arabic digits and decimal mark accepted), or null. */
export function parseNumber(text, { max = 1_000_000_000, decimals = 2 } = {}) {
  const cleaned = toLatinDigits(text).replace(/[\s,،٬]/g, '').replace(/٫/g, '.').replace(/%/g, '');
  if (!new RegExp(`^\\d+(\\.\\d{1,${decimals}})?$`).test(cleaned)) return null;
  const value = Number(cleaned);
  return value > 0 && value <= max ? value : null;
}

const positive = (value) => typeof value === 'number' && Number.isFinite(value) && value > 0;

/**
 * Works out a plan from the numbers given. `mode` is 'target' (I want this many results: what will it
 * cost?) or 'budget' (I can spend this: what can I expect?).
 *
 * Required: conversionRate (percent of clicks that convert), cpc (price of one click), and either
 * target (results wanted) or budget. Optional: ctr (percent of views that click), aov (value of one
 * result) and margin (percent of that value kept as profit).
 *
 * Returns { ok: false, missing: [...] } or { ok: true, ... } with clicks, conversions, budget, cpa and,
 * when the optional numbers are given, impressions, revenue, roas, breakEvenRoas and profit.
 */
export function calcAdPlan({ mode, target, budget, conversionRate, cpc, ctr, aov, margin }) {
  const missing = [];
  if (!positive(conversionRate) || conversionRate > 100) missing.push('conversionRate');
  if (!positive(cpc)) missing.push('cpc');
  if (mode === 'budget' ? !positive(budget) : !positive(target)) missing.push(mode === 'budget' ? 'budget' : 'target');
  if (missing.length) return { ok: false, missing };

  const rate = conversionRate / 100;
  let clicks;
  let conversions;
  let spend;
  if (mode === 'budget') {
    clicks = budget / cpc;
    conversions = clicks * rate;
    spend = budget;
  } else {
    clicks = Math.ceil(target / rate);
    conversions = target;
    spend = clicks * cpc;
  }

  const plan = {
    ok: true,
    clicks,
    conversions,
    budget: spend,
    cpa: conversions > 0 ? spend / conversions : null,
    impressions: positive(ctr) && ctr <= 100 ? clicks / (ctr / 100) : null,
    revenue: null,
    roas: null,
    breakEvenRoas: null,
    profit: null,
  };
  if (positive(aov)) {
    plan.revenue = conversions * aov;
    plan.roas = plan.revenue / spend;
    if (positive(margin) && margin <= 100) {
      plan.breakEvenRoas = 100 / margin;
      plan.profit = (plan.revenue * margin) / 100 - spend;
    }
  }
  return plan;
}

/** The widths of the three funnel bars, as a share of the first bar; fixed steps that only show the order. */
export const FUNNEL_WIDTHS = [1, 0.62, 0.3];

/** A number with thousands separators and a fixed number of decimals, e.g. 12,500 or 7.50. */
export function formatNumber(value, decimals = 0) {
  if (!Number.isFinite(value)) return '–';
  const sign = value < 0 ? '-' : '';
  const [whole, fraction] = Math.abs(value).toFixed(decimals).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${sign}${grouped}${fraction ? `.${fraction}` : ''}`;
}
