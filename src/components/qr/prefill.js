/**
 * The address a tool linked to the QR generator with, from "?url=…". Only an http or https
 * address of reasonable length is accepted; anything else is ignored.
 */
export function readPrefilledUrl(search) {
  const value = new URLSearchParams(search).get('url');
  if (!value || value.length > 2048) return '';
  try {
    const { protocol } = new URL(value);
    return protocol === 'http:' || protocol === 'https:' ? value : '';
  } catch {
    return '';
  }
}
