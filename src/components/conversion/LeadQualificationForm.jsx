import { useTranslation } from "react-i18next";
import { conversionContent } from "../../content/conversionContent";
import { resolveLeadIntent } from "../../utils/leadQualification";
import LeadFormIntro from "./lead-form/LeadFormIntro";
import LeadFormStepOne from "./lead-form/LeadFormStepOne";
import LeadFormStepTwo from "./lead-form/LeadFormStepTwo";
import LeadFormSuccess from "./lead-form/LeadFormSuccess";
import { leadFormCopy } from "./lead-form/leadFormCopy";
import { useLeadForm } from "./lead-form/useLeadForm";

const LeadQualificationForm = ({
  intent = "discovery",
  source = "website-homepage",
  variant = "page",
  onSuccess,
}) => {
  const { i18n } = useTranslation();
  const locale = i18n.language === "ar" ? "ar" : "en";
  const isAr = locale === "ar";
  const isModal = variant === "modal";

  const intakeCopy = conversionContent[locale].intake;
  const copy = leadFormCopy[locale];
  const safeIntent = resolveLeadIntent(intent);
  const intentConfig = intakeCopy.intents[safeIntent];

  const form = useLeadForm({
    errorMessage: copy.errors.submit,
    intent: safeIntent,
    onSuccess,
    source,
  });

  if (form.isSubmitted) {
    return (
      <LeadFormSuccess
        backLabel={intakeCopy.backToSite}
        body={intakeCopy.confirmationBody}
        isAr={isAr}
        isModal={isModal}
        locale={locale}
        title={intakeCopy.confirmationTitle}
      />
    );
  }

  const stepProps = {
    copy,
    errors: form.errors,
    formData: form.formData,
    intakeCopy,
    isAr,
    isSubmitting: form.isSubmitting,
    onChange: form.handleChange,
  };

  return (
    <div className={`px-6 py-8 md:px-8 ${isAr ? "text-right" : "text-left"}`}>
      <div className={`grid gap-8 ${isModal ? "xl:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[0.85fr_1.15fr]"}`}>
        <LeadFormIntro
          badge={copy.badge}
          description={intentConfig.description}
          headingTag={isModal ? "h3" : "h1"}
          step={form.step}
          stepHints={copy.stepHint}
          stepLabels={copy.stepLabel}
          title={intentConfig.title}
        />

        <div className="relative">
          {form.errors.form ? (
            <div
              className="type-small mb-4 rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-red-700 dark:bg-red-500/10 dark:text-red-200"
              role="alert"
            >
              {form.errors.form}
            </div>
          ) : null}

          {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="companyWebsite">Leave this field empty</label>
            <input
              autoComplete="off"
              id="companyWebsite"
              name="companyWebsite"
              onChange={(event) => form.setHoneypot(event.target.value)}
              tabIndex={-1}
              type="text"
              value={form.honeypot}
            />
          </div>

          {form.step === 1 ? (
            <LeadFormStepOne
              {...stepProps}
              onNext={form.handleNext}
              onQuickSubmit={form.handleQuickSubmit}
            />
          ) : (
            <LeadFormStepTwo {...stepProps} onBack={form.goBack} onSubmit={form.handleFullSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadQualificationForm;
