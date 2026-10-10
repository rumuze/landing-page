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
});
