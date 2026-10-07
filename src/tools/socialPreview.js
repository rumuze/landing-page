// Pure logic for the social share preview: what a link card shows, and the meta tags that make a
// page produce it. Each platform draws the card its own way and may change it; the page says the
// previews are approximations.

import { escapeHtml, normalizeUrl } from './emailSignature';

export const PLATFORMS = ['whatsapp', 'x', 'linkedin', 'facebook'];
export const TITLE_ADVICE = { min: 30, max: 60 };
export const DESCRIPTION_ADVICE = { min: 70, max: 160 };

/** The host of an address without "www.", or '' when it is not a usable web address. */
export function domainOf(text) {
  const href = normalizeUrl(text);
  if (!href) return '';
  return new URL(href).hostname.replace(/^www\./, '');
}

/** 'empty', 'short', 'good' or 'long' against a { min, max } range of characters. */
export function lengthStatus(text, { min, max }) {
  const length = [...String(text ?? '').trim()].length;
  if (length === 0) return 'empty';
  if (length < min) return 'short';
  return length > max ? 'long' : 'good';
}

/**
 * The tags to paste into the head of the page. Only a web address is written for the page and the
 * image; text is escaped. Tags with nothing to say are left out.
 */
export function buildMetaTags({ title, description, url, imageUrl, siteName, locale }) {
  const page = normalizeUrl(url);
  const image = normalizeUrl(imageUrl);
  const tags = [];
  const meta = (attribute, name, value) => {
    const text = String(value ?? '').trim();
    if (text) tags.push(`<meta ${attribute}="${name}" content="${escapeHtml(text)}">`);
  };
  meta('property', 'og:type', 'website');
  meta('property', 'og:title', title);
  meta('property', 'og:description', description);
  if (page) meta('property', 'og:url', page);
  if (image) meta('property', 'og:image', image);
  meta('property', 'og:site_name', siteName);
  meta('property', 'og:locale', locale);
  meta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
  meta('name', 'twitter:title', title);
  meta('name', 'twitter:description', description);
  if (image) meta('name', 'twitter:image', image);
  // The og:type line alone says nothing, so a form with no text gives no tags.
  return tags.length > 2 ? tags.join('\n') : '';
}

/** Splits one line of HTML into pieces for colouring: tag, attribute name, value and punctuation. */
export function tokenizeHtmlLine(line) {
  const tokens = [];
  const pattern = /(<\/?[a-zA-Z][\w-]*)|("[^"]*")|([\w:-]+)(?==)|(=|>|\/>)|(\s+)|([^\s<>="]+)/g;
  let match = pattern.exec(line);
  while (match) {
    if (match[1] !== undefined) tokens.push({ type: 'tag', text: match[1] });
    else if (match[2] !== undefined) tokens.push({ type: 'string', text: match[2] });
    else if (match[3] !== undefined) tokens.push({ type: 'key', text: match[3] });
    else if (match[4] !== undefined) tokens.push({ type: 'punct', text: match[4] });
    else if (match[5] !== undefined) tokens.push({ type: 'space', text: match[5] });
    else tokens.push({ type: 'literal', text: match[6] });
    match = pattern.exec(line);
  }
  return tokens;
}

export const EXAMPLE = {
  title: 'Example Studio: websites and stores for growing brands',
  description: 'We design and build fast websites and online stores in Arabic and English, and keep them running.',
  url: 'https://example.com',
  imageUrl: 'https://example.com/share.jpg',
  siteName: 'Example Studio',
};
