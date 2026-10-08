// Pure logic for the invoice generator. Money is worked in whole minor units (cents). Each line's VAT
// is worked out on that line and rounded half up, and the totals are the sums of the lines, so the
// printed lines always add up to the printed totals.

import { toLatinDigits } from './whatsapp';
import { calcVat } from './vat';
import { addDays, utcDate } from './hijri';
import { isIsoDate } from './schema';

export const MAX_ITEMS = 30;
export const PAYMENT_TERMS = [0, 7, 14, 30, 60];
export const RATE_CHOICES = [0, 5, 10, 14, 15, 16];

const MAX_UNIT_MINOR = 100_000_000_000; // 1 billion in major units
const MAX_QUANTITY_MILLI = 1_000_000_000; // 1 million

const clean = (text) => toLatinDigits(text).replace(/[\s,،٬]/g, '').replace(/٫/g, '.');

/** A price typed by a person, in minor units, or null (zero is allowed, a negative is not). */
export function parseUnitPrice(text) {
  const value = clean(text);
  if (!/^\d+(\.\d{0,2})?$/.test(value)) return null;
  const [whole, fraction = ''] = value.split('.');
  const minor = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(minor) && minor <= MAX_UNIT_MINOR ? minor : null;
}

/** A quantity typed by a person with up to three decimals, in thousandths, or null. Must be above zero. */
export function parseQuantity(text) {
  const value = clean(text);
  if (!/^\d+(\.\d{1,3})?$/.test(value)) return null;
  const [whole, fraction = ''] = value.split('.');
  const milli = Number(whole) * 1000 + Number(fraction.padEnd(3, '0'));
  return milli > 0 && milli <= MAX_QUANTITY_MILLI ? milli : null;
}

/** quantity (thousandths) x unit price (minor units), rounded half up to a whole minor unit. */
export function lineNet(quantityMilli, unitMinor) {
  const product = BigInt(quantityMilli) * BigInt(unitMinor);
  return Number((product * 2n + 1000n) / 2000n);
}

/**
 * Works out an invoice from lines { description, quantityMilli, unitMinor, rate }. Lines without a
 * description, quantity or price are skipped. Returns the priced lines, the VAT grouped by rate,
 * and the totals.
 */
export function calcInvoice(items) {
  const lines = [];
  for (const item of items) {
    if (!String(item.description ?? '').trim() || item.quantityMilli == null || item.unitMinor == null) continue;
    const net = lineNet(item.quantityMilli, item.unitMinor);
    const { vat, gross } = calcVat(net, item.rate, 'add');
    lines.push({ ...item, net, vat, gross });
  }
  const groups = new Map();
  for (const line of lines) {
    const group = groups.get(line.rate) ?? { rate: line.rate, net: 0, vat: 0 };
    group.net += line.net;
    group.vat += line.vat;
    groups.set(line.rate, group);
  }
  const subtotal = lines.reduce((sum, line) => sum + line.net, 0);
  const vatTotal = lines.reduce((sum, line) => sum + line.vat, 0);
  return { lines, vatByRate: [...groups.values()].sort((a, b) => a.rate - b.rate), subtotal, vatTotal, total: subtotal + vatTotal };
}

/** The due date, as YYYY-MM-DD, `days` after the issue date; '' when the issue date is not a date. */
export function dueDate(issue, days) {
  if (!isIsoDate(issue)) return '';
  const [year, month, day] = issue.split('-').map(Number);
  return addDays(utcDate(year, month, day), days).toISOString().slice(0, 10);
}

/** An invoice number one higher than `number` when it ends in digits, e.g. INV-0009 to INV-0010. */
export function nextInvoiceNumber(number) {
  const match = /^(.*?)(\d+)$/.exec(String(number ?? '').trim());
  if (!match) return `${String(number ?? '').trim() || 'INV-'}1`;
  const next = String(Number(match[2]) + 1).padStart(match[2].length, '0');
  return `${match[1]}${next}`;
}

/** The invoice as plain text, for pasting into an email or a message. `labels` holds the words. */
export function invoiceToText(invoice, labels, format) {
  const out = [`${labels.invoice} ${invoice.number}`.trim(), ''];
  if (invoice.seller.name) out.push(`${labels.from}: ${invoice.seller.name}`);
  if (invoice.buyer.name) out.push(`${labels.to}: ${invoice.buyer.name}`);
  if (invoice.issueDate) out.push(`${labels.issued}: ${invoice.issueDate}`);
  if (invoice.due) out.push(`${labels.due}: ${invoice.due}`);
  out.push('');
  for (const line of invoice.calc.lines) {
    out.push(`${line.description}: ${line.quantityMilli / 1000} x ${format(line.unitMinor)} = ${format(line.net)} (+ ${line.rate}% ${labels.vat})`);
  }
  out.push('');
  out.push(`${labels.subtotal}: ${format(invoice.calc.subtotal)} ${invoice.currency}`.trim());
  out.push(`${labels.vat}: ${format(invoice.calc.vatTotal)} ${invoice.currency}`.trim());
  out.push(`${labels.total}: ${format(invoice.calc.total)} ${invoice.currency}`.trim());
  return out.join('\n');
}
