import React from 'react';
import { Check } from 'lucide-react';

const clamp = (lines) => ({ display: '-webkit-box', WebkitLineClamp: lines, WebkitBoxOrient: 'vertical', overflow: 'hidden' });

const Picture = ({ image, label, ratio, alt = '' }) =>
  image ? (
    <img src={image} alt={alt} className="block w-full object-cover" style={{ aspectRatio: ratio }} />
  ) : (
    <div className="grid w-full place-items-center bg-gradient-to-br from-slate-200 to-slate-300 text-xs font-semibold text-slate-500" style={{ aspectRatio: ratio }}>
      {label}
    </div>
  );

/**
 * One link card as a platform may draw it. They are approximations: each platform decides its own
 * layout. The card is always laid out left to right except for the text, which follows its own
 * direction, so Arabic titles read correctly inside it. `animationKey` replays the entrance.
 */
const ShareCard = ({ platform, title, description, domain, image, noImage, time }) => {
  const text = { title: title, description: description };
  const common = { dir: 'auto' };

  if (platform === 'whatsapp') {
    return (
      <div className="rounded-2xl bg-[#e7ddd2] p-4 dark:bg-[#0b141a]" dir="ltr">
        <div className="typing mb-2 inline-flex gap-1 rounded-2xl bg-white px-3 py-2 shadow dark:bg-[#202c33]" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="h-2 w-2 rounded-full bg-slate-400" />
        </div>
        <div className="share-card ms-auto max-w-[19rem] rounded-xl rounded-te-sm bg-[#d9fdd3] p-1.5 text-slate-900 shadow dark:bg-[#005c4b] dark:text-white">
          <div className="overflow-hidden rounded-lg bg-black/5 dark:bg-black/20">
            <Picture image={image} label={noImage} ratio="1.91 / 1" />
            <div className="px-3 py-2">
              <p {...common} className="text-sm font-semibold leading-snug" style={clamp(2)}>
                {text.title}
              </p>
              <p {...common} className="mt-0.5 text-xs leading-snug opacity-80" style={clamp(2)}>
                {text.description}
              </p>
              <p className="mt-1 text-[0.7rem] opacity-80">{domain}</p>
            </div>
          </div>
          <p className="flex items-center justify-end gap-1 px-2 pb-0.5 pt-1 text-[0.65rem] opacity-80">
            {time}
            <Check size={12} aria-hidden="true" />
          </p>
        </div>
      </div>
    );
  }

  if (platform === 'x') {
    return (
      <div className="share-card-fast mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-300 bg-white text-slate-900 dark:border-slate-600" dir="ltr">
        <div className="relative">
          <Picture image={image} label={noImage} ratio="1.91 / 1" />
          <span className="absolute bottom-2 start-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">{domain}</span>
        </div>
        <div className="border-t border-slate-200 px-3 py-2.5">
          <p {...common} className="text-sm font-bold leading-snug" style={clamp(1)}>
            {text.title}
          </p>
          <p {...common} className="mt-0.5 text-sm leading-snug text-slate-500" style={clamp(2)}>
            {text.description}
          </p>
        </div>
      </div>
    );
  }

  if (platform === 'linkedin') {
    return (
      <div className="share-card-fast mx-auto max-w-md overflow-hidden rounded-lg border border-slate-300 bg-white text-slate-900 shadow-sm dark:border-slate-600" dir="ltr">
        <Picture image={image} label={noImage} ratio="1.91 / 1" />
        <div className="bg-[#edf3f8] px-3 py-3">
          <p {...common} className="text-sm font-semibold leading-snug" style={clamp(2)}>
            {text.title}
          </p>
          <p className="mt-1 text-xs text-slate-600">{domain}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="share-card-fast mx-auto max-w-md overflow-hidden border border-slate-300 bg-white text-slate-900 dark:border-slate-600" dir="ltr">
      <Picture image={image} label={noImage} ratio="1.91 / 1" />
      <div className="border-t border-slate-200 bg-[#f2f3f5] px-3 py-2.5">
        <p className="text-xs uppercase tracking-wide text-slate-500">{domain}</p>
        <p {...common} className="mt-0.5 text-[0.95rem] font-semibold leading-snug" style={clamp(2)}>
          {text.title}
        </p>
        <p {...common} className="mt-0.5 text-sm leading-snug text-slate-600" style={clamp(1)}>
          {text.description}
        </p>
      </div>
    </div>
  );
};

export default ShareCard;
