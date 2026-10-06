// The inbox stores every request under an email address. A visitor who gives only a
// phone number still gets a request in the inbox: it is stored under an address that
// can never receive mail (`.invalid` is a reserved name), and the real phone number is
// written in the message itself.

const PHONE_PLACEHOLDER_DOMAIN = 'no-email.rumuze.invalid';

/** `phone-<digits>@no-email.rumuze.invalid` for a phone number. */
export function phoneInboxEmail(phone) {
  return `phone-${String(phone || '').replace(/\D/gu, '')}@${PHONE_PLACEHOLDER_DOMAIN}`;
}

/** The address to store a contact under: the email itself, or the placeholder for a phone number. */
export function inboxEmailFor(contact) {
  const value = String(contact || '').trim();
  return value.includes('@') ? value : phoneInboxEmail(value);
}

const isPlaceholderInboxEmail = (email) => String(email || '').endsWith(`@${PHONE_PLACEHOLDER_DOMAIN}`);

/** What the admin screens show for a thread's address: a phone-only request says so instead of a fake email. */
export function inboxContactLabel(email) {
  if (!email) return 'No email';
  return isPlaceholderInboxEmail(email) ? 'Phone only: number is in the message' : email;
}
