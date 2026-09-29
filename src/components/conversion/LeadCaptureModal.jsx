import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LeadQualificationForm from "./LeadQualificationForm";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const LeadCaptureModal = ({ isOpen, intent, source, onClose }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previouslyFocused = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("input, select, textarea")?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Keep Tab inside the dialog while it is open.
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  // Rendered on <body> so the page's own stacking (sticky header, sections)
  // cannot draw over the dialog.
  return createPortal(
    <div
      className="fixed inset-0 z-[11000] bg-slate-950/70 px-4 py-6"
      onClick={onClose}
    >
      <div
        aria-labelledby="lead-modal-title"
        aria-modal="true"
        className={`mx-auto max-h-full w-full max-w-4xl overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-950 ${
          isAr ? "text-right" : "text-left"
        }`}
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-slate-950">
          <div>
            <p className="type-label text-slate-500 dark:text-slate-400">Rumuze</p>
            <h2 className="type-h4 text-slate-950 dark:text-white" id="lead-modal-title">
              {isAr ? "طلب مشروع" : "Project request"}
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

        <LeadQualificationForm intent={intent} onSuccess={onClose} source={source} variant="modal" />
      </div>
    </div>,
    document.body,
  );
};

export default LeadCaptureModal;
