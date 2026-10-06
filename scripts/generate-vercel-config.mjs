// Builds vercel.json from the files Cloudflare reads (public/_redirects and public/_headers),
// so the redirects and response headers have one source and the two hosts cannot drift apart.
// Run `npm run vercel-config` after changing either file; a test fails when vercel.json is stale.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** `/ar/* /:splat` style rules turn into Vercel's `:path*` form. The `/* /200.html 200` line becomes the page fallback rewrite. */
export function parseRedirects(text) {
  const redirects = [];
  let fallback = null;

  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const [from, to, status] = line.split(/\s+/);

    if (status === '200') {
      if (from !== '/*') throw new Error(`Only the "/* /200.html 200" fallback is supported: ${line}`);
      fallback = to;
      continue;
    }
    if (status !== '301') throw new Error(`Unsupported status in _redirects: ${line}`);

    const splat = from.endsWith('/*');
    const source = splat ? `${from.slice(0, -2)}/:path*` : from;
    const destination = to.replace(':splat', ':path*');
    if (destination.replace(':path*', '').includes(':')) throw new Error(`Unsupported placeholder in _redirects: ${line}`);
    redirects.push({ source, destination, permanent: true });
  }

  return { redirects, fallback };
}

/** A path pattern line, then indented "Name: value" lines (the Cloudflare `_headers` format). */
export function parseHeaders(text) {
  const rules = [];
  for (const line of text.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      rules.push({ pattern: line.trim(), headers: [] });
    } else {
      const index = line.indexOf(':');
      rules.at(-1).headers.push({ key: line.slice(0, index).trim(), value: line.slice(index + 1).trim() });
    }
  }
  return rules;
}

// `/*` -> `/(.*)`, `/assets/*` -> `/assets/(.*)`, `/*.woff2` -> `/(.*)\.woff2`
const toVercelPattern = (pattern) => pattern.replace(/\./g, '\\.').replace(/\*/g, '(.*)');

export function buildVercelConfig(redirectsText, headersText) {
  const { redirects, fallback } = parseRedirects(redirectsText);
  return {
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    cleanUrls: true,
    trailingSlash: false,
    headers: parseHeaders(headersText).map(({ pattern, headers }) => ({ source: toVercelPattern(pattern), headers })),
    // Rewrites run after static files, so prerendered pages and assets win; anything else reaches the client router.
    rewrites: fallback ? [{ source: '/(.*)', destination: fallback }] : [],
    redirects,
  };
}

export function readSources() {
  return {
    redirectsText: fs.readFileSync(path.join(root, 'public', '_redirects'), 'utf8'),
    headersText: fs.readFileSync(path.join(root, 'public', '_headers'), 'utf8'),
  };
}

export const renderVercelConfig = () => {
  const { redirectsText, headersText } = readSources();
  return `${JSON.stringify(buildVercelConfig(redirectsText, headersText), null, 2)}\n`;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fs.writeFileSync(path.join(root, 'vercel.json'), renderVercelConfig());
  console.log('wrote vercel.json');
}
