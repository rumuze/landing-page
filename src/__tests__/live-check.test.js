import { describe, expect, it } from 'vitest';
import { checkLive } from '../../scripts/check-live.mjs';
import { resolveBuildCommit, versionFile } from '../../scripts/write-version.js';

const SHA = 'a'.repeat(40);
const OLD = 'b'.repeat(40);

describe('build commit', () => {
  it('prefers the host variable, then git, then unknown', () => {
    expect(resolveBuildCommit({ VERCEL_GIT_COMMIT_SHA: SHA.toUpperCase() }, () => 'x')).toBe(SHA);
    expect(resolveBuildCommit({ WORKERS_CI_COMMIT_SHA: OLD }, () => SHA)).toBe(OLD);
    expect(resolveBuildCommit({}, () => `${SHA}\n`)).toBe(SHA);
    expect(resolveBuildCommit({ VERCEL_GIT_COMMIT_SHA: 'not a sha' }, () => SHA)).toBe(SHA);
    expect(resolveBuildCommit({}, () => { throw new Error('not a git checkout'); })).toBe('unknown');
    expect(JSON.parse(versionFile(SHA, new Date('2026-10-06T10:00:00Z')))).toEqual({ commit: SHA, builtAt: '2026-10-06T10:00:00.000Z' });
  });
});

// A fake site: what `fetch` returns for each path.
function fakeSite({ commit = SHA, version = 200, home = '<html lang="ar">', homeStatus = 200, hsts = true, legacy = { status: 301, location: 'https://x.test/services' } } = {}) {
  return async (url) => {
    const pathname = new URL(url).pathname;
    const response = (status, body, headers = {}) => ({
      ok: status >= 200 && status < 300,
      status,
      json: async () => JSON.parse(body),
      text: async () => body,
      headers: { get: (name) => headers[name.toLowerCase()] ?? null },
    });
    if (pathname === '/version.json') return response(version, JSON.stringify({ commit }));
    if (pathname === '/ar/services') return response(legacy.status, '', { location: legacy.location });
    return response(homeStatus, home, hsts ? { 'strict-transport-security': 'max-age=1' } : {});
  };
}

const run = (site, extra = {}) =>
  checkLive({ baseUrl: 'https://x.test/', expectedSha: SHA, expectedTime: '2026-10-01T00:00:00Z', now: new Date('2026-10-06T00:00:00Z'), fetchFn: fakeSite(site), ...extra });

describe('live check', () => {
  it('passes when the site serves the latest commit and answers as intended', async () => {
    expect(await run({})).toEqual({ ok: true, problems: [], notes: [] });
  });

  it('fails when the domain serves an old build, and says how old main is', async () => {
    const result = await run({ commit: OLD });
    expect(result.ok).toBe(false);
    expect(result.problems[0]).toMatch(/serves bbbbbbb, main is at aaaaaaa/);
    expect(result.problems[0]).toMatch(/serving an old build/);
  });

  it('allows a fresh merge a few minutes to deploy', async () => {
    const result = await run({ commit: OLD }, { expectedTime: '2026-10-05T23:50:00Z' });
    expect(result.ok).toBe(true);
    expect(result.notes[0]).toMatch(/still deploying/);
  });

  it('fails when there is no version file (a stale host from before the file existed)', async () => {
    const result = await run({ version: 404 });
    expect(result.ok).toBe(false);
    expect(result.problems[0]).toMatch(/\/version\.json answered 404/);
  });

  it('accepts the 308 that Vercel uses for a permanent redirect', async () => {
    expect((await run({ legacy: { status: 308, location: 'https://x.test/services' } })).ok).toBe(true);
  });

  it('fails when the redirect, the language or the security header is wrong', async () => {
    expect((await run({ legacy: { status: 200, location: '' } })).problems.join()).toMatch(/\/ar\/services should redirect/);
    expect((await run({ legacy: { status: 302, location: 'https://x.test/services' } })).problems.join()).toMatch(/\/ar\/services should redirect/);
    expect((await run({ home: '<html lang="en">' })).problems.join()).toMatch(/not the Arabic home page/);
    expect((await run({ hsts: false })).problems.join()).toMatch(/Strict-Transport-Security/);
    expect((await run({ homeStatus: 500 })).problems.join()).toMatch(/\/ answered 500/);
  });

  it('reports a site that cannot be reached', async () => {
    const result = await run({}, { fetchFn: async () => { throw new Error('getaddrinfo ENOTFOUND'); } });
    expect(result.ok).toBe(false);
    expect(result.problems.join()).toMatch(/ENOTFOUND/);
  });
});
