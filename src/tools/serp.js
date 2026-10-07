// Pure logic for the Google result preview and the title / description counters.
// The limits are common guidance, not rules Google publishes: Google decides how much to
// show from the width of the text on the device, so the preview is an approximation.

export const LIMITS = {
  title: { min: 30, max: 60 },
  description: { min: 70, max: 160 },
};

// Approximate line widths in pixels, and how many lines are shown, per device.
export const LAYOUT = {
  desktop: { title: { width: 600, lines: 1 }, description: { width: 640, lines: 2 } },
  mobile: { title: { width: 320, lines: 2 }, description: { width: 320, lines: 3 } },
};

/** Characters as people count them (an emoji or a letter with a mark is one, not two). */
export const countChars = (text) => Array.from(String(text ?? '').trim()).length;

export const countWords = (text) => String(text ?? '').trim().split(/\s+/).filter(Boolean).length;

/** 'empty' | 'short' | 'good' | 'long', against a { min, max } range. */
export function lengthStatus(length, { min, max }) {
  if (length === 0) return 'empty';
  if (length < min) return 'short';
  if (length > max) return 'long';
  return 'good';
}

const range = (from, to) => `${String.fromCodePoint(from)}-${String.fromCodePoint(to)}`;
const RTL_LETTER = new RegExp(`[${range(0x0590, 0x08ff)}${range(0xfb1d, 0xfdff)}${range(0xfe70, 0xfeff)}]`, 'g');
const LTR_LETTER = new RegExp(`[A-Za-z${range(0x00c0, 0x024f)}]`, 'g');

/** True when the text is mostly Arabic or Hebrew, so the preview should read right to left. */
export function isRtlText(text) {
  const value = String(text ?? '');
  return (value.match(RTL_LETTER)?.length ?? 0) > (value.match(LTR_LETTER)?.length ?? 0);
}

/**
 * Breaks `text` into at most `maxLines` lines no wider than `maxWidth`, cutting words at spaces
 * (and long words anywhere), and ends the last line with "…" when text was left out.
 * `measure(string)` returns the width in pixels.
 * @returns {{ lines: string[], truncated: boolean }}
 */
export function fitLines(text, { width: maxWidth, lines: maxLines }, measure) {
  const words = String(text ?? '').trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  let index = 0;

  while (index < words.length && lines.length < maxLines) {
    const word = words[index];
    const candidate = current ? `${current} ${word}` : word;
    if (measure(candidate) <= maxWidth) {
      current = candidate;
      index += 1;
    } else if (current) {
      lines.push(current);
      current = '';
    } else {
      // One word wider than a line: take as many characters as fit.
      let piece = '';
      for (const char of Array.from(word)) {
        if (measure(piece + char) > maxWidth) break;
        piece += char;
      }
      piece = piece || Array.from(word)[0];
      lines.push(piece);
      words[index] = Array.from(word).slice(Array.from(piece).length).join('');
      if (!words[index]) index += 1;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);

  const truncated = index < words.length;
  if (truncated && lines.length) {
    let last = lines[lines.length - 1];
    while (last && measure(`${last}…`) > maxWidth) last = Array.from(last).slice(0, -1).join('').trimEnd();
    lines[lines.length - 1] = `${last}…`;
  }
  return { lines, truncated };
}

/** The address as Google shows it: host, then the path as a breadcrumb. */
export function breadcrumbUrl(input) {
  const typed = String(input ?? '').trim();
  if (!typed) return { host: 'example.com', path: '' };
  let url;
  try {
    url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(typed) ? typed : `https://${typed}`);
  } catch {
    return { host: typed, path: '' };
  }
  const parts = url.pathname.split('/').filter(Boolean).map((part) => {
    try {
      return decodeURIComponent(part);
    } catch {
      return part;
    }
  });
  return { host: url.hostname.replace(/^www\./, ''), path: parts.length ? ` › ${parts.join(' › ')}` : '' };
}
