import { describe, expect, it } from 'vitest';
import { EMPTY_BRIEF, briefToText, completeness, isFilled, parseReferences, sectionLines } from './brief';

const copy = {
  documentTitle: 'Project brief',
  openQuestions: 'Still open',
  sections: { type: 'Type', goal: 'Goal', audience: 'Audience', budget: 'Budget', timeline: 'Timeline', features: 'Needs', references: 'References', notes: 'Notes' },
  labels: { type: { store: 'Online store' }, budget: { b2: '3,000 to 10,000 USD' }, timeline: { t2: '1 to 3 months' }, features: { payments: 'Online payments' } },
};

describe('completeness', () => {
  it('starts at zero and counts only the core sections', () => {
    expect(completeness(EMPTY_BRIEF)).toBe(0);
    expect(completeness({ ...EMPTY_BRIEF, name: 'A', type: 'store', features: ['payments'], notes: 'x' })).toBeCloseTo(2 / 6);
  });
  it('reaches one when every core section is filled', () => {
    const brief = { ...EMPTY_BRIEF, name: 'A', type: 'store', goal: 'g', audience: 'a', budget: 'b2', timeline: 't2' };
    expect(completeness(brief)).toBe(1);
  });
  it('ignores whitespace-only text', () => {
    expect(isFilled('goal', { ...EMPTY_BRIEF, goal: '   ' })).toBe(false);
  });
});

describe('parseReferences', () => {
  it('splits on lines and commas, Arabic comma included', () => {
    expect(parseReferences('a.com, b.com\nc.com،d.com\n\n')).toEqual(['a.com', 'b.com', 'c.com', 'd.com']);
  });
});

describe('briefToText', () => {
  it('writes filled sections and lists the rest as open questions', () => {
    const brief = { ...EMPTY_BRIEF, name: 'Dana Perfumes', type: 'store', goal: 'Double online sales', budget: 'b2', features: ['payments'], references: 'a.com, b.com' };
    const text = briefToText(brief, copy);
    expect(text.split('\n')[0]).toBe('Project brief: Dana Perfumes');
    expect(text).toContain('Type:\nOnline store');
    expect(text).toContain('Needs:\n- Online payments');
    expect(text).toContain('References:\n- a.com\n- b.com');
    expect(text).toContain('Still open:\n- Audience\n- Timeline');
  });
  it('maps option ids to their labels', () => {
    expect(sectionLines('budget', { ...EMPTY_BRIEF, budget: 'b2' }, copy.labels)).toEqual(['3,000 to 10,000 USD']);
  });
});
