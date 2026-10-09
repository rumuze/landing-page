import React from 'react';

const SAMPLE = {
  ar: {
    message: 'أهلًا، أريد عرض سعر',
    title: 'رموز | برمجيات وتسويق رقمي لشركات الخليج',
    fits: 'مناسب',
    cut: 'سيُقطع',
    length: 'طول العنوان',
  },
  en: {
    message: 'Hi, I would like a quote',
    title: 'Rumuze | Software and digital marketing for the Gulf',
    fits: 'Fits',
    cut: 'Will be cut',
    length: 'Title length',
  },
};

const UTM_PIECES = ['rumuze.com/services', '?utm_source=google', '&utm_medium=cpc', '&utm_campaign=ramadan'];
const SWATCHES = ['#f2b134', '#1d6f8a', '#c5503f', '#16313a', '#e9e2d0'];

/** Looping CSS preview for the tools that have no motion of their own. Decorative, so hidden from assistive tech. */
const STRIPS = {
  whatsapp: (t) => (
    <div className="labs-chat">
      <div className="labs-typing"><i /><i /><i /></div>
      <div className="labs-msg"><span>{t.message}</span></div>
      <div className="labs-wlink" dir="ltr">wa.me/966500000000?text=…</div>
    </div>
  ),
  utm: () => (
    <div className="labs-utm" dir="ltr">
      {UTM_PIECES.map((piece, i) => (
        <span key={piece} className={i === 0 ? 'labs-piece labs-piece-base' : 'labs-piece'} style={{ '--k': i }}>{piece}</span>
      ))}
    </div>
  ),
  serp: (t) => (
    <div className="labs-serp">
      <div className="labs-result"><b><span>{t.title}</span></b></div>
      <div className="labs-gauge"><i /></div>
      <div className="labs-gauge-label">
        <span>{t.length}</span>
        <div><span className="labs-state-ok">{t.fits}</span><span className="labs-state-cut">{t.cut}</span></div>
      </div>
    </div>
  ),
  palette: () => (
    <div className="labs-swatches">
      {SWATCHES.map((color, i) => (
        <i key={color} className={i === 2 ? 'labs-swatch labs-swatch-pick' : 'labs-swatch'} style={{ '--c': color, '--k': i }} />
      ))}
    </div>
  ),
};

const LabsStrip = ({ id, isAr }) => {
  const render = STRIPS[id];
  if (!render) return null;
  return (
    <div className="labs-strip" aria-hidden="true">
      {render(SAMPLE[isAr ? 'ar' : 'en'])}
    </div>
  );
};

export default LabsStrip;
