import { ChevronRight, Loader2 } from "lucide-react";
import FormField from "./FormField";
import Select from "../../ui/Select";
import { errorInputClass, fieldWrapper, inputClass, labelClass } from "./leadFormStyles";

const SERVICE_KEYS = ["build", "audit", "infrastructure"];

const LeadFormStepOne = ({ copy, errors, formData, intakeCopy, isAr, isSubmitting, onChange, onNext, onQuickSubmit }) => (
  <form className="space-y-4" noValidate onSubmit={onNext}>
    <FormField
      autoComplete="name"
      error={errors.fullName}
      label={copy.fullName}
      messages={copy.errors}
      name="fullName"
      onChange={onChange}
      placeholder={copy.fullNamePlaceholder}
      requiredLabel={intakeCopy.requiredLabel}
      value={formData.fullName}
    />

    <FormField
      autoComplete="email"
      error={errors.workEmail}
      label={copy.contact}
      messages={copy.errors}
      name="workEmail"
      onChange={onChange}
      placeholder={copy.contactPlaceholder}
      requiredLabel={intakeCopy.requiredLabel}
      value={formData.workEmail}
    />

    <div className={fieldWrapper}>
      <label className={labelClass} htmlFor="engagementType" id="engagementType-label">
        <span>{copy.need}</span>
        <span className="type-label text-slate-600 dark:text-slate-400">{intakeCopy.requiredLabel}</span>
      </label>
      <Select
        triggerClassName={`${inputClass} ${errors.engagementType ? errorInputClass : ""}`}
        id="engagementType"
        invalid={Boolean(errors.engagementType)}
        onChange={(next) => onChange({ target: { name: "engagementType", value: next } })}
        options={SERVICE_KEYS.map((key) => ({ value: key, label: copy.serviceOptions[key] }))}
        value={formData.engagementType || "build"}
      />
      {errors.engagementType ? (
        <p className="type-small text-red-600 dark:text-red-300">{copy.errors.required}</p>
      ) : null}
    </div>

    <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center">
      <button className="btn-primary w-full py-3.5 text-base sm:w-auto sm:flex-1" type="submit">
        <span>{copy.addDetails}</span>
        <ChevronRight className={`h-5 w-5 ${isAr ? "rotate-180" : ""}`} />
      </button>

      <button
        className="btn-outline w-full py-3.5 text-sm sm:w-auto"
        disabled={isSubmitting}
        onClick={onQuickSubmit}
        type="button"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            {intakeCopy.submitting}
          </>
        ) : (
          <span>{copy.submitDirect}</span>
        )}
      </button>
    </div>

    <p className="type-small text-center text-slate-500 dark:text-slate-400">{copy.privacyNote}</p>
  </form>
);

export default LeadFormStepOne;
