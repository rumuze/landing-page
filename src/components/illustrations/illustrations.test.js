import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { SERVICES } from '../../config/services';
import { PAGE_SCENES, PROCESS_SCENES, SERVICE_SCENES } from './serviceScenes';
import { SCENES } from './scenes.generated';

const here = path.dirname(fileURLToPath(import.meta.url));
const css = fs.readFileSync(path.resolve(here, '../../index.css'), 'utf8');

describe('illustrations', () => {
  it('has a scene for every service and every process step', () => {
    SERVICES.forEach((service) => {
      expect(SERVICE_SCENES[service.slug], service.slug).toBeTruthy();
      expect(SCENES[SERVICE_SCENES[service.slug]], service.slug).toBeTruthy();
    });
    PROCESS_SCENES.forEach((scene) => expect(SCENES[scene], scene).toBeTruthy());
    Object.values(PAGE_SCENES).forEach((scene) => expect(SCENES[scene], scene).toBeTruthy());
    expect(Object.keys(SERVICE_SCENES).sort()).toEqual(SERVICES.map((s) => s.slug).sort());
  });

  it('keeps every scene flat: solid fills only, no blends, filters, images or scripts', () => {
    Object.entries(SCENES).forEach(([name, scene]) => {
      expect(scene.viewBox, name).toMatch(/^-?\d+ -?\d+ \d+ \d+$/);
      expect(scene.body.length, name).toBeGreaterThan(500);
      expect(scene.body, name).not.toMatch(/gradient|filter|blur|shadow|<image|<script|<foreignObject|style=|fill="|stroke="/i);
    });
  });

  it('styles every class the scenes use', () => {
    const used = new Set();
    Object.values(SCENES).forEach(({ body }) => [...body.matchAll(/class="([^"]+)"/g)].forEach(([, c]) => c.split(' ').forEach((x) => used.add(x))));
    expect(used.size).toBeGreaterThan(10);
    used.forEach((name) => expect(css, `${name} has no rule`).toMatch(new RegExp(`\\.${name}\\s*\\{`)));
  });
});
