// Cloudflare Worker entry: sends the alias domains to the canonical site, then serves the built assets.
// `run_worker_first` in wrangler.jsonc makes every request pass through here before static assets.
export const CANONICAL_ORIGIN = 'https://www.rumuze.com';
export const ALIAS_HOSTS = new Set(['rumuz.org', 'www.rumuz.org']);

/** A 301 to the same path and query on the canonical origin, or null when the host is not an alias. */
export function aliasRedirect(requestUrl) {
  const url = new URL(requestUrl);
  if (!ALIAS_HOSTS.has(url.hostname.toLowerCase())) return null;
  return Response.redirect(`${CANONICAL_ORIGIN}${url.pathname}${url.search}`, 301);
}

export default {
  fetch(request, env) {
    return aliasRedirect(request.url) ?? env.ASSETS.fetch(request);
  },
};
