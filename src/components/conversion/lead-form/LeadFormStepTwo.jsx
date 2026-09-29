import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import FormField from "./FormField";
import { fieldWrapper, labelClass, textareaClass } from "./leadFormStyles";

const LeadFormStepTwo = ({ copy, errors, formData, intakeCopy, isAr, isSubmitting, onBack, onChange, onSubmit }) => (
  <form className="space-y-4" noValidate onSubmit={onSubmit}>
    <FormField
      autoComplete="organization"
      error={errors.companyName}
      label={copy.company}
      messages={copy.errors}
      name="companyName"
      onChange={onChange}
      optionalLabel={copy.optional}
      placeholder={copy.companyPlaceholder}
      value={formData.companyName}
    />

    <div className={fieldWrapper}>
      <label className={labelClass} htmlFor="description">
        <span>{copy.description}</span>
        <span className="type-label text-slate-600 dark:text-slate-400">{copy.optional}</span>
      </label>
      <textarea
        className={textareaClass}
        id="description"
        name="description"
        onChange={onChange}
        placeholder={copy.descriptionPlaceholder}
        value={formData.description}
      />
    </div>

    <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center">
      <button className="btn-outline w-full py-3.5 text-sm sm:w-auto" onClick={onBack} type="button">
        <ArrowLeft className={`h-4 w-4 ${isAr ? "rotate-180" : ""}`} />
        <span>{copy.back}</span>
      </button>

      <button
        className="btn-primary w-full py-3.5 text-base sm:w-auto sm:flex-1"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>{intakeCopy.submitting}</span>
          </>
        ) : (
          <>
            <span>{copy.confirm}</span>
            <ArrowRight className={`h-5 w-5 ${isAr ? "rotate-180" : ""}`} />
          </>
        )}
      </button>
    </div>
  </form>
);

export default LeadFormStepTwo;
