// Pure logic for the structured-data (JSON-LD) generator. `buildSchema` makes the object,
// `checkSchema` says which fields are missing or malformed, `serializeSchema` makes the text.
// The checks follow common guidance; passing them does not promise a rich result.

export const SCHEMA_TYPES = ['Organization', 'LocalBusiness', 'FAQPage', 'Article'];

export const MAX_FAQ_ITEMS = 8;
export const HEADLINE_LIMIT = 110;

// level: required fields must be filled for the markup to be useful; recommended ones help.
export const SCHEMA_FIELDS = {
  Organization: [
    { id: 'name', kind: 'text', level: 'required' },
    { id: 'url', kind: 'url', level: 'required' },
    { id: 'logo', kind: 'url', level: 'recommended' },
    { id: 'email', kind: 'email', level: 'optional' },
    { id: 'telephone', kind: 'tel', level: 'optional' },
    { id: 'sameAs', kind: 'urls', level: 'recommended' },
  ],
  LocalBusiness: [
    { id: 'name', kind: 'text', level: 'required' },
    { id: 'url', kind: 'url', level: 'recommended' },
    { id: 'image', kind: 'url', level: 'recommended' },
    { id: 'telephone', kind: 'tel', level: 'recommended' },
    { id: 'street', kind: 'text', level: 'required' },
    { id: 'city', kind: 'text', level: 'required' },
    { id: 'region', kind: 'text', level: 'optional' },
    { id: 'postalCode', kind: 'text', level: 'optional' },
    { id: 'country', kind: 'country', level: 'required' },
    { id: 'hours', kind: 'text', level: 'optional' },
    { id: 'priceRange', kind: 'text', level: 'optional' },
  ],
  Article: [
    { id: 'headline', kind: 'headline', level: 'required' },
    { id: 'author', kind: 'text', level: 'required' },
    { id: 'datePublished', kind: 'date', level: 'required' },
    { id: 'dateModified', kind: 'date', level: 'optional' },
    { id: 'image', kind: 'url', level: 'recommended' },
    { id: 'url', kind: 'url', level: 'recommended' },
    { id: 'publisher', kind: 'text', level: 'optional' },
  ],
  FAQPage: [],
};

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

export function isWebUrl(value) {
  try {
    const url = new URL(value);
    return (url.protocol === 'https:' || url.protocol === 'http:') && url.hostname.includes('.');
  } catch {
    return false;
  }
}

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
export const isPhone = (value) => {
  const digits = value.replace(/\D/g, '');
  return /^[+\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
};
export const isCountryCode = (value) => /^[A-Za-z]{2}$/.test(value);

export function isIsoDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, year, month, day] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export const splitLines = (value) =>
  String(value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

/** The question and answer pairs that are complete, in order. */
export const completeFaq = (faq) =>
  (Array.isArray(faq) ? faq : [])
    .map((item) => ({ q: clean(item?.q), a: clean(item?.a) }))
    .filter((item) => item.q && item.a)
    .slice(0, MAX_FAQ_ITEMS);

export function buildSchema(type, values = {}) {
  const v = (id) => clean(values[id]);
  const out = { '@context': 'https://schema.org', '@type': type };
  const put = (key, value) => {
    if (value !== '' && value !== undefined && !(Array.isArray(value) && !value.length)) out[key] = value;
  };

  if (type === 'Organization') {
    put('name', v('name'));
    put('url', v('url'));
    put('logo', v('logo'));
    put('email', v('email'));
    put('telephone', v('telephone'));
    put('sameAs', splitLines(values.sameAs));
  } else if (type === 'LocalBusiness') {
    put('name', v('name'));
    put('url', v('url'));
    put('image', v('image'));
    put('telephone', v('telephone'));
    const address = { '@type': 'PostalAddress' };
    if (v('street')) address.streetAddress = v('street');
    if (v('city')) address.addressLocality = v('city');
    if (v('region')) address.addressRegion = v('region');
    if (v('postalCode')) address.postalCode = v('postalCode');
    if (v('country')) address.addressCountry = v('country').toUpperCase();
    if (Object.keys(address).length > 1) out.address = address;
    put('openingHours', v('hours'));
    put('priceRange', v('priceRange'));
  } else if (type === 'Article') {
    put('headline', v('headline'));
    if (v('author')) out.author = { '@type': 'Person', name: v('author') };
    put('datePublished', v('datePublished'));
    put('dateModified', v('dateModified'));
    put('image', v('image'));
    put('mainEntityOfPage', v('url'));
    if (v('publisher')) out.publisher = { '@type': 'Organization', name: v('publisher') };
  } else if (type === 'FAQPage') {
    put(
      'mainEntity',
      completeFaq(values.faq).map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    );
  }
  return out;
}

const KIND_CHECK = {
  url: isWebUrl,
  email: isEmail,
  tel: isPhone,
  country: isCountryCode,
  date: isIsoDate,
};

/**
 * One result per field: { id, level, status } where status is 'ok', 'missing', 'invalid' or
 * 'long' (a headline over the common limit). Optional fields that are empty are left out.
 * FAQPage gets one result per question and answer pair.
 */
export function checkSchema(type, values = {}) {
  const results = [];
  if (type === 'FAQPage') {
    const items = Array.isArray(values.faq) ? values.faq : [];
    const filled = items.filter((item) => clean(item?.q) || clean(item?.a));
    if (!filled.length) return [{ id: 'faq', level: 'required', status: 'missing' }];
    filled.forEach((item, index) => {
      const complete = clean(item.q) && clean(item.a);
      results.push({ id: `faq-${index}`, level: 'required', status: complete ? 'ok' : 'invalid', index });
    });
    return results;
  }

  for (const field of SCHEMA_FIELDS[type] ?? []) {
    if (field.kind === 'urls') {
      const lines = splitLines(values[field.id]);
      if (!lines.length) {
        if (field.level !== 'optional') results.push({ id: field.id, level: field.level, status: 'missing' });
      } else {
        results.push({ id: field.id, level: field.level, status: lines.every(isWebUrl) ? 'ok' : 'invalid' });
      }
      continue;
    }
    const value = clean(values[field.id]);
    if (!value) {
      if (field.level !== 'optional') results.push({ id: field.id, level: field.level, status: 'missing' });
      continue;
    }
    let status = 'ok';
    if (field.kind === 'headline') status = value.length > HEADLINE_LIMIT ? 'long' : 'ok';
    else if (KIND_CHECK[field.kind] && !KIND_CHECK[field.kind](value)) status = 'invalid';
    results.push({ id: field.id, level: field.level, status });
  }
  return results;
}

/** Share of the required fields that are filled and valid, 0 to 1. */
export function readiness(type, values = {}) {
  const required = checkSchema(type, values).filter((item) => item.level === 'required');
  if (!required.length) return 0;
  return required.filter((item) => item.status === 'ok').length / required.length;
}

/**
 * The text to paste into a page. A "<" inside a value is written as \u003c so a value can
 * never close the script tag early.
 */
export function serializeSchema(schema) {
  const json = JSON.stringify(schema, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

/** Splits one line of the output into pieces for colouring: key, string, number/literal, punctuation, tag. */
export function tokenizeLine(line) {
  const tokens = [];
  const pattern = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+(?:\.\d+)?|true|false|null)|([{}[\],])|(<\/?script[^>]*>)|(\s+)|([^\s]+)/g;
  let match = pattern.exec(line);
  while (match) {
    if (match[1] !== undefined) tokens.push({ type: match[2] ? 'key' : 'string', text: match[1] });
    if (match[2]) tokens.push({ type: 'punct', text: match[2] });
    else if (match[3] !== undefined) tokens.push({ type: 'literal', text: match[3] });
    else if (match[4] !== undefined) tokens.push({ type: 'punct', text: match[4] });
    else if (match[5] !== undefined) tokens.push({ type: 'tag', text: match[5] });
    else if (match[6] !== undefined) tokens.push({ type: 'space', text: match[6] });
    else if (match[7] !== undefined) tokens.push({ type: 'punct', text: match[7] });
    match = pattern.exec(line);
  }
  return tokens;
}

export const EXAMPLES = {
  Organization: {
    name: 'Example Studio',
    url: 'https://example.com',
    logo: 'https://example.com/logo.png',
    email: 'hello@example.com',
    telephone: '+966 55 123 4567',
    sameAs: 'https://www.linkedin.com/company/example\nhttps://x.com/example',
  },
  LocalBusiness: {
    name: 'Example Coffee',
    url: 'https://example.com',
    image: 'https://example.com/shop.jpg',
    telephone: '+966 11 123 4567',
    street: '12 King Fahd Road',
    city: 'Riyadh',
    region: 'Riyadh Province',
    postalCode: '12211',
    country: 'SA',
    hours: 'Mo-Su 08:00-23:00',
    priceRange: '$$',
  },
  Article: {
    headline: 'How to choose an online store platform',
    author: 'Example Team',
    datePublished: '2026-01-15',
    dateModified: '',
    image: 'https://example.com/cover.jpg',
    url: 'https://example.com/blog/choose-platform',
    publisher: 'Example Studio',
  },
  FAQPage: {
    faq: [
      { q: 'How long does delivery take?', a: 'Between three and five working days.' },
      { q: 'Do you ship abroad?', a: 'Yes, to all Gulf countries.' },
    ],
  },
};
