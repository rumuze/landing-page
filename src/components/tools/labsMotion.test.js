import { describe, expect, it } from 'vitest';
import { TOOLS } from '../../config/tools';
import { HOVER_MOTION, STRIP_TOOLS } from './labsMotion';

describe('labs hub motion', () => {
  it('gives every tool an icon motion', () => {
    for (const tool of TOOLS) expect(['hop', 'wig', 'spin', 'grow']).toContain(HOVER_MOTION[tool.id]);
  });

  it('only previews tools that exist', () => {
    const ids = TOOLS.map((tool) => tool.id);
    for (const id of STRIP_TOOLS) expect(ids).toContain(id);
  });
});
