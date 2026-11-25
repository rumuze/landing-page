import { describe, expect, it } from 'vitest';
import worker, { aliasRedirect } from './index.js';

describe('alias domain redirect', () => {
  it.each(['https://rumuz.org/', 'https://www.rumuz.org/', 'http://RUMUZ.org/'])('sends %s to the canonical home page', (from) => {
    const res = aliasRedirect(from);
    expect(res.status).toBe(301);
    expect(res.headers.get('location')).toBe('https://www.rumuze.com/');
  });

  it('keeps the path and query string', () => {
    const res = aliasRedirect('https://rumuz.org/en/services?utm_source=x');
    expect(res.headers.get('location')).toBe('https://www.rumuze.com/en/services?utm_source=x');
  });

  it('ignores the canonical host, so it can never loop', () => {
    expect(aliasRedirect('https://www.rumuze.com/')).toBeNull();
    expect(aliasRedirect('https://landing-page.example.workers.dev/')).toBeNull();
  });

  it('passes other hosts to the static assets', async () => {
    const asset = new Response('ok');
    const env = { ASSETS: { fetch: async () => asset } };
    expect(await worker.fetch(new Request('https://www.rumuze.com/about'), env)).toBe(asset);
  });
});
