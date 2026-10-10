/**
 * Checks that the public site is serving the latest build and answering as intended.
 * It exists because the domain once kept serving a frozen build for a week while every
 * merge built fine: the build was green and the site was stale.
 *
 * Usage: EXPECTED_SHA=<main commit> EXPECTED_TIME=<ISO commit time> node scripts/check-live.mjs https://www.rumuze.com
 * Exit code 1 (and a list of problems) when the site is behind or answers wrongly.
 */
import { fileURLToPath } from 'node:url';

const GRACE_MINUTES = 30; // a fresh merge needs a few minutes to be built and deployed

export async function checkLive({ baseUrl, expectedSha, expectedTime, now = new Date(), fetchFn = fetch, graceMinutes = GRACE_MINUTES }) {
  const base = baseUrl.replace(/\/+$/, '');
  const problems = [];
  const notes = [];

  // 1. The live commit is the latest one on main.
  try {
    const response = await fetchFn(`${base}/version.json`, { headers: { 'cache-control': 'no-cache' } });
    if (!response.ok) {
      problems.push(`/version.json answered ${response.status}: the site was built before this check existed, or is not serving the latest build`);
    } else {
      const { commit } = await response.json();
      if (commit !== expectedSha) {
        const ageMinutes = expectedTime ? (now - new Date(expectedTime)) / 60000 : Infinity;
        const message = `the site serves ${String(commit).slice(0, 7)}, main is at ${expectedSha.slice(0, 7)}`;
        if (ageMinutes <= graceMinutes) notes.push(`${message} (merged ${Math.round(ageMinutes)} min ago, still deploying)`);
        else problems.push(`${message} (merged ${Number.isFinite(ageMinutes) ? `${Math.round(ageMinutes / 60)} h` : 'a while'} ago): the domain is serving an old build`);
      }
    }
  } catch (error) {
    problems.push(`/version.json could not be read: ${error.message}`);
  }

  // 2. The Arabic home page, and the redirect that only the current build performs.
  try {
    const home = await fetchFn(`${base}/`);
    const html = await home.text();
    if (home.status !== 200) problems.push(`/ answered ${home.status}`);
    else if (!/<html[^>]*\blang="ar"/.test(html)) problems.push('/ is not the Arabic home page');
    if (!home.headers.get('strict-transport-security')) problems.push('/ has no Strict-Transport-Security header');
  } catch (error) {
    problems.push(`/ could not be read: ${error.message}`);
  }

  try {
    const legacy = await fetchFn(`${base}/ar/services`, { redirect: 'manual' });
    const target = legacy.headers.get('location') || '';
    // Cloudflare answers a permanent redirect with 301, Vercel with 308; both mean the same to browsers and crawlers.
    if (![301, 308].includes(legacy.status) || !/\/services$/.test(target)) problems.push(`/ar/services should redirect permanently (301 or 308) to /services, but answered ${legacy.status} ${target}`.trim());
  } catch (error) {
    problems.push(`/ar/services could not be read: ${error.message}`);
  }

  return { ok: problems.length === 0, problems, notes };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const baseUrl = process.argv[2] || 'https://www.rumuze.com';
  const expectedSha = String(process.env.EXPECTED_SHA || '').trim();
  if (!expectedSha) {
    console.error('EXPECTED_SHA is not set');
    process.exit(2);
  }
  const { ok, problems, notes } = await checkLive({ baseUrl, expectedSha, expectedTime: process.env.EXPECTED_TIME });
  notes.forEach((note) => console.log(`note: ${note}`));
  if (ok) {
    console.log(`ok: ${baseUrl} serves the latest build and answers as intended`);
  } else {
    problems.forEach((problem) => console.error(`problem: ${problem}`));
    process.exit(1);
  }
}
