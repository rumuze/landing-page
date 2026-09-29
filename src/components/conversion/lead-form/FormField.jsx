import { errorInputClass, fieldWrapper, inputClass, labelClass } from "./leadFormStyles";

const errorMessageFor = (error, messages) =>
  error === "email" ? messages.invalidEmail : error === "url" ? messages.invalidWebsite : messages.required;

/** Labelled text input whose error is announced and tied to the field. */
const FormField = ({
  autoComplete,
  error,
  inputMode,
  label,
  messages,
  name,
  onChange,
  optionalLabel,
  placeholder,
  requiredLabel,
  type = "text",
  value,
}) => {
  const errorId = `${name}-error`;

  return (
    <div className={fieldWrapper}>
      <label className={labelClass} htmlFor={name}>
        <span>{label}</span>
        {requiredLabel || optionalLabel ? (
          <span className="type-label text-slate-600 dark:text-slate-400">
            {requiredLabel || optionalLabel}
          </span>
        ) : null}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        autoComplete={autoComplete}
        className={`${inputClass} ${error ? errorInputClass : ""}`}
        id={name}
        inputMode={inputMode}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <p className="type-small text-red-600 dark:text-red-300" id={errorId}>
          {errorMessageFor(error, messages)}
        </p>
      ) : null}
    </div>
  );
};

export default FormField;
