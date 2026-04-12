import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { conversionContent } from "../../content/conversionContent";
import { useAuth } from "../../context/auth-core";
import { useLeadQualificationSubmission } from "../../hooks/useLeadQualificationSubmission";
import {
  EMPTY_LEAD_FORM,
  INTENT_TO_ENGAGEMENT,
  ensureUrlProtocol,
  resolveLeadIntent,
  validateLeadQualification,
} from "../../utils/leadQualification";
import ConversionButton from "./ConversionButton";

const fieldWrapper =
  "space-y-2";
const labelClass =
  "type-small font-medium text-slate-800 dark:text-slate-100";
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-[15px] leading-6 tracking-[-0.01em] text-slate-950 outline-none transition-colors focus:border-cyan dark:border-white/15 dark:bg-slate-950 dark:text-white";
const textareaClass = `${inputClass} min-h-[132px] resize-y`;

const selectInputClasses = (hasError) =>
  `${inputClass} ${hasError ? "border-red-500 focus:border-red-500" : ""}`;

const textInputClasses = (hasError) =>
  `${inputClass} ${hasError ? "border-red-500 focus:border-red-500" : ""}`;

const badgeClass =
  "type-label inline-flex items-center rounded-md border border-slate-200 bg-slate-100 px-2 py-1 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300";

const LeadQualificationForm = ({
  intent = "discovery",
  source = "website-homepage",
  variant = "page",
  onSuccess,
}) => {
  const { i18n } = useTranslation();
  const locale = i18n.language === "ar" ? "ar" : "en";
  const copy = conversionContent[locale].intake;
  const safeIntent = resolveLeadIntent(intent);
  const intentConfig = copy.intents[safeIntent];
  const { user } = useAuth();
  const submitLeadQualification = useLeadQualificationSubmission();
  const isAr = locale === "ar";
  const fieldMessages = useMemo(
    () => ({
      select: isAr ? "اختر" : "Select",
      invalidEmail: isAr ? "يرجى إدخال بريد مهني صحيح." : "Please enter a valid work email.",
      invalidWebsite: isAr ? "يرجى إدخال موقع صحيح." : "Please enter a valid website.",
      required: isAr ? "هذا الحقل مطلوب." : "This field is required.",
    }),
    [isAr],
  );

  const [formData, setFormData] = useState(EMPTY_LEAD_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      fullName: user?.displayName || user?.name || current.fullName,
      workEmail: user?.email || current.workEmail,
      engagementType:
        current.engagementType || INTENT_TO_ENGAGEMENT[safeIntent] || "",
    }));
  }, [safeIntent, user?.displayName, user?.email, user?.name]);

  const selectOptions = useMemo(() => copy.options, [copy.options]);
  const isModal = variant === "modal";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateLeadQualification(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitLeadQualification({
        intent: safeIntent,
        source,
        formData: {
          ...formData,
          website: ensureUrlProtocol(formData.website),
        },
      });

      setIsSubmitted(true);
      setErrors({});

      if (onSuccess) {
        window.setTimeout(() => onSuccess(), 1200);
      }
    } catch (error) {
      console.error("Lead qualification submission failed:", error);
      setErrors({
        form:
          locale === "ar"
            ? "تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى."
            : "We could not submit your request right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`px-6 py-10 md:px-8 ${isAr ? "text-right" : "text-left"}`}>
        <div className="mx-auto max-w-2xl rounded-lg border border-green-500/30 bg-green-50 p-8 dark:bg-green-500/10">
          <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15 text-green-600 dark:text-green-300">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="type-h3 text-slate-950 dark:text-white">
            {copy.confirmationTitle}
          </h3>
          <p className="type-body mt-3 max-w-xl text-slate-600 dark:text-slate-300">
            {copy.confirmationBody}
          </p>
          {!isModal ? (
            <div className="mt-6">
              <ConversionButton
                to={locale === "ar" ? "/ar/" : "/"}
                variant="secondary"
              >
                {copy.backToSite}
              </ConversionButton>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={`px-6 py-8 md:px-8 ${isAr ? "text-right" : "text-left"}`}>
      <div className={`grid gap-8 ${isModal ? "xl:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[0.9fr_1.1fr]"}`}>
        <div className="space-y-5">
          <span className={badgeClass}>{copy.pageEyebrow}</span>
          <div>
            <h3 className="type-h3 text-slate-950 dark:text-white">
              {intentConfig.title}
            </h3>
            <p className="type-body mt-3 text-slate-600 dark:text-slate-300">
              {intentConfig.description}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
            <p className="type-small font-medium text-slate-950 dark:text-white">
              {copy.pageIntro}
            </p>
            <p className="type-body mt-3 text-slate-600 dark:text-slate-300">
              {copy.reviewNote}
            </p>
          </div>
        </div>

        <form className="space-y-6" noValidate onSubmit={handleSubmit}>
          {errors.form ? (
            <div className="type-small rounded-lg border border-red-500/30 bg-red-50 px-4 py-3 text-red-700 dark:bg-red-500/10 dark:text-red-200">
              {errors.form}
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              error={errors.fullName}
              fieldMessages={fieldMessages}
              label={copy.fields.fullName}
              name="fullName"
              onChange={handleChange}
              placeholder={copy.placeholders.fullName}
              requiredLabel={copy.requiredLabel}
              value={formData.fullName}
            />
            <FormField
              error={errors.workEmail}
              fieldMessages={fieldMessages}
              label={copy.fields.workEmail}
              name="workEmail"
              onChange={handleChange}
              placeholder={copy.placeholders.workEmail}
              requiredLabel={copy.requiredLabel}
              type="email"
              value={formData.workEmail}
            />
            <FormField
              error={errors.companyName}
              fieldMessages={fieldMessages}
              label={copy.fields.companyName}
              name="companyName"
              onChange={handleChange}
              placeholder={copy.placeholders.companyName}
              requiredLabel={copy.requiredLabel}
              value={formData.companyName}
            />
            <FormField
              error={errors.role}
              fieldMessages={fieldMessages}
              label={copy.fields.role}
              name="role"
              onChange={handleChange}
              placeholder={copy.placeholders.role}
              requiredLabel={copy.requiredLabel}
              value={formData.role}
            />
            <FormField
              error={errors.website}
              fieldMessages={fieldMessages}
              label={copy.fields.website}
              name="website"
              onChange={handleChange}
              placeholder={copy.placeholders.website}
              requiredLabel={copy.requiredLabel}
              value={formData.website}
            />
            <SelectField
              error={errors.companySize}
              fieldMessages={fieldMessages}
              label={copy.fields.companySize}
              name="companySize"
              onChange={handleChange}
              options={selectOptions.companySize}
              placeholderLabel={fieldMessages.select}
              requiredLabel={copy.requiredLabel}
              value={formData.companySize}
            />
            <SelectField
              error={errors.market}
              fieldMessages={fieldMessages}
              label={copy.fields.market}
              name="market"
              onChange={handleChange}
              options={selectOptions.market}
              placeholderLabel={fieldMessages.select}
              requiredLabel={copy.requiredLabel}
              value={formData.market}
            />
            <SelectField
              error={errors.engagementType}
              fieldMessages={fieldMessages}
              helper={copy.helper.engagementType}
              label={copy.fields.engagementType}
              name="engagementType"
              onChange={handleChange}
              options={selectOptions.engagementType}
              placeholderLabel={fieldMessages.select}
              requiredLabel={copy.requiredLabel}
              value={formData.engagementType}
            />
            <SelectField
              error={errors.primaryChallenge}
              fieldMessages={fieldMessages}
              label={copy.fields.primaryChallenge}
              name="primaryChallenge"
              onChange={handleChange}
              options={selectOptions.primaryChallenge}
              placeholderLabel={fieldMessages.select}
              requiredLabel={copy.requiredLabel}
              value={formData.primaryChallenge}
            />
            <SelectField
              error={errors.timeline}
              fieldMessages={fieldMessages}
              label={copy.fields.timeline}
              name="timeline"
              onChange={handleChange}
              options={selectOptions.timeline}
              placeholderLabel={fieldMessages.select}
              requiredLabel={copy.requiredLabel}
              value={formData.timeline}
            />
            <div className="md:col-span-2">
              <SelectField
                error={errors.monthlyActivity}
                fieldMessages={fieldMessages}
                label={copy.fields.monthlyActivity}
                name="monthlyActivity"
                onChange={handleChange}
                optionalLabel={copy.optionalLabel}
                options={selectOptions.monthlyActivity}
                placeholderLabel={fieldMessages.select}
                value={formData.monthlyActivity}
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                error={errors.systems}
                fieldMessages={fieldMessages}
                helper={copy.helper.systems}
                label={copy.fields.systems}
                name="systems"
                onChange={handleChange}
                optionalLabel={copy.optionalLabel}
                placeholder={copy.placeholders.systems}
                value={formData.systems}
              />
            </div>
            <div className="md:col-span-2">
              <TextAreaField
                error={errors.description}
                fieldMessages={fieldMessages}
                label={copy.fields.description}
                name="description"
                onChange={handleChange}
                optionalLabel={copy.optionalLabel}
                placeholder={copy.placeholders.description}
                value={formData.description}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <p className="type-small text-slate-500 dark:text-slate-400">
              {copy.reviewNote}
            </p>
            <ConversionButton className="sm:min-w-[220px]" disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  {copy.submitting}
                </>
              ) : (
                <>
                  {copy.submit}
                  <ArrowRight size={16} />
                </>
              )}
            </ConversionButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const FieldMeta = ({ requiredLabel, optionalLabel, helper, error, fieldMessages }) => (
  <>
    {helper ? (
      <p className="type-small text-slate-500 dark:text-slate-400">{helper}</p>
    ) : null}
    {error ? (
      <p className="type-small text-red-600 dark:text-red-300">
        {error === "email"
          ? fieldMessages.invalidEmail
          : error === "url"
            ? fieldMessages.invalidWebsite
            : fieldMessages.required}
      </p>
    ) : null}
    {!error && (requiredLabel || optionalLabel) ? (
      <p className="type-label text-slate-400 dark:text-slate-500">
        {requiredLabel || optionalLabel}
      </p>
    ) : null}
  </>
);

const FormField = ({
  error,
  fieldMessages,
  helper,
  label,
  name,
  onChange,
  optionalLabel,
  placeholder,
  requiredLabel,
  type = "text",
  value,
}) => (
  <div className={fieldWrapper}>
    <label className={labelClass} htmlFor={name}>
      {label}
    </label>
    <input
      className={textInputClasses(error)}
      id={name}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
    <FieldMeta
      error={error}
      fieldMessages={fieldMessages}
      helper={helper}
      optionalLabel={optionalLabel}
      requiredLabel={requiredLabel}
    />
  </div>
);

const SelectField = ({
  error,
  fieldMessages,
  helper,
  label,
  name,
  onChange,
  optionalLabel,
  options,
  placeholderLabel,
  requiredLabel,
  value,
}) => (
  <div className={fieldWrapper}>
    <label className={labelClass} htmlFor={name}>
      {label}
    </label>
    <select
      className={selectInputClasses(error)}
      id={name}
      name={name}
      onChange={onChange}
      value={value}
    >
      <option value="">{placeholderLabel}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <FieldMeta
      error={error}
      fieldMessages={fieldMessages}
      helper={helper}
      optionalLabel={optionalLabel}
      requiredLabel={requiredLabel}
    />
  </div>
);

const TextAreaField = ({
  error,
  fieldMessages,
  label,
  name,
  onChange,
  optionalLabel,
  placeholder,
  value,
}) => (
  <div className={fieldWrapper}>
    <label className={labelClass} htmlFor={name}>
      {label}
    </label>
    <textarea
      className={`${textareaClass} ${error ? "border-red-500 focus:border-red-500" : ""}`}
      id={name}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
    <FieldMeta error={error} fieldMessages={fieldMessages} optionalLabel={optionalLabel} />
  </div>
);

export default LeadQualificationForm;
