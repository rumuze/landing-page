// Pieces of the favicon generator that need no canvas: sizes, shapes, the ICO container and the
// HTML and manifest text that go with the files.

export const SIZES = [
  { id: 'ico16', size: 16, file: 'favicon-16x16.png' },
  { id: 'ico32', size: 32, file: 'favicon-32x32.png' },
  { id: 'apple', size: 180, file: 'apple-touch-icon.png' },
  { id: 'android192', size: 192, file: 'android-chrome-192x192.png' },
  { id: 'android512', size: 512, file: 'android-chrome-512x512.png' },
];

export const SHAPES = ['square', 'rounded', 'circle'];

/** Corner radius that draws each shape on a square of `size` pixels. */
export function cornerRadius(shape, size) {
  if (shape === 'circle') return size / 2;
  if (shape === 'rounded') return Math.round(size * 0.22);
  return 0;
}

/** What goes on the icon: the first two letters or symbols the visitor typed, kept as whole characters. */
export function glyphOf(text) {
  return graphemes(String(text ?? '').trim().replace(/\s+/g, ' '))
    .slice(0, 2)
    .join('');
}

// A character as a person sees it: an emoji made of several code points (a family, a profession) stays whole.
function graphemes(text) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text), (part) => part.segment);
  }
  return Array.from(text);
}

/** Font size, as a share of the icon, that keeps one or two characters inside it. */
export function glyphScale(glyph) {
  const length = graphemes(glyph).length;
  if (length <= 1) return 0.62;
  return 0.46;
}

const HEX = /^#[0-9a-fA-F]{6}$/;
export const isHex = (value) => HEX.test(String(value ?? ''));

/** The ICO container around PNG images (the format browsers read for /favicon.ico). */
export function buildIco(images) {
  const count = images.length;
  const header = 6 + 16 * count;
  const total = images.reduce((sum, image) => sum + image.data.length, header);
  const bytes = new Uint8Array(total);
  const view = new DataView(bytes.buffer);
  view.setUint16(2, 1, true);
  view.setUint16(4, count, true);
  let offset = header;
  images.forEach((image, index) => {
    const at = 6 + 16 * index;
    bytes[at] = image.size >= 256 ? 0 : image.size;
    bytes[at + 1] = image.size >= 256 ? 0 : image.size;
    view.setUint16(at + 4, 1, true);
    view.setUint16(at + 6, 32, true);
    view.setUint32(at + 8, image.data.length, true);
    view.setUint32(at + 12, offset, true);
    bytes.set(image.data, offset);
    offset += image.data.length;
  });
  return bytes;
}

/** Lines to paste inside <head>. */
function headSnippet({ withIco = true } = {}) {
  return [
    withIco ? '<link rel="icon" href="/favicon.ico" sizes="any">' : null,
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">',
    '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
    '<link rel="manifest" href="/site.webmanifest">',
    '<meta name="theme-color" content="THEME">',
  ]
    .filter(Boolean)
    .join('\n');
}

/** The web app manifest that points at the two Android icons. */
export function manifestJson({ name, color }) {
  const label = String(name ?? '').trim() || 'My site';
  return JSON.stringify(
    {
      name: label,
      short_name: label.length > 12 ? label.slice(0, 12).trim() : label,
      icons: [
        { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: isHex(color) ? color : '#000000',
      background_color: '#ffffff',
      display: 'standalone',
    },
    null,
    2,
  );
}

/** The head snippet with the theme colour filled in. */
export function headWithColor(color, options) {
  return headSnippet(options).replace('THEME', isHex(color) ? color : '#000000');
}
