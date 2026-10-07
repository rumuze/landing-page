import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copies text to the clipboard and reports `copied` for a couple of seconds. `copy(text, html)` also
 * puts `html` on the clipboard as rich text where the browser allows it, so it pastes with its
 * formatting into a mail program; the plain text is the fallback.
 */
export function useCopy(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text, html) => {
      try {
        if (html && typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': new Blob([html], { type: 'text/html' }),
              'text/plain': new Blob([text], { type: 'text/plain' }),
            }),
          ]);
        } else {
          await navigator.clipboard.writeText(text);
        }
      } catch {
        // Older browsers and some embedded views refuse the clipboard API.
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
      }
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), resetAfter);
    },
    [resetAfter],
  );

  return { copied, copy };
}
