import { describe, expect, it } from 'vitest';
import { LIMITS, READING_SPEEDS, analyzeText, limitUse, splitSeconds, topWords, wordsOf } from './wordCount';

describe('wordsOf', () => {
  it('finds words in English and Arabic, and keeps apostrophes and hyphens inside a word', () => {
    expect(wordsOf("Don't stop-and-go, 2026!")).toEqual(["Don't", 'stop-and-go', '2026']);
    expect(wordsOf('مرحبا بكم في رموز')).toEqual(['مرحبا', 'بكم', 'في', 'رموز']);
  });
  it('keeps Arabic marks with their letters', () => {
    expect(wordsOf('الكِتَابُ جَمِيلٌ')).toEqual(['الكِتَابُ', 'جَمِيلٌ']);
  });
  it('is empty for nothing', () => {
    expect(wordsOf('')).toEqual([]);
    expect(wordsOf(null)).toEqual([]);
    expect(wordsOf('... --- !!!')).toEqual([]);
  });
});

describe('analyzeText', () => {
  it('counts everything for a small text', () => {
    const result = analyzeText('One two three. Four five!\n\nSix?');
    expect(result.words).toBe(6);
    expect(result.sentences).toBe(3);
    expect(result.paragraphs).toBe(2);
    expect(result.lines).toBe(3);
    expect(result.characters).toBe(31);
    expect(result.charactersNoSpaces).toBe(25);
  });
  it('counts a letter or an emoji as one character', () => {
    expect(analyzeText('مرحبا').characters).toBe(5);
    expect(analyzeText('a😀b').characters).toBe(3);
  });
  it('gives zero for an empty or blank text', () => {
    for (const text of ['', '   ', '\n\n']) {
      const result = analyzeText(text);
      expect(result.words, JSON.stringify(text)).toBe(0);
      expect(result.sentences).toBe(0);
      expect(result.paragraphs).toBe(0);
      expect(result.readingSeconds).toBe(0);
    }
  });
  it('splits Arabic sentences at the Arabic question mark', () => {
    expect(analyzeText('هل أنت بخير؟ نعم. شكراً').sentences).toBe(3);
  });
  it('estimates reading and speaking time from the speed', () => {
    const text = Array(200).fill('word').join(' ');
    expect(analyzeText(text, READING_SPEEDS.average).readingSeconds).toBe(60);
    expect(analyzeText(text, READING_SPEEDS.fast).readingSeconds).toBe(40);
    expect(analyzeText(text).speakingSeconds).toBe(92);
    expect(analyzeText('one').readingSeconds).toBe(1);
  });
});

describe('splitSeconds', () => {
  it('splits into minutes and seconds', () => {
    expect(splitSeconds(125)).toEqual({ minutes: 2, seconds: 5 });
    expect(splitSeconds(0)).toEqual({ minutes: 0, seconds: 0 });
  });
});

describe('topWords', () => {
  it('lists the most used words, skipping common words, short words and numbers', () => {
    const list = topWords('The design of design systems: design is the system. 2026 2026 a of');
    expect(list.map((entry) => entry.word)).toEqual(['design', 'system', 'systems']);
    expect(list[0].count).toBe(3);
    expect(list[0].share).toBeCloseTo(3 / 13, 5);
  });
  it('ignores case, Arabic marks and skips common Arabic words', () => {
    const list = topWords('الكتابُ في الكتابِ الجميل ثم الكتاب');
    expect(list[0]).toMatchObject({ word: 'الكتاب', count: 3 });
    expect(list.map((entry) => entry.word)).not.toContain('في');
  });
  it('respects the limit and gives nothing for an empty text', () => {
    expect(topWords('alpha beta gamma delta alpha', { limit: 2 })).toHaveLength(2);
    expect(topWords('')).toEqual([]);
  });
});

describe('limitUse', () => {
  it('reports what is left or over', () => {
    expect(limitUse(40, 160)).toEqual({ used: 40, max: 160, left: 120, over: 0, ratio: 0.25 });
    expect(limitUse(300, 280)).toEqual({ used: 300, max: 280, left: 0, over: 20, ratio: 1 });
    expect(LIMITS.map((limit) => limit.id)).toEqual(['title', 'description', 'sms', 'x', 'caption']);
  });
});
