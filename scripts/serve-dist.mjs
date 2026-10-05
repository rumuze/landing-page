/**
 * Serves dist/ the way Cloudflare Workers static assets do, for the browser
 * tests:
 *  - prerendered pages by path, and the real response headers from public/_headers
 *  - the `_redirects` 301 rules
 *  - `/200.html` for paths that look like pages (no file extension) but are not
 *    prerendered, like the `/* /200.html 200` rule in `_redirects`. A missing
 *    file with an extension (an asset, an image) is a 404 here, which is
 *    stricter than that rule so a dropped asset fails the tests.
 *
 * Usage: node scripts/serve-dist.mjs   (PORT, default 4173)
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const port = Number(process.env.PORT) || 4173;

if (!fs.existsSync(path.join(dist, 'sitemap.xml'))) {
  console.error('dist/ is missing. The browser tests run against the built site: run `npm run build` first.');
  process.exit(1);
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

const redirects = fs
  .readFileSync(path.join(root, 'public', '_redirects'), 'utf8')
  .split('\n')
  .map((line) => line.trim().split(/\s+/))
  .filter((parts) => parts.length === 3 && parts[2] === '301')
  .map(([from, to]) => {
    if (to.replace(':splat', '').includes(':')) throw new Error(`serve-dist only supports :splat in _redirects: ${from} ${to}`);
    return { from, to };
  });

// public/_headers: a path pattern line, then indented "Name: value" lines.
const headerRules = [];
for (const line of fs.readFileSync(path.join(root, 'public', '_headers'), 'utf8').split('\n')) {
  if (!line.trim() || line.trim().startsWith('#')) continue;
  if (!/^\s/.test(line)) {
    headerRules.push({ pattern: line.trim(), headers: {} });
  } else {
    const [name, ...value] = line.trim().split(':');
    headerRules[headerRules.length - 1].headers[name.trim()] = value.join(':').trim();
  }
}

const matchesPattern = (pattern, pathname) => {
  const source = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(`^${source}$`).test(pathname);
};

const headersFor = (pathname) =>
  Object.assign({}, ...headerRules.filter((rule) => matchesPattern(rule.pattern, pathname)).map((rule) => rule.headers));

// Returns where a request should be redirected, or null. A trailing /* matches
// a prefix, and :splat in the target is the part the star matched.
const findRedirect = (pathname) => {
  for (const { from, to } of redirects) {
    if (from.endsWith('/*')) {
      const prefix = from.slice(0, -1);
      if (pathname.startsWith(prefix)) return to.replace(':splat', pathname.slice(prefix.length));
    } else if (pathname === from) {
      return to;
    }
  }
  return null;
};

function resolvePathname(url) {
  try {
    return decodeURIComponent(url.split('?')[0]);
  } catch {
    return null;
  }
}

http
  .createServer((request, response) => {
    const pathname = resolvePathname(request.url);
    if (pathname === null) {
      response.writeHead(400).end('Bad request');
      return;
    }

    const redirect = findRedirect(pathname);
    if (redirect) {
      response.writeHead(301, { Location: redirect });
      response.end();
      return;
    }

    let file = path.join(dist, pathname);
    const relative = path.relative(dist, file);
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');

    if (!(fs.existsSync(file) && fs.statSync(file).isFile())) {
      if (path.extname(pathname)) {
        response.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
        return;
      }
      file = path.join(dist, '200.html');
    }

    const type = types[path.extname(file)] || 'application/octet-stream';
    // Cloudflare compresses text responses; do the same so size-sensitive
    // measurements (Lighthouse) are not distorted.
    const gzip = /\bgzip\b/.test(request.headers['accept-encoding'] || '') && /^(text\/|application\/(javascript|json|xml))|svg/.test(type);
    response.writeHead(200, {
      ...headersFor(pathname),
      'Content-Type': type,
      ...(gzip ? { 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' } : {}),
    });
    const stream = fs.createReadStream(file);
    stream.on('error', () => response.destroy());
    if (gzip) stream.pipe(zlib.createGzip()).pipe(response);
    else stream.pipe(response);
  })
  .listen(port, '127.0.0.1', () => console.log(`serving dist on http://127.0.0.1:${port}`));
