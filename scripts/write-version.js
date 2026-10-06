/**
 * Writes dist/version.json: the commit this build was made from. The live check
 * (scripts/check-live.mjs) reads it from the public site to see whether the domain
 * serves the latest build, and stale hosting shows up the day it happens.
 *
 * Usage: node scripts/write-version.js
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** The commit variable each host sets during its build, in order; git is the last resort. */
const COMMIT_VARIABLES = ['VERCEL_GIT_COMMIT_SHA', 'WORKERS_CI_COMMIT_SHA', 'CF_PAGES_COMMIT_SHA', 'GITHUB_SHA'];

export function resolveBuildCommit(env = process.env, runGit = () => execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' })) {
  for (const name of COMMIT_VARIABLES) {
    const value = String(env[name] || '').trim();
    if (/^[0-9a-f]{7,40}$/i.test(value)) return value.toLowerCase();
  }
  try {
    const value = String(runGit()).trim();
    if (/^[0-9a-f]{40}$/i.test(value)) return value.toLowerCase();
  } catch {
    // not a git checkout (a source archive): fall through
  }
  return 'unknown';
}

export function versionFile(commit, now = new Date()) {
  return `${JSON.stringify({ commit, builtAt: now.toISOString() }, null, 2)}\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
  const commit = resolveBuildCommit();
  fs.writeFileSync(path.join(dist, 'version.json'), versionFile(commit));
  console.log(`🔖 dist/version.json: ${commit.slice(0, 7)}`);
}
