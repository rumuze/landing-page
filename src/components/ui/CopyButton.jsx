import React from 'react';
import { Check, Copy } from 'lucide-react';
import { buttonClass } from '../tools/toolStyles';
import { useCopy } from '../tools/useCopy';

const VARIANTS = {
  primary: 'bg-cyan text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100',
  outline: 'border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300',
};

/** A button that copies `text` and shows a tick and `copiedLabel` for a couple of seconds. */
const CopyButton = ({ id, text, label, copiedLabel, variant = 'primary', disabled = false, className = '', onCopied }) => {
  const { copied, copy } = useCopy();
  return (
    <button
      id={id}
      type="button"
      disabled={disabled}
      onClick={() => {
        copy(text);
        onCopied?.();
      }}
      className={`${buttonClass} ${VARIANTS[variant]} ${className}`}
    >
      {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
      {copied ? copiedLabel : label}
    </button>
  );
};

export default CopyButton;
