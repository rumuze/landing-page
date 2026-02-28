export function validateGraphIntegrity(graph: any[]) {
  if (!import.meta.env.DEV) return;
  const ids = new Set<string>();
  const duplicates: string[] = [];
  for (const node of graph) {
    const id = node['@id'];
    if (id) {
      if (ids.has(id)) duplicates.push(id);
      ids.add(id);
    }
  }
  if (duplicates.length) {
    console.warn('[GraphIntegrity] Duplicate @id detected:', duplicates);
  }
  const orgId = graph.find((n) => n['@type'] && (Array.isArray(n['@type']) ? n['@type'].includes('Organization') : n['@type'] === 'Organization'))?.['@id'];
  const website = graph.find((n) => n['@type'] === 'WebSite');
  const services = graph.filter((n) => n['@type'] === 'Service');
  if (!orgId) {
    console.warn('[GraphIntegrity] Organization missing');
  }
  if (website && website.publisher?.['@id'] !== orgId) {
    console.warn('[GraphIntegrity] WebSite.publisher must reference Organization @id');
  }
  for (const svc of services) {
    if (svc.provider?.['@id'] !== orgId) {
      console.warn('[GraphIntegrity] Service.provider must equal Organization @id', svc['@id']);
    }
  }
}
