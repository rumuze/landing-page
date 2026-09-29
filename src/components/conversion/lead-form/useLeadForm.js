import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth-core";
import { useLeadQualificationSubmission } from "../../../hooks/useLeadQualificationSubmission";
import {
  EMPTY_LEAD_FORM,
  INTENT_TO_ENGAGEMENT,
  ensureUrlProtocol,
  validateLeadQualification,
} from "../../../utils/leadQualification";

/**
 * State and actions for the two-step intake form: field values, validation,
 * step changes and submission. `honeypot` is a field real visitors never see;
 * when a bot fills it the form pretends to succeed and sends nothing.
 */
export function useLeadForm({ errorMessage, intent, onSuccess, source }) {
  const { user } = useAuth();
  const submitLead = useLeadQualificationSubmission();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(EMPTY_LEAD_FORM);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill from the signed-in account and choose the engagement for the intent.
  useEffect(() => {
    const engagement = INTENT_TO_ENGAGEMENT[intent] || "build";
    setFormData((current) => ({
      ...current,
      fullName: user?.displayName || user?.name || current.fullName,
      workEmail: user?.email || current.workEmail,
      engagementType: current.engagementType || engagement,
      serviceType: current.serviceType || engagement,
    }));
  }, [intent, user?.displayName, user?.email, user?.name]);

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

  const validate = (whichStep) => {
    const validationErrors = validateLeadQualification(formData, whichStep);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const finish = () => {
    setIsSubmitted(true);
    setErrors({});

    if (onSuccess) {
      window.setTimeout(() => onSuccess(), 1500);
    }
  };

  const submit = async () => {
    if (honeypot) {
      finish();
      return;
    }

    setIsSubmitting(true);
    try {
      await submitLead({
        intent,
        source,
        formData: { ...formData, website: ensureUrlProtocol(formData.website) },
      });
      finish();
    } catch (error) {
      console.error("Lead qualification submission failed:", error);
      setErrors({ form: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const preventAnd = (action) => (event) => {
    if (event) event.preventDefault();
    action();
  };

  return {
    step,
    formData,
    errors,
    honeypot,
    isSubmitting,
    isSubmitted,
    setHoneypot,
    handleChange,
    goBack: () => setStep(1),
    handleNext: preventAnd(() => {
      if (validate(1)) setStep(2);
    }),
    handleQuickSubmit: preventAnd(() => {
      if (validate(1)) submit();
    }),
    handleFullSubmit: preventAnd(() => {
      if (validate(2)) submit();
    }),
  };
}
