import { describe, expect, it } from 'vitest';
import { assertNonEmptyValue, assertValidEmail, normalizeEmail, sanitizeLine, sanitizeMultiline } from '../models/chat';
import { buildWaveThread, parseWaveContact } from './serviceWaveRequest';

describe('service wave contact', () => {
  it.each([
    ['mona@example.com', 'email'],
    ['  mona@example.co.uk ', 'email'],
    ['01012345678', 'phone'],
    ['+20 101 234 5678', 'phone'],
    ['+966 (50) 123-4567', 'phone'],
  ])('accepts %s as %s', (input, type) => {
    expect(parseWaveContact(input)?.type).toBe(type);
  });

  it.each(['', '   ', 'abc', '123', 'mona@', '@example.com', 'mona@example', '1234567890123456789', 'call me maybe'])(
    'rejects %j',
    (input) => {
      expect(parseWaveContact(input)).toBeNull();
    },
  );
});

describe('service wave request', () => {
  it('uses the visitor email when one is given', () => {
    const thread = buildWaveThread({ service: 'ERP', mode: 'consult', contact: 'mona@example.com', note: 'stock', locale: 'ar' });
    expect(thread.email).toBe('mona@example.com');
    expect(thread.name).toBe('طلب سريع');
    expect(thread.message).toContain('Service: ERP');
    expect(thread.message).toContain('Request type: Consultation');
    expect(thread.message).toContain('Contact (email): mona@example.com');
    expect(thread.message).toContain('stock');
  });

  it('keeps a phone number readable and uses an address that can never receive mail', () => {
    const thread = buildWaveThread({ service: 'Odoo', mode: 'order', contact: '+20 101 234 5678', note: '' });
    expect(thread.email).toBe('phone-201012345678@no-email.rumuze.invalid');
    expect(thread.message).toContain('Contact (phone): +20 101 234 5678');
    expect(thread.message).toContain('Not provided');
    expect(thread.name).toBe('Quick request');
  });

  it('falls back to a plain order for an unknown request type and refuses a bad contact', () => {
    expect(buildWaveThread({ service: 'SEO', mode: 'nonsense', contact: '01012345678' }).message).toContain('Request type: Order the service');
    expect(() => buildWaveThread({ service: 'SEO', mode: 'order', contact: 'nope' })).toThrow();
  });
});

describe('service wave request and the inbox rules', () => {
  it.each(['mona@example.com', '+20 101 234 5678', '01012345678'])('is accepted by the same checks the inbox applies (%s)', (contact) => {
    const thread = buildWaveThread({ service: 'ERP', mode: 'order', contact, note: 'x'.repeat(600), locale: 'ar' });
    expect(() => assertNonEmptyValue(sanitizeLine(thread.name), 'name')).not.toThrow();
    expect(() => assertValidEmail(normalizeEmail(thread.email))).not.toThrow();
    const message = sanitizeMultiline(thread.message);
    expect(message.length).toBeGreaterThan(0);
    expect(message.length).toBeLessThanOrEqual(5000); // the database rule for a thread's last message
    expect(normalizeEmail(thread.email).length).toBeLessThanOrEqual(320);
  });
});
