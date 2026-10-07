// Class names shared by the tool forms.

const inputBase =
  'w-full rounded-xl border-2 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:ring-2 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500';

// The border colour is chosen here, not added on top, so the two states never compete.
/** Classes for a text control; `invalid` switches to the error colours. */
export const fieldClass = (invalid = false) =>
  `${inputBase} ${
    invalid
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-400/70'
      : 'border-slate-200 focus:border-cyan focus:ring-cyan/20 dark:border-white/10'
  }`;

export const inputClass = fieldClass(false);

export const buttonClass =
  'inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]';
