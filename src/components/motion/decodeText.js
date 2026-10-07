const GLYPHS = "ابتجحدرزسشصطعفقكلمنهوي{}<>/;=()[]01#*+".split("");

/**
 * One frame of a "decode" effect. Characters settle from one end of the word to the other
 * as `progress` goes from 0 to 1; the ones that have not settled yet show a random symbol.
 * Spaces and punctuation never change, and the length never changes, so layout holds.
 */
export function decodeFrame(finalText, progress, { rtl = false, random = Math.random } = {}) {
  const chars = Array.from(finalText);
  const letters = chars.filter((char) => /\S/.test(char)).length;
  let seen = 0;
  return chars
    .map((char) => {
      if (!/\S/.test(char)) return char;
      const order = rtl ? letters - 1 - seen : seen;
      seen += 1;
      const settleAt = (order + 1) / (letters + 1);
      return progress >= settleAt ? char : GLYPHS[Math.floor(random() * GLYPHS.length)];
    })
    .join("");
}
