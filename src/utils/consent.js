// Analytics consent. Visit tracking only runs after the visitor accepts.
// Stored under one key so it can be read, changed, or withdrawn in one place.

const CONSENT_KEY = 'rumuze.consent.analytics';
const CONSENT_EVENT = 'rumuze:consent-change';
const TRACKING_KEY_PREFIX = 'rumuze.visit.';

export const CONSENT_GRANTED = 'granted';
export const CONSENT_DENIED = 'denied';
export const CONSENT_UNSET = 'unset';

export function readConsent() {
  if (typeof window === 'undefined') return CONSENT_UNSET;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === CONSENT_GRANTED || value === CONSENT_DENIED ? value : CONSENT_UNSET;
  } catch {
    return CONSENT_UNSET;
  }
}

function clearTrackingIds() {
  for (const storage of [window.localStorage, window.sessionStorage]) {
    try {
      Object.keys(storage)
        .filter((key) => key.startsWith(TRACKING_KEY_PREFIX))
        .forEach((key) => storage.removeItem(key));
    } catch {
      // Storage can be unavailable (private mode); nothing to clear.
    }
  }
}

/** value: 'granted' | 'denied' | null (null forgets the choice and asks again). */
export function writeConsent(value) {
  try {
    if (value === CONSENT_GRANTED || value === CONSENT_DENIED) {
      window.localStorage.setItem(CONSENT_KEY, value);
    } else {
      window.localStorage.removeItem(CONSENT_KEY);
    }
  } catch {
    // Without storage the choice only lasts for this page view.
  }

  if (value !== CONSENT_GRANTED) clearTrackingIds();
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: readConsent() }));
}

export function subscribeToConsent(callback) {
  const handler = () => callback(readConsent());
  window.addEventListener(CONSENT_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(CONSENT_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
