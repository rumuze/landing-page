import React from 'react';

/**
 * A labelled form field: the label, the control, a hint, and an error that is tied to the control
 * for screen readers. `children` is a function that receives the props the control must carry.
 */
const ToolField = ({ id, label, hint, error, className = '', children }) => {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
        {label}
      </label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? 'true' : undefined })}
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-500 dark:text-gray-400">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default ToolField;
