import { describe, expect, it } from 'vitest';
import { TOOLS } from '../config/tools';
import { toolsContent } from './toolsContent';

const shape = (value) =>
  Array.isArray(value)
    ? value.map(shape)
    : value && typeof value === 'object'
      ? Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, shape(inner)]))
      : typeof value;

describe('tools content', () => {
  it('keeps English and Arabic structurally identical', () => {
    expect(shape(toolsContent.ar)).toEqual(shape(toolsContent.en));
  });

  it('has no empty strings', () => {
    const walk = (value, where) => {
      if (typeof value === 'string') expect(value.trim(), where).not.toBe('');
      else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => walk(v, `${where}.${k}`));
    };
    walk(toolsContent, 'toolsContent');
  });

  it('lists every tool in the hub, in both languages', () => {
    for (const lang of ['en', 'ar']) {
      for (const tool of TOOLS) {
        expect(toolsContent[lang].hub[tool.id]?.title, `${lang} ${tool.id}`).toBeTruthy();
      }
    }
  });

  it('gives each new tool steps, questions and a call to action', () => {
    for (const lang of ['en', 'ar']) {
      for (const id of ['whatsapp', 'utm', 'serp', 'hijri', 'schema', 'brief', 'vat', 'adbudget', 'imagecompress', 'signature', 'palette', 'social']) {
        const page = toolsContent[lang][id];
        expect(page.steps.length, `${lang} ${id} steps`).toBeGreaterThanOrEqual(3);
        expect(page.faq.length, `${lang} ${id} faq`).toBeGreaterThanOrEqual(4);
        expect(page.cta.button, `${lang} ${id} cta`).toBeTruthy();
      }
    }
  });
});

describe('tools registry', () => {
  it('has unique ids and paths, and points each tool at a real service', async () => {
    expect(new Set(TOOLS.map((t) => t.id)).size).toBe(TOOLS.length);
    expect(new Set(TOOLS.map((t) => t.path)).size).toBe(TOOLS.length);
    const { SERVICES } = await import('../config/services');
    const slugs = SERVICES.map((service) => service.slug);
    for (const tool of TOOLS) expect(slugs, tool.id).toContain(tool.service);
  });
});
