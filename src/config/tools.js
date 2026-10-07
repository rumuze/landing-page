// The free tools, in the order they are listed. `service` is the service page the tool's
// closing call to action points to. Copy lives in content/toolsContent.js.
export const TOOLS = [
  { id: 'qr', path: '/qr-generator', service: 'digital-solutions' },
  { id: 'whatsapp', path: '/whatsapp-link-generator', service: 'marketing-infrastructure' },
  { id: 'utm', path: '/utm-builder', service: 'paid-advertising' },
  { id: 'serp', path: '/serp-preview', service: 'seo-services' },
  { id: 'hijri', path: '/hijri-date-converter', service: 'digital-solutions' },
  { id: 'schema', path: '/schema-generator', service: 'seo-services' },
  { id: 'brief', path: '/project-brief-writer', service: 'digital-solutions' },
];

export const toolById = (id) => TOOLS.find((tool) => tool.id === id);
