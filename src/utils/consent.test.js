import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function createStorage(initial = {}) {
  const storage = { ...initial };
  for (const [name, fn] of Object.entries({
    getItem: (key) => (Object.hasOwn(storage, key) ? storage[key] : null),
    setItem: (key, value) => {
      storage[key] = String(value);
    },
    removeItem: (key) => {
      delete storage[key];
    },
  })) {
    Object.defineProperty(storage, name, { value: fn, enumerable: false });
  }
  return storage;
}

let consent;

beforeEach(async () => {
  const listeners = new Map();
  vi.stubGlobal('window', {
    localStorage: createStorage({ 'rumuze.visit.visitorId': 'v1', theme: 'dark' }),
    sessionStorage: createStorage({ 'rumuze.visit.sessionId': 's1' }),
    addEventListener: (type, fn) => listeners.set(type, [...(listeners.get(type) ?? []), fn]),
    removeEventListener: (type, fn) =>
      listeners.set(type, (listeners.get(type) ?? []).filter((item) => item !== fn)),
    dispatchEvent: (event) => (listeners.get(event.type) ?? []).forEach((fn) => fn(event)),
  });
  vi.resetModules();
  consent = await import('./consent');
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('consent', () => {
  it('starts unset', () => {
    expect(consent.readConsent()).toBe(consent.CONSENT_UNSET);
  });

  it('stores an accepted choice and keeps tracking ids', () => {
    consent.writeConsent(consent.CONSENT_GRANTED);
    expect(consent.readConsent()).toBe(consent.CONSENT_GRANTED);
    expect(window.localStorage.getItem('rumuze.visit.visitorId')).toBe('v1');
  });

  it('clears tracking ids (and only those) when declined', () => {
    consent.writeConsent(consent.CONSENT_DENIED);
    expect(consent.readConsent()).toBe(consent.CONSENT_DENIED);
    expect(window.localStorage.getItem('rumuze.visit.visitorId')).toBeNull();
    expect(window.sessionStorage.getItem('rumuze.visit.sessionId')).toBeNull();
    expect(window.localStorage.getItem('theme')).toBe('dark');
  });

  it('forgets the choice with null so the banner asks again', () => {
    consent.writeConsent(consent.CONSENT_GRANTED);
    consent.writeConsent(null);
    expect(consent.readConsent()).toBe(consent.CONSENT_UNSET);
  });

  it('notifies subscribers until they unsubscribe', () => {
    const seen = [];
    const unsubscribe = consent.subscribeToConsent((value) => seen.push(value));
    consent.writeConsent(consent.CONSENT_GRANTED);
    unsubscribe();
    consent.writeConsent(consent.CONSENT_DENIED);
    expect(seen).toEqual([consent.CONSENT_GRANTED]);
  });

  it('ignores unknown stored values', () => {
    window.localStorage.setItem('rumuze.consent.analytics', 'maybe');
    expect(consent.readConsent()).toBe(consent.CONSENT_UNSET);
  });
});
