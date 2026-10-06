import { Sparkles } from "lucide-react";
import Illustration from "../../illustrations/Illustration";
import { PAGE_SCENES } from "../../illustrations/serviceScenes";
import { badgeClass } from "./leadFormStyles";

/** Left column: what the form is for, and how far along the visitor is. */
const LeadFormIntro = ({ badge, description, headingTag: HeadingTag, showScene = false, step, stepHints, stepLabels, title }) => {
  const percent = step === 1 ? 50 : 100;

  return (
    <div className="space-y-5">
      <span className={badgeClass}>
        <Sparkles size={14} />
        {badge}
      </span>

      <div>
        <HeadingTag className="type-h3 text-slate-950 dark:text-white">{title}</HeadingTag>
        <p className="type-body mt-2 text-slate-600 dark:text-slate-300">{description}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
          <span>{stepLabels[step - 1]}</span>
          <span className="text-[#006B54] dark:text-[#3CBF00]">{percent}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-[#2b8000] transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{stepHints[step - 1]}</p>
      </div>

      {showScene ? <Illustration scene={PAGE_SCENES.contact} className="hidden w-full max-w-sm lg:block" /> : null}
    </div>
  );
};

export default LeadFormIntro;
