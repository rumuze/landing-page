import React from 'react';
import { tokenizeLine } from '../../tools/schema';

const TOKEN_CLASS = {
  key: 'text-[#9ee647]',
  string: 'text-[#f1e6b8]',
  literal: 'text-[#7dd3fc]',
  punct: 'text-slate-400',
  tag: 'text-[#c4a7ff]',
  space: '',
};

/**
 * Colours a block of code, line by line. A line is keyed by its position and its text, so a line
 * that changes is created again and flashes, while untouched lines stay still. Changing
 * `streamKey` (for example when the type of markup changes) makes every line stream in again.
 * `tokenize` splits a line into coloured pieces; it defaults to the JSON one.
 */
const CodeStream = ({ lines, streamKey, label, caretLine = -1, tokenize = tokenizeLine }) => (
  <pre
    key={streamKey}
    tabIndex={0}
    aria-label={label}
    dir="ltr"
    className="max-h-[28rem] overflow-auto rounded-2xl bg-[#0b1220] py-4 text-left font-mono text-[0.8rem] leading-6 text-slate-200"
  >
    <code className="block min-w-max">
      {lines.map((line, index) => (
        <span
          key={`${index}:${line}`}
          className={`code-line flex px-4 ${index === caretLine ? 'code-caret' : ''}`}
          style={{ '--d': `${Math.min(index, 14) * 18}ms` }}
        >
          <span aria-hidden="true" className="w-7 shrink-0 select-none pe-3 text-right text-slate-600">
            {index + 1}
          </span>
          <span className="whitespace-pre">
            {tokenize(line).map((token, tokenIndex) => (
              <span key={tokenIndex} className={TOKEN_CLASS[token.type]}>
                {token.text}
              </span>
            ))}
            {line === '' ? ' ' : ''}
          </span>
        </span>
      ))}
    </code>
  </pre>
);

export default CodeStream;
