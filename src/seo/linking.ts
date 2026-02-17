export function generateCanonical(baseUrl: string, path: string) {
  const clean = path.replace(/\/{2,}/g, '/');
  return `${baseUrl}${clean}`;
}

export function generateHreflangs(baseUrl: string, path: string) {
  const clean = path.replace(/^\/ar/, '');
  return {
    en: `${baseUrl}${clean}`,
    ar: `${baseUrl}/ar${clean}`,
    xDefault: `${baseUrl}${clean}`,
  };
}
