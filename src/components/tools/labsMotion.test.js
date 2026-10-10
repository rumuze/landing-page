import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { TOOLS } from '../../config/tools';
import { HOVER_MOTION, STRIP_TOOLS } from './labsMotion';

describe('labs hub motion', () => {
  it('gives every tool an icon motion', () => {
    for (const tool of TOOLS) expect(['hop', 'wig', 'spin', 'grow']).toContain(HOVER_MOTION[tool.id]);
  });

  it('previews every tool, and only tools that exist', () => {
    expect([...STRIP_TOOLS].sort()).toEqual(TOOLS.map((tool) => tool.id).sort());
  });

  it('declares every @keyframes name once, because a later one silently replaces an earlier one', () => {
    const css = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../index.css'), 'utf8');
    const names = [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((match) => match[1]);
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    expect(duplicates).toEqual([]);
  });
});
