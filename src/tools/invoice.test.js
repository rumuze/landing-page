import { describe, expect, it } from 'vitest';
import { RATE_CHOICES, calcInvoice, dueDate, invoiceToText, lineNet, nextInvoiceNumber, parseQuantity, parseUnitPrice } from './invoice';
import { formatMinor } from './vat';

describe('parseUnitPrice and parseQuantity', () => {
  it('reads prices into minor units, with Arabic digits and separators', () => {
    expect(parseUnitPrice('1,250.5')).toBe(125050);
    expect(parseUnitPrice('٩٩٫٥٠')).toBe(9950);
    expect(parseUnitPrice('0')).toBe(0);
    for (const bad of ['', '-1', '1.234', 'x', '99999999999999']) expect(parseUnitPrice(bad), bad).toBeNull();
  });
  it('reads quantities into thousandths and refuses zero and too many decimals', () => {
    expect(parseQuantity('2')).toBe(2000);
    expect(parseQuantity('0.5')).toBe(500);
    expect(parseQuantity('1.125')).toBe(1125);
    for (const bad of ['', '0', '1.2345', '-3', 'a', '2000000']) expect(parseQuantity(bad), bad).toBeNull();
  });
});

describe('lineNet', () => {
  it('multiplies and rounds half up to the minor unit', () => {
    expect(lineNet(2000, 5000)).toBe(10000);
    expect(lineNet(500, 5001)).toBe(2501); // 25.005 rounds up
    expect(lineNet(333, 100)).toBe(33); // 0.333 of 1.00
    expect(lineNet(1000, 0)).toBe(0);
  });
  it('stays exact for large amounts', () => {
    // 1,000,000 units at 1,000,000,000.00 each is 10^15 major units, 10^17 minor units.
    expect(lineNet(1_000_000_000, 100_000_000_000)).toBe(1e17);
  });
});

describe('calcInvoice', () => {
  const items = [
    { description: 'Design', quantityMilli: 1000, unitMinor: 250000, rate: 15 },
    { description: 'Hosting', quantityMilli: 12000, unitMinor: 3000, rate: 15 },
    { description: 'Training', quantityMilli: 2000, unitMinor: 10000, rate: 0 },
    { description: '', quantityMilli: 1000, unitMinor: 100, rate: 15 },
    { description: 'No price', quantityMilli: 1000, unitMinor: null, rate: 15 },
  ];
  it('prices the complete lines and skips the rest', () => {
    const result = calcInvoice(items);
    expect(result.lines.map((line) => line.description)).toEqual(['Design', 'Hosting', 'Training']);
    expect(result.lines[0]).toMatchObject({ net: 250000, vat: 37500, gross: 287500 });
    expect(result.lines[1]).toMatchObject({ net: 36000, vat: 5400 });
  });
  it('adds up: the lines sum to the totals, and the groups sum to the VAT total', () => {
    const result = calcInvoice(items);
    expect(result.subtotal).toBe(250000 + 36000 + 20000);
    expect(result.vatTotal).toBe(37500 + 5400 + 0);
    expect(result.total).toBe(result.subtotal + result.vatTotal);
    expect(result.vatByRate).toEqual([
      { rate: 0, net: 20000, vat: 0 },
      { rate: 15, net: 286000, vat: 42900 },
    ]);
    expect(result.vatByRate.reduce((sum, group) => sum + group.vat, 0)).toBe(result.vatTotal);
  });
  it('is zero with no lines', () => {
    expect(calcInvoice([])).toEqual({ lines: [], vatByRate: [], subtotal: 0, vatTotal: 0, total: 0 });
  });
  it('rounds each line, so many small lines still add up exactly', () => {
    const many = Array.from({ length: 10 }, (_, index) => ({ description: `L${index}`, quantityMilli: 1000, unitMinor: 7, rate: 5 }));
    const result = calcInvoice(many);
    expect(result.lines.every((line) => line.vat === 0)).toBe(true);
    expect(result.total).toBe(70);
    expect(RATE_CHOICES).toContain(15);
  });
});

describe('dates and numbers', () => {
  it('works out the due date', () => {
    expect(dueDate('2026-01-15', 30)).toBe('2026-02-14');
    expect(dueDate('2026-12-20', 14)).toBe('2027-01-03');
    expect(dueDate('2026-01-15', 0)).toBe('2026-01-15');
    expect(dueDate('15/01/2026', 7)).toBe('');
  });
  it('raises the number at the end of an invoice number', () => {
    expect(nextInvoiceNumber('INV-0009')).toBe('INV-0010');
    expect(nextInvoiceNumber('2026/99')).toBe('2026/100');
    expect(nextInvoiceNumber('A')).toBe('A1');
    expect(nextInvoiceNumber('')).toBe('INV-1');
  });
});

describe('invoiceToText', () => {
  it('lists the lines and the totals', () => {
    const calc = calcInvoice([{ description: 'Design', quantityMilli: 1000, unitMinor: 100000, rate: 15 }]);
    const text = invoiceToText(
      { number: 'INV-1', seller: { name: 'Studio' }, buyer: { name: 'Client' }, issueDate: '2026-01-15', due: '2026-02-14', currency: 'SAR', calc },
      { invoice: 'Invoice', from: 'From', to: 'To', issued: 'Issued', due: 'Due', vat: 'VAT', subtotal: 'Subtotal', total: 'Total' },
      formatMinor,
    );
    expect(text).toContain('Invoice INV-1');
    expect(text).toContain('Design: 1 x 1,000.00 = 1,000.00 (+ 15% VAT)');
    expect(text).toContain('Total: 1,150.00 SAR');
  });
});
