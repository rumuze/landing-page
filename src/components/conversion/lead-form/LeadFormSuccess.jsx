import { CheckCircle2 } from "lucide-react";
import ConversionButton from "../ConversionButton";

const LeadFormSuccess = ({ backLabel, body, isAr, isModal, locale, title }) => (
  <div className={`px-6 py-10 md:px-8 ${isAr ? "text-right" : "text-left"}`}>
    <div
      className="mx-auto max-w-xl rounded-2xl border border-[#3CBF00]/30 bg-[#3CBF00]/5 p-8 text-center dark:bg-[#3CBF00]/10"
      role="status"
    >
      <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#3CBF00]/20 text-[#3CBF00]">
        <CheckCircle2 size={32} />
      </div>
      <h3 className="type-h3 text-slate-950 dark:text-white">{title}</h3>
      <p className="type-body mt-3 text-slate-600 dark:text-slate-300">{body}</p>
      {!isModal ? (
        <div className="mt-6 flex justify-center">
          <ConversionButton to={locale === "ar" ? "/" : "/en"} variant="secondary">
            {backLabel}
          </ConversionButton>
        </div>
      ) : null}
    </div>
  </div>
);

export default LeadFormSuccess;
