// Pure logic for the UTM link builder.

/** Common source / medium pairs, named the way Google Analytics expects (lower case, underscores). */
export const UTM_PRESETS = [
  { id: 'google-ads', label: 'Google Ads', source: 'google', medium: 'cpc' },
  { id: 'meta-ads', label: 'Facebook / Instagram Ads', source: 'facebook', medium: 'paid_social' },
  { id: 'snapchat-ads', label: 'Snapchat Ads', source: 'snapchat', medium: 'paid_social' },
  { id: 'tiktok-ads', label: 'TikTok Ads', source: 'tiktok', medium: 'paid_social' },
  { id: 'linkedin', label: 'LinkedIn', source: 'linkedin', medium: 'social' },
  { id: 'newsletter', label: 'Email newsletter', source: 'newsletter', medium: 'email' },
  { id: 'whatsapp', label: 'WhatsApp', source: 'whatsapp', medium: 'messaging' },
  { id: 'qr', label: 'QR code', source: 'qr', medium: 'offline' },
];

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

/** Trims, and by default lower-cases and turns runs of spaces into underscores. */
export function normalizeValue(value, { lowercase = true, underscores = true } = {}) {
  let result = String(value ?? '').trim();
  if (underscores) result = result.replace(/\s+/g, '_');
  if (lowercase) result = result.toLowerCase();
  return result;
}

/**
 * Reads the page address. A missing scheme is assumed to be https.
 * @returns {{ ok: true, url: URL } | { ok: false, error: 'empty' | 'invalid' | 'protocol' }}
 */
export function parseTargetUrl(input) {
  const typed = String(input ?? '').trim();
  if (!typed) return { ok: false, error: 'empty' };
  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(typed) ? typed : `https://${typed}`;
  let url;
  try {
    url = new URL(withScheme);
  } catch {
    return { ok: false, error: 'invalid' };
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return { ok: false, error: 'protocol' };
  if (!url.hostname.includes('.') && url.hostname !== 'localhost') return { ok: false, error: 'invalid' };
  return { ok: true, url };
}

/**
 * Adds the campaign parameters to a page address. Parameters already in the address are kept,
 * except utm_* ones, which are replaced; the #fragment stays at the end.
 * @returns {{ ok: true, url: string, params: Array<[string, string]> }
 *   | { ok: false, errors: Record<string, string> }}
 */
export function buildUtmUrl(fields, options = {}) {
  const errors = {};
  const target = parseTargetUrl(fields.url);
  if (!target.ok) errors.url = target.error;

  const values = {
    utm_source: normalizeValue(fields.source, options),
    utm_medium: normalizeValue(fields.medium, options),
    utm_campaign: normalizeValue(fields.campaign, options),
    utm_term: normalizeValue(fields.term, options),
    utm_content: normalizeValue(fields.content, options),
  };
  if (!values.utm_source) errors.source = 'required';
  if (!values.utm_medium) errors.medium = 'required';
  if (!values.utm_campaign) errors.campaign = 'required';
  if (Object.keys(errors).length) return { ok: false, errors };

  const { url } = target;
  for (const key of [...url.searchParams.keys()]) {
    if (key.toLowerCase().startsWith('utm_')) url.searchParams.delete(key);
  }
  const params = UTM_KEYS.filter((key) => values[key]).map((key) => [key, values[key]]);
  for (const [key, value] of params) url.searchParams.append(key, value);
  return { ok: true, url: url.toString(), params };
}
