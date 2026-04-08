import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LeadQualificationForm from "./LeadQualificationForm";

const LeadCaptureModal = ({ isOpen, intent, source, onClose }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`mx-auto max-h-full w-full max-w-4xl overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-950 ${
          isAr ? "text-right" : "text-left"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/95">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Rumuze
            </p>
            <h2 className="text-base font-semibold text-slate-950 dark:text-white">
              {isAr ? "طلب مؤهل" : "Qualified request"}
            </h2>
          </div>
          <button
            aria-label={isAr ? "إغلاق" : "Close"}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <LeadQualificationForm
          intent={intent}
          onSuccess={onClose}
          source={source}
          variant="modal"
        />
      </div>
    </div>
  );
};

export default LeadCaptureModal;
