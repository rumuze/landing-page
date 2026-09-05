import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Loader2, Sparkles } from "lucide-react";
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

const fieldWrapper = "space-y-1.5";
const labelClass = "type-small font-medium text-slate-800 dark:text-slate-100 flex items-center justify-between";
const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-[15px] leading-6 tracking-[-0.01em] text-slate-950 outline-none transition-all duration-200 focus:border-[#3CBF00] focus:ring-2 focus:ring-[#3CBF00]/20 dark:border-white/15 dark:bg-slate-950 dark:text-white dark:focus:border-[#3CBF00]";
const textareaClass = `${inputClass} min-h-[110px] resize-y`;

const textInputClasses = (hasError) =>
  `${inputClass} ${hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`;

const badgeClass =
  "inline-flex items-center gap-1.5 rounded-full border border-[#006B54]/20 bg-[#006B54]/10 px-3 py-1 text-xs font-semibold text-[#006B54] dark:border-[#3CBF00]/30 dark:bg-[#3CBF00]/10 dark:text-[#3CBF00]";

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

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(EMPTY_LEAD_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fieldMessages = useMemo(
    () => ({
      select: isAr ? "اختر ما يناسبك" : "Select an option",
      invalidEmail: isAr
        ? "يرجى إدخال بريد مهني صحيح أو رقم واتساب مع رمز الدولة."
        : "Please enter a valid work email or WhatsApp with country code.",
      invalidWebsite: isAr ? "يرجى إدخال موقع صحيح." : "Please enter a valid website.",
      required: isAr ? "هذا الحقل مطلوب للمتابعة." : "This field is required.",
    }),
    [isAr],
  );

  const serviceOptions = useMemo(
    () => [
      {
        value: "build",
        label: isAr ? "بناء منصة / SaaS / ERP" : "Platform / SaaS / ERP Build",
      },
      {
        value: "audit",
        label: isAr ? "تدقيق تقني للمنظومة الحالية" : "System Audit & Review",
      },
      {
        value: "infrastructure",
        label: isAr ? "بنية تحتية للنمو والتسويق" : "Growth Infrastructure Setup",
      },
    ],
    [isAr],
  );

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      fullName: user?.displayName || user?.name || current.fullName,
      workEmail: user?.email || current.workEmail,
      engagementType:
        current.engagementType || INTENT_TO_ENGAGEMENT[safeIntent] || "build",
      serviceType:
        current.serviceType || INTENT_TO_ENGAGEMENT[safeIntent] || "build",
    }));
  }, [safeIntent, user?.displayName, user?.email, user?.name]);

  const isModal = variant === "modal";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === "engagementType" ? { serviceType: value } : {}),
      ...(name === "serviceType" ? { engagementType: value } : {}),
    }));

    if (errors[name]) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleNextStep = (event) => {
    if (event) event.preventDefault();
    const validationErrors = validateLeadQualification(formData, 1);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setStep(2);
    }
  };

  const executeSubmit = async (dataToSubmit) => {
    setIsSubmitting(true);
    try {
      await submitLeadQualification({
        intent: safeIntent,
        source,
        formData: {
          ...dataToSubmit,
          website: ensureUrlProtocol(dataToSubmit.website),
        },
      });

      setIsSubmitted(true);
      setErrors({});

      if (onSuccess) {
        window.setTimeout(() => onSuccess(), 1500);
      }
    } catch (error) {
      console.error("Lead qualification submission failed:", error);
      setErrors({
        form:
          locale === "ar"
            ? "تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة."
            : "We could not submit your request right now. Please try again or reach out directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickSubmit = (event) => {
    if (event) event.preventDefault();
    const validationErrors = validateLeadQualification(formData, 1);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      executeSubmit(formData);
    }
  };

  const handleFullSubmit = (event) => {
    if (event) event.preventDefault();
    const validationErrors = validateLeadQualification(formData, 2);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      executeSubmit(formData);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`px-6 py-10 md:px-8 ${isAr ? "text-right" : "text-left"}`}>
        <div className="mx-auto max-w-xl rounded-2xl border border-[#3CBF00]/30 bg-[#3CBF00]/5 p-8 text-center dark:bg-[#3CBF00]/10">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#3CBF00]/20 text-[#3CBF00]">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="type-h3 text-slate-950 dark:text-white">
            {copy.confirmationTitle}
          </h3>
          <p className="type-body mt-3 text-slate-600 dark:text-slate-300">
            {copy.confirmationBody}
          </p>
          {!isModal ? (
            <div className="mt-6 flex justify-center">
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
      <div
        className={`grid gap-8 ${
          isModal ? "xl:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[0.85fr_1.15fr]"
        }`}
      >
        {/* Left Side: Context & Value Proposition */}
        <div className="space-y-5">
          <span className={badgeClass}>
            <Sparkles size={14} />
            {isAr ? "جلسة تشخيص ومراجعة معمارية" : "Architecture Discovery"}
          </span>

          <div>
            <h3 className="type-h3 text-slate-950 dark:text-white">
              {intentConfig.title}
            </h3>
            <p className="type-body mt-2 text-slate-600 dark:text-slate-300">
              {intentConfig.description}
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
              <span>
                {isAr
                  ? step === 1
                    ? "الخطوة 1 من 2: المعلومات الأساسية"
                    : "الخطوة 2 من 2: تفاصيل إضافية (اختيارية)"
                  : step === 1
                    ? "Step 1 of 2: Primary Info"
                    : "Step 2 of 2: Additional Context (Optional)"}
              </span>
              <span className="text-[#006B54] dark:text-[#3CBF00]">
                {step === 1 ? "50%" : "100%"}
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: step === 1 ? "50%" : "100%",
                  background: "linear-gradient(135deg, #006B54 0%, #3CBF00 100%)",
                }}
              />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              {step === 1
                ? isAr
                  ? "3 حقول سريعة فقط لحجز موعدك."
                  : "Only 3 quick fields to reserve your session."
                : isAr
                  ? "بيساعدنا نخدمك بشكل أفضل ونحدد نطاق العمل بدقة."
                  : "Helps us prepare a tailored architecture assessment."}
            </p>
          </div>
        </div>

        {/* Right Side: Micro Form */}
        <div className="relative">
          {errors.form ? (
            <div className="type-small mb-4 rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-red-700 dark:bg-red-500/10 dark:text-red-200">
              {errors.form}
            </div>
          ) : null}

          {step === 1 ? (
            <form className="space-y-4" noValidate onSubmit={handleNextStep}>
              {/* Field 1: Full Name */}
              <FormField
                error={errors.fullName}
                fieldMessages={fieldMessages}
                label={isAr ? "الاسم الكامل" : "Full Name"}
                name="fullName"
                onChange={handleChange}
                placeholder={isAr ? "محمد أحمد" : "Alex Mercer"}
                requiredLabel={copy.requiredLabel}
                value={formData.fullName}
              />

              {/* Field 2: WhatsApp / Work Email */}
              <FormField
                error={errors.workEmail}
                fieldMessages={fieldMessages}
                label={isAr ? "واتساب / بريد العمل" : "WhatsApp / Work Email"}
                name="workEmail"
                onChange={handleChange}
                placeholder={
                  isAr
                    ? "name@company.com أو +966 5x xxx xxxx"
                    : "name@company.com or +971 5x xxx xxxx"
                }
                requiredLabel={copy.requiredLabel}
                type="text"
                value={formData.workEmail}
              />

              {/* Field 3: What you need */}
              <div className={fieldWrapper}>
                <label className={labelClass} htmlFor="engagementType">
                  <span>{isAr ? "ما تحتاجه بالضبط" : "What you need"}</span>
                  <span className="type-label text-slate-400 dark:text-slate-500">
                    {copy.requiredLabel}
                  </span>
                </label>
                <select
                  className={`${inputClass} ${
                    errors.engagementType ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  id="engagementType"
                  name="engagementType"
                  onChange={handleChange}
                  value={formData.engagementType || "build"}
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.engagementType ? (
                  <p className="type-small text-red-600 dark:text-red-300">
                    {fieldMessages.required}
                  </p>
                ) : null}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center">
                <button
                  className="btn-primary w-full py-3.5 text-base sm:w-auto sm:flex-1"
                  type="submit"
                >
                  <span>{isAr ? "المتابعة لإضافة تفاصيل" : "Add project details"}</span>
                  <ChevronRight
                    className={`h-5 w-5 ${isAr ? "rotate-180" : ""}`}
                  />
                </button>

                <button
                  className="btn-outline w-full py-3.5 text-sm sm:w-auto"
                  disabled={isSubmitting}
                  onClick={handleQuickSubmit}
                  type="button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      {copy.submitting}
                    </>
                  ) : (
                    <span>{isAr ? "إرسال الطلب الآن مباشرة" : "Submit directly"}</span>
                  )}
                </button>
              </div>

              <p className="type-small text-center text-slate-500 dark:text-slate-400">
                {isAr
                  ? "🔒 بياناتك مشفرة ومحمية بالكامل ولا يتم مشاركتها أبداً."
                  : "🔒 Your data is fully encrypted and never shared."}
              </p>
            </form>
          ) : (
            <form className="space-y-4" noValidate onSubmit={handleFullSubmit}>
              {/* Field 4: Company Name (Optional) */}
              <FormField
                error={errors.companyName}
                fieldMessages={fieldMessages}
                label={isAr ? "اسم الشركة / المنظمة" : "Company / Organization"}
                name="companyName"
                onChange={handleChange}
                optionalLabel={isAr ? "(اختياري)" : "(Optional)"}
                placeholder={isAr ? "اسم شركتك أو مشروعك" : "Your enterprise or startup"}
                value={formData.companyName}
              />

              {/* Field 5: Description (Optional) */}
              <div className={fieldWrapper}>
                <label className={labelClass} htmlFor="description">
                  <span>
                    {isAr
                      ? "تفاصيل المنظومة أو التحدي الحالي"
                      : "Current architecture or bottleneck"}
                  </span>
                  <span className="type-label text-slate-400 dark:text-slate-500">
                    {isAr ? "(اختياري)" : "(Optional)"}
                  </span>
                </label>
                <textarea
                  className={textareaClass}
                  id="description"
                  name="description"
                  onChange={handleChange}
                  placeholder={
                    isAr
                      ? "صف باختصار ما ترغب في إنجازه، التحديات التقنية، أو المتطلبات الخاصة..."
                      : "Briefly describe your goals, current bottlenecks, or technical scope..."
                  }
                  value={formData.description}
                />
              </div>

              {/* Action Buttons for Step 2 */}
              <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center">
                <button
                  className="btn-outline w-full py-3.5 text-sm sm:w-auto"
                  onClick={() => setStep(1)}
                  type="button"
                >
                  <ArrowLeft
                    className={`h-4 w-4 ${isAr ? "rotate-180" : ""}`}
                  />
                  <span>{isAr ? "رجوع" : "Back"}</span>
                </button>

                <button
                  className="btn-primary w-full py-3.5 text-base sm:w-auto sm:flex-1"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>{copy.submitting}</span>
                    </>
                  ) : (
                    <>
                      <span>{isAr ? "تأكيد وإرسال الطلب" : "Confirm & Submit"}</span>
                      <ArrowRight
                        className={`h-5 w-5 ${isAr ? "rotate-180" : ""}`}
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const FormField = ({
  error,
  fieldMessages,
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
      <span>{label}</span>
      {requiredLabel ? (
        <span className="type-label text-slate-400 dark:text-slate-500">
          {requiredLabel}
        </span>
      ) : optionalLabel ? (
        <span className="type-label text-slate-400 dark:text-slate-500">
          {optionalLabel}
        </span>
      ) : null}
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
    {error ? (
      <p className="type-small text-red-600 dark:text-red-300">
        {error === "email"
          ? fieldMessages.invalidEmail
          : error === "url"
            ? fieldMessages.invalidWebsite
            : fieldMessages.required}
      </p>
    ) : null}
  </div>
);

export default LeadQualificationForm;
