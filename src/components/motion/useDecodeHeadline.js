import { useEffect } from "react";
import { decodeFrame } from "./decodeText";
import { prefersReducedMotion } from "./useCanvasLoop";

let played = false;

/**
 * Plays a one-time "decode" intro on the words of a headline: each word starts as a jumble
 * of letters and code symbols and settles into the real text. The server-rendered text is
 * what first paints, so search engines, screen readers and the first paint all see the
 * headline as written. Each word is held at its measured size while it scrambles, so
 * nothing around it moves. It runs once per page load and never with reduced motion.
 *
 * It only rewrites the value of each word's existing text node, so React stays in charge of
 * the DOM, including when the language changes mid-run.
 */
export function useDecodeHeadline(ref, rtl) {
  useEffect(() => {
    const root = ref.current;
    if (!root || played || prefersReducedMotion() || document.hidden) return undefined;

    const words = Array.from(root.querySelectorAll(".headline-word"))
      .map((el) => ({ el, node: el.firstChild }))
      .filter(({ node }) => node && node.nodeType === Node.TEXT_NODE)
      .map(({ el, node }) => ({ el, node, text: node.nodeValue, written: node.nodeValue, width: 0, height: 0 }));
    if (!words.length) return undefined;

    let raf = 0;
    let cancelled = false;
    let startTimer = 0;
    const STAGGER = 130;
    const DURATION = 700;
    const FRAME_MS = 50;

    const restore = () => {
      for (const word of words) {
        if (word.node.nodeValue === word.written) word.node.nodeValue = word.text;
        word.el.style.width = "";
        word.el.style.height = "";
        word.el.style.whiteSpace = "";
        word.el.style.direction = "";
        word.el.style.textAlign = "";
      }
    };

    const start = () => {
      if (cancelled) return;
      // Once it has begun it counts as played, even if a language change interrupts it.
      played = true;
      // Measure everything first, then write, so there is a single layout pass.
      for (const word of words) {
        const box = word.el.getBoundingClientRect();
        word.width = box.width;
        word.height = box.height;
      }
      // Width and height are fixed but overflow is left visible: clipping an inline-block
      // would move its baseline and shift the line.
      for (const word of words) {
        word.el.style.width = `${word.width}px`;
        word.el.style.height = `${word.height}px`;
        word.el.style.whiteSpace = "nowrap";
        // Pin the text to the physical left edge while it scrambles. In a right-to-left
        // word the left edge is the one that would move as the symbols change width, and
        // the browser counts that as a layout shift.
        word.el.style.direction = "ltr";
        word.el.style.textAlign = "left";
      }
      const t0 = performance.now();
      let lastDraw = 0;
      const tick = (now) => {
        if (cancelled) return;
        const elapsed = now - t0;
        let done = true;
        if (now - lastDraw >= FRAME_MS) {
          lastDraw = now;
          for (let i = 0; i < words.length; i += 1) {
            const progress = (elapsed - i * STAGGER) / DURATION;
            const word = words[i];
            const next = progress >= 1 ? word.text : decodeFrame(word.text, Math.max(0, progress), { rtl });
            if (word.node.nodeValue === word.written) {
              word.node.nodeValue = next;
              word.written = next;
            }
            if (progress < 1) done = false;
          }
        } else {
          done = false;
        }
        if (done) {
          restore();
          return;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // Let the headline's own rise animation finish first.
    const settle = 250 + words.length * 90;
    startTimer = window.setTimeout(start, settle);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(startTimer);
      restore();
    };
  }, [ref, rtl]);
}
