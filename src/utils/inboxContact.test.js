import { describe, expect, it } from 'vitest';
import { inboxContactLabel, inboxEmailFor, phoneInboxEmail } from './inboxContact';

describe('inbox contact', () => {
  it('keeps an email and turns a phone number into an address that cannot receive mail', () => {
    expect(inboxEmailFor(' sara@example.com ')).toBe('sara@example.com');
    expect(inboxEmailFor('+20 100 006 1409')).toBe('phone-201000061409@no-email.rumuze.invalid');
    expect(phoneInboxEmail('(050) 123-4567')).toBe('phone-0501234567@no-email.rumuze.invalid');
  });

  it('shows admins a clear label instead of the placeholder address', () => {
    expect(inboxContactLabel('phone-1@no-email.rumuze.invalid')).toBe('Phone only: number is in the message');
    expect(inboxContactLabel('sara@example.com')).toBe('sara@example.com');
    expect(inboxContactLabel('')).toBe('No email');
  });
});
