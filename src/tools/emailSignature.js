// Pure logic for the email signature generator. Every piece of text the visitor types is escaped
// before it goes into the HTML, and links are limited to web addresses, so the signature can be
// pasted into a mail client without carrying anything it should not.

import { isWebUrl } from './schema';

export const TEMPLATES = ['classic', 'bar', 'compact'];
const DEFAULT_ACCENT = '#006b54';

const HEX = /^#[0-9a-f]{6}$/i;

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const escapeHtml = (text) => String(text ?? '').replace(/[&<>"']/g, (char) => ESCAPES[char]);

export const isHexColor = (value) => HEX.test(String(value ?? ''));

/** A web address with https added when missing, or null when it is not a usable http(s) address. */
export function normalizeUrl(text) {
  const typed = String(text ?? '').trim();
  if (!typed) return null;
  const href = /^[a-z][a-z0-9+.-]*:/i.test(typed) ? typed : `https://${typed}`;
  return isWebUrl(href) ? href : null;
}

/** A tel: link from a typed number: digits and a leading +, or null when it has fewer than 7 digits. */
export function telHref(text) {
  const typed = String(text ?? '').trim();
  const digits = typed.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return null;
  return `tel:${typed.startsWith('+') ? '+' : ''}${digits}`;
}

export const isEmail = (text) => /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/.test(String(text ?? '').trim());

const clean = (value) => String(value ?? '').trim();

export function initialsOf(name) {
  const letters = clean(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => [...word][0]);
  return letters.join('').toUpperCase();
}

const FONT = "font-family:Arial,Helvetica,sans-serif;";

function contactLines(values, accent, link) {
  const lines = [];
  const phone = clean(values.phone);
  const email = clean(values.email);
  const website = normalizeUrl(values.website);
  if (phone) {
    const href = telHref(phone);
    lines.push({ label: 'T', html: href ? link(href, phone) : escapeHtml(phone) });
  }
  if (isEmail(email)) lines.push({ label: 'E', html: link(`mailto:${email}`, email) });
  if (website) lines.push({ label: 'W', html: link(website, clean(values.website).replace(/^https?:\/\//i, '').replace(/\/$/, '')) });
  if (clean(values.address)) lines.push({ label: 'A', html: escapeHtml(clean(values.address)) });
  return lines.map((line) => ({ ...line, accent }));
}

/**
 * The signature as a table with inline styles, which mail clients keep. `preview` swaps the logo image
 * for the initials, so showing the signature on the page never asks another site for a picture.
 */
export function buildSignatureHtml(values, { template = 'classic', accent = DEFAULT_ACCENT, preview = false } = {}) {
  const name = clean(values.name);
  if (!name) return '';
  const color = isHexColor(accent) ? accent : DEFAULT_ACCENT;
  const link = (href, text) => `<a href="${escapeHtml(href)}" style="color:#334155;text-decoration:none;">${escapeHtml(text)}</a>`;
  const title = [clean(values.title), clean(values.company)].filter(Boolean);
  const titleHtml = title.length ? `<div style="font-size:13px;color:#475569;margin-top:2px;">${title.map(escapeHtml).join(' &middot; ')}</div>` : '';
  const lines = contactLines(values, color, link);

  const logoUrl = normalizeUrl(values.logo);
  const logoSize = template === 'compact' ? 0 : 64;
  let logo = '';
  if (logoSize) {
    if (logoUrl && !preview) {
      logo = `<img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(clean(values.company) || name)}" width="${logoSize}" height="${logoSize}" style="display:block;border:0;border-radius:8px;" />`;
    } else {
      logo = `<div style="width:${logoSize}px;height:${logoSize}px;border-radius:8px;background:${color};color:#ffffff;font-size:22px;font-weight:bold;line-height:${logoSize}px;text-align:center;${FONT}">${escapeHtml(initialsOf(name))}</div>`;
    }
  }

  const contact = lines
    .map((line) => `<div style="font-size:13px;color:#334155;line-height:1.7;"><span style="color:${color};font-weight:bold;">${line.label}</span>&nbsp; ${line.html}</div>`)
    .join('');

  if (template === 'compact') {
    const parts = [
      title.map(escapeHtml).join(' &middot; '),
      ...lines.filter((line) => line.label !== 'A').map((line) => line.html),
    ].filter(Boolean);
    return `<table cellpadding="0" cellspacing="0" border="0" style="${FONT}"><tr><td style="font-size:14px;color:#0f172a;"><strong>${escapeHtml(name)}</strong></td></tr>${
      parts.length ? `<tr><td style="font-size:12px;color:#475569;padding-top:2px;">${parts.join(` <span style="color:${color};">|</span> `)}</td></tr>` : ''
    }</table>`;
  }

  const text = `<div style="font-size:16px;font-weight:bold;color:#0f172a;">${escapeHtml(name)}</div>${titleHtml}<div style="margin-top:8px;">${contact}</div>`;
  if (template === 'bar') {
    return `<table cellpadding="0" cellspacing="0" border="0" style="${FONT}"><tr><td style="padding-right:14px;vertical-align:top;">${logo}</td><td style="border-left:3px solid ${color};padding-left:14px;vertical-align:top;">${text}</td></tr></table>`;
  }
  return `<table cellpadding="0" cellspacing="0" border="0" style="${FONT}"><tr><td style="vertical-align:top;padding-bottom:8px;">${logo}</td></tr><tr><td style="border-top:2px solid ${color};padding-top:10px;">${text}</td></tr></table>`;
}

/** The same signature as plain text, for clients that cannot show a rich one. */
export function buildSignatureText(values) {
  const name = clean(values.name);
  if (!name) return '';
  const lines = [name, [clean(values.title), clean(values.company)].filter(Boolean).join(', ')];
  if (clean(values.phone)) lines.push(clean(values.phone));
  if (isEmail(values.email)) lines.push(clean(values.email));
  if (normalizeUrl(values.website)) lines.push(clean(values.website));
  if (clean(values.address)) lines.push(clean(values.address));
  return lines.filter(Boolean).join('\n');
}

export const EXAMPLE = {
  name: 'Sara Al-Harbi',
  title: 'Head of Marketing',
  company: 'Example Studio',
  phone: '+966 55 123 4567',
  email: 'sara@example.com',
  website: 'example.com',
  address: 'King Fahd Road, Riyadh',
  logo: '',
};

const BLOCK = /<\/?(?:table|tbody|tr|td|div)\b[^>]*>/gi;

/**
 * The signature HTML laid out for reading: each table or block tag on its own line, indented by how
 * deep it is, with the inline pieces (links, spans, images, text) kept together on the line between.
 */
export function formatHtml(html) {
  const lines = [];
  let depth = 0;
  let last = 0;
  const text = String(html);
  const push = (piece, delta) => {
    if (delta < 0) depth = Math.max(0, depth + delta);
    lines.push(`${'  '.repeat(depth)}${piece}`);
    if (delta > 0) depth += delta;
  };
  for (const match of text.matchAll(BLOCK)) {
    const between = text.slice(last, match.index).trim();
    if (between) push(between, 0);
    const tag = match[0];
    push(tag, tag.startsWith('</') ? -1 : 1);
    last = match.index + tag.length;
  }
  const rest = text.slice(last).trim();
  if (rest) push(rest, 0);
  return lines;
}
