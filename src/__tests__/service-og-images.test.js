import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { SERVICES } from '../config/services';

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(here, '../../public/assets/images/og/services');
const pageSource = fs.readFileSync(path.resolve(here, '../pages/ServiceDetailPage.jsx'), 'utf8');

describe('service share images', () => {
  it('has a non-empty JPEG for every service in both languages', () => {
    SERVICES.forEach((service) => {
      ['en', 'ar'].forEach((lang) => {
        const file = path.join(dir, `${service.slug}-${lang}.jpg`);
        expect(fs.existsSync(file), `${service.slug}-${lang}.jpg`).toBe(true);
        const bytes = fs.readFileSync(file);
        expect(bytes.length, file).toBeGreaterThan(10_000);
        expect([bytes[0], bytes[1]], file).toEqual([0xff, 0xd8]);
      });
    });
  });

  it('has no image for a service that no longer exists', () => {
    const known = new Set(SERVICES.flatMap((s) => [`${s.slug}-en.jpg`, `${s.slug}-ar.jpg`]));
    fs.readdirSync(dir).forEach((file) => expect(known.has(file), file).toBe(true));
  });

  it('points the service page at that image', () => {
    expect(pageSource).toContain('/assets/images/og/services/${service.slug}-${lang}.jpg');
  });
});
