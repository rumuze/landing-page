// Pure logic for the project brief writer. The page supplies the labels (so the same code
// serves Arabic and English); this file decides what counts as filled and writes the text.

export const PROJECT_TYPES = ['website', 'store', 'app', 'ads', 'brand', 'seo', 'other'];
export const BUDGETS = ['b1', 'b2', 'b3', 'b4', 'undecided'];
export const TIMELINES = ['t1', 't2', 't3', 'flexible'];
export const FEATURES = ['bilingual', 'payments', 'booking', 'dashboard', 'integrations', 'analytics', 'content', 'seo'];

export const EMPTY_BRIEF = {
  name: '',
  type: '',
  goal: '',
  audience: '',
  budget: '',
  timeline: '',
  features: [],
  references: '',
  notes: '',
};

// The sections of the brief, in order. `core` sections count towards completeness.
export const SECTIONS = [
  { id: 'name', core: true },
  { id: 'type', core: true },
  { id: 'goal', core: true },
  { id: 'audience', core: true },
  { id: 'budget', core: true },
  { id: 'timeline', core: true },
  { id: 'features', core: false },
  { id: 'references', core: false },
  { id: 'notes', core: false },
];

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

/** True when the section has something in it. */
export function isFilled(id, brief) {
  if (id === 'features') return Array.isArray(brief.features) && brief.features.length > 0;
  return clean(brief[id]) !== '';
}

/** Share of the core sections that are filled, 0 to 1. */
export function completeness(brief) {
  const core = SECTIONS.filter((section) => section.core);
  return core.filter((section) => isFilled(section.id, brief)).length / core.length;
}

/** Reference sites, one per line or comma separated, without empty entries. */
export function parseReferences(value) {
  return String(value ?? '')
    .split(/[\n,،]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

/**
 * The value of a section as lines of text, for display and for the text file. `labels` maps
 * option ids to words: { type: {...}, budget: {...}, timeline: {...}, features: {...} }.
 */
export function sectionLines(id, brief, labels) {
  if (!isFilled(id, brief)) return [];
  switch (id) {
    case 'type':
    case 'budget':
    case 'timeline':
      return [labels[id][brief[id]] ?? clean(brief[id])];
    case 'features':
      return brief.features.map((feature) => labels.features[feature] ?? feature);
    case 'references':
      return parseReferences(brief.references);
    default:
      return clean(brief[id]).split('\n').map((line) => line.trim()).filter(Boolean);
  }
}

/** The whole brief as plain text, ready to send. Unfilled core sections are listed as open questions. */
export function briefToText(brief, copy) {
  const out = [];
  const title = clean(brief.name);
  out.push(`${copy.documentTitle}${title ? `: ${title}` : ''}`);
  out.push('='.repeat(Math.min(40, out[0].length)));
  const open = [];
  for (const section of SECTIONS) {
    const lines = sectionLines(section.id, brief, copy.labels);
    if (!lines.length) {
      if (section.core && section.id !== 'name') open.push(copy.sections[section.id]);
      continue;
    }
    if (section.id === 'name') continue;
    out.push('');
    out.push(`${copy.sections[section.id]}:`);
    if (section.id === 'features' || section.id === 'references') for (const line of lines) out.push(`- ${line}`);
    else for (const line of lines) out.push(line);
  }
  if (open.length) {
    out.push('');
    out.push(`${copy.openQuestions}:`);
    for (const item of open) out.push(`- ${item}`);
  }
  return out.join('\n');
}
