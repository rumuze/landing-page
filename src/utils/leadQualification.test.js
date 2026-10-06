import { describe, it, expect } from 'vitest';
import { assertValidEmail, normalizeEmail } from '../models/chat';
import {
  buildLeadThread,
  buildLeadThreadMessage,
  buildLeadThreadSubject,
  ensureUrlProtocol,
  EMPTY_LEAD_FORM,
  resolveLeadIntent,
  validateLeadQualification,
} from './leadQualification';

const valid = { ...EMPTY_LEAD_FORM, fullName: 'Sara Ahmed', workEmail: 'sara@example.com' };

describe('validateLeadQualification', () => {
  it('accepts a name with a work email', () => {
    expect(validateLeadQualification(valid)).toEqual({});
  });

  it('requires a name and a contact', () => {
    const errors = validateLeadQualification({ ...EMPTY_LEAD_FORM });
    expect(errors.fullName).toBe('required');
    expect(errors.workEmail).toBe('required');
  });

  it('rejects malformed emails', () => {
    expect(validateLeadQualification({ ...valid, workEmail: 'sara@' }).workEmail).toBe('email');
    expect(validateLeadQualification({ ...valid, workEmail: 'sara @x.com' }).workEmail).toBe('email');
  });

  it('accepts a WhatsApp number with enough digits and rejects short ones', () => {
    expect(validateLeadQualification({ ...valid, workEmail: '+20 100 006 1409' })).toEqual({});
    expect(validateLeadQualification({ ...valid, workEmail: '12345' }).workEmail).toBe('email');
  });

  it('validates an optional website only when given', () => {
    expect(validateLeadQualification({ ...valid, website: '' })).toEqual({});
    expect(validateLeadQualification({ ...valid, website: 'rumuze.com' })).toEqual({});
    expect(validateLeadQualification({ ...valid, website: 'http://' }).website).toBe('url');
  });
});

describe('ensureUrlProtocol', () => {
  it('adds https only when missing', () => {
    expect(ensureUrlProtocol('rumuze.com')).toBe('https://rumuze.com');
    expect(ensureUrlProtocol('http://rumuze.com')).toBe('http://rumuze.com');
    expect(ensureUrlProtocol('  ')).toBe('');
    expect(ensureUrlProtocol(undefined)).toBe('');
  });
});

describe('resolveLeadIntent', () => {
  it('falls back to discovery for unknown intents', () => {
    expect(resolveLeadIntent('audit')).toBe('audit');
    expect(resolveLeadIntent('<script>')).toBe('discovery');
    expect(resolveLeadIntent(undefined)).toBe('discovery');
  });
});

describe('thread text', () => {
  it('builds a subject from intent, company and engagement', () => {
    const subject = buildLeadThreadSubject({
      intent: 'audit',
      formData: { ...valid, companyName: 'Acme', engagementType: 'system-audit' },
    });
    expect(subject).toBe('Rumuze Intake | Audit | Acme | System Audit');
  });

  it('uses safe defaults when optional fields are empty', () => {
    const message = buildLeadThreadMessage({ intent: 'nope', formData: valid });
    expect(message).toContain('Intent: Discovery');
    expect(message).toContain('Systems currently used: Not provided');
    expect(message).toContain('Not provided');
    expect(message).toContain('Source: website-homepage');
  });
});

describe('buildLeadThread', () => {
  it('keeps an email as the address the inbox stores', () => {
    const thread = buildLeadThread({ intent: 'discovery', formData: valid, source: 'hero-primary' });
    expect(thread.email).toBe('sara@example.com');
    expect(thread.name).toBe('Sara Ahmed');
    expect(thread.message).toContain('- Work email: sara@example.com');
    expect(thread.message).not.toContain('Phone / WhatsApp');
  });

  it('stores a phone-only request under an address that cannot receive mail and writes the number in the message', () => {
    const thread = buildLeadThread({ intent: 'audit', formData: { ...valid, workEmail: '+20 100 006 1409' }, source: 'final-primary' });
    expect(thread.email).toBe('phone-201000061409@no-email.rumuze.invalid');
    expect(thread.message).toContain('- Work email: Not provided');
    expect(thread.message).toContain('- Phone / WhatsApp: +20 100 006 1409');
    expect(() => assertValidEmail(normalizeEmail(thread.email))).not.toThrow();
  });

  it('also accepts a number given in the WhatsApp field', () => {
    const thread = buildLeadThread({ intent: 'build', formData: { ...valid, workEmail: '', whatsapp: '01012345678' }, source: 'x' });
    expect(thread.email).toBe('phone-01012345678@no-email.rumuze.invalid');
    expect(thread.message).toContain('- Phone / WhatsApp: 01012345678');
  });
});
