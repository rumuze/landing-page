// Turns the small request form on the service wave into a message the inbox can store.
import { phoneInboxEmail } from './inboxContact';

export const WAVE_REQUEST_MODES = ['order', 'explain', 'consult'];

const MODE_LABEL = {
  order: 'Order the service',
  explain: 'Explain the service',
  consult: 'Consultation',
};

/** Returns { type: 'email' | 'phone', value } or null when the text is neither. */
export function parseWaveContact(input) {
  const value = String(input || '').trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(value)) {
    return { type: 'email', value };
  }
  if (/^\+?[\d\s()-]{8,20}$/u.test(value)) {
    const digits = value.replace(/\D/gu, '');
    if (digits.length >= 8 && digits.length <= 15) return { type: 'phone', value: value.replace(/\s+/gu, ' ') };
  }
  return null;
}

/**
 * Builds the data the chat service needs: a name, an email the inbox accepts,
 * and a plain-text message that states the service, request type and contact.
 */
export function buildWaveThread({ service, mode, contact, note, locale = 'en' }) {
  const parsed = parseWaveContact(contact);
  if (!parsed) throw new Error('A phone number or email is required.');

  const email = parsed.type === 'email' ? parsed.value : phoneInboxEmail(parsed.value);
  const safeMode = WAVE_REQUEST_MODES.includes(mode) ? mode : 'order';

  const lines = [
    'Quick request from the service wave',
    '',
    `Service: ${service}`,
    `Request type: ${MODE_LABEL[safeMode]}`,
    `Page language: ${locale === 'ar' ? 'Arabic' : 'English'}`,
    `Contact (${parsed.type}): ${parsed.value}`,
    '',
    'Note',
    String(note || '').trim() || 'Not provided',
  ];

  return {
    name: locale === 'ar' ? 'طلب سريع' : 'Quick request',
    email,
    message: lines.join('\n'),
  };
}
