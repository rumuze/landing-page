// Pure logic for the word and character counter: counts that work for Arabic and English, an
// estimate of reading time, the most used words, and room left under common length limits.

const WORD = /[\p{L}\p{N}][\p{L}\p{N}\p{M}'’_-]*/gu;

export const READING_SPEEDS = { slow: 150, average: 200, fast: 300 };
const SPEAKING_WORDS_PER_MINUTE = 130;

// Limits people often write against. They are commonly cited figures, not promises from a platform.
export const LIMITS = [
  { id: 'title', max: 60 },
  { id: 'description', max: 160 },
  { id: 'sms', max: 160 },
  { id: 'x', max: 280 },
  { id: 'caption', max: 2200 },
];

// Short lists of very common words, so the most used words are about the text and not about grammar.
const STOP_WORDS = {
  en: 'the a an and or but if of to in on at by for with from as is are was were be been it its this that these those i you he she we they my your our their not no so do does did have has had will would can could should than then there here what which who whom how when where why all any each more most some such only own same too very just also into over out up down about after before'.split(' '),
  ar: 'في من على إلى الى عن مع هذا هذه ذلك تلك هو هي هم هن أنا نحن أنت أنتم التي الذي الذين كان كانت يكون تكون ما ماذا لا لم لن قد كل بعض أي أو أم ثم حتى إذا إن أن كما بين عند بعد قبل هناك هنا لكن بل غير مثل أكثر فقط جدا جداً أيضا أيضاً'.split(' '),
};
const STOP = new Set([...STOP_WORDS.en, ...STOP_WORDS.ar]);

// Arabic marks that change how a word is written but not which word it is.
const TASHKEEL = /[ً-ٰٟـ]/g;
const normalizeWord = (word) => word.toLowerCase().replace(TASHKEEL, '').replace(/^['’_-]+|['’_-]+$/g, '');

export const wordsOf = (text) => String(text ?? '').match(WORD) ?? [];

/** Counts for a text. Characters are Unicode code points, so an Arabic letter or an emoji is one. */
export function analyzeText(text, wordsPerMinute = READING_SPEEDS.average) {
  const value = String(text ?? '');
  const words = wordsOf(value).length;
  const characters = [...value].length;
  const trimmed = value.trim();
  return {
    characters,
    charactersNoSpaces: [...value.replace(/\s/g, '')].length,
    words,
    sentences: trimmed ? (trimmed.match(/[^.!?؟…\n]+(?:[.!?؟…]+|\n+|$)/g) ?? []).filter((part) => /[\p{L}\p{N}]/u.test(part)).length : 0,
    paragraphs: trimmed ? trimmed.split(/\n\s*\n/).filter((part) => part.trim()).length : 0,
    lines: value === '' ? 0 : value.split('\n').length,
    readingSeconds: words ? Math.max(1, Math.round((words / wordsPerMinute) * 60)) : 0,
    speakingSeconds: words ? Math.max(1, Math.round((words / SPEAKING_WORDS_PER_MINUTE) * 60)) : 0,
  };
}

/** Seconds as "2 min 5 s" parts: { minutes, seconds }. */
export const splitSeconds = (seconds) => ({ minutes: Math.floor(seconds / 60), seconds: seconds % 60 });

/**
 * The most used words, most first, with their share of all the words in the text. Very short words and
 * common words of Arabic and English are skipped; Arabic marks and letter case are ignored.
 */
export function topWords(text, { limit = 8, minLength = 3 } = {}) {
  const all = wordsOf(text).map(normalizeWord).filter(Boolean);
  if (!all.length) return [];
  const counts = new Map();
  for (const word of all) {
    if ([...word].length < minLength || STOP.has(word) || /^\d+$/.test(word)) continue;
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word, count]) => ({ word, count, share: count / all.length }));
}

/** How much of a limit the text uses: { used, max, left, over, ratio }. */
export function limitUse(characters, max) {
  return { used: characters, max, left: Math.max(0, max - characters), over: Math.max(0, characters - max), ratio: Math.min(1, characters / max) };
}

export const EXAMPLE_TEXT = {
  en: 'Good copy says one thing clearly. It starts with what the reader wants, uses short sentences, and ends with the next step.\n\nRead it aloud. If you run out of breath, the sentence is too long. Cut it in two.',
  ar: 'النص الجيد يقول شيئاً واحداً بوضوح. يبدأ بما يريده القارئ، ويستخدم جملاً قصيرة، وينتهي بالخطوة التالية.\n\nاقرأه بصوت عالٍ. إن انقطع نفسك فالجملة طويلة. اقطعها إلى جملتين.',
};
