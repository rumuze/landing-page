import React from 'react';
import { cellOn } from '../illustrations/labsPattern';

const SAMPLE = {
  ar: {
    message: 'أهلًا، أريد عرض سعر',
    title: 'رموز | برمجيات وتسويق رقمي لشركات الخليج',
    fits: 'مناسب',
    cut: 'سيُقطع',
    length: 'طول العنوان',
    name: 'رموز',
    copy: 'نسخ',
  },
  en: {
    message: 'Hi, I would like a quote',
    title: 'Rumuze | Software and digital marketing for the Gulf',
    fits: 'Fits',
    cut: 'Will be cut',
    length: 'Title length',
    name: 'Rumuze',
    copy: 'Copy',
  },
};

const UTM_PIECES = ['rumuze.com/services', '?utm_source=google', '&utm_medium=cpc', '&utm_campaign=ramadan'];
// A 9 x 9 code: three finder squares (3 x 3) and data modules that appear in a wave, then a beam scans it.
const QR_SIZE = 9;
const QR_FINDERS = [[0, 0], [6, 0], [0, 6]];
const QR_MODULES = Array.from({ length: QR_SIZE * QR_SIZE }, (_, i) => ({ x: i % QR_SIZE, y: Math.floor(i / QR_SIZE) }))
  .filter(({ x, y }) => !QR_FINDERS.some(([fx, fy]) => x >= fx && x < fx + 3 && y >= fy && y < fy + 3) && cellOn(x, y, 4));
const SCHEMA_LINES = ['{', '  "@type": "Organization",', '  "name": "Rumuze"', '}'];
const JSON_LINES = ['{', '  "ok": true,', '  "items": [1, 2]', '}'];
const MINIFIED = '{"ok":true,"items":[1,2]}';
const range = (n) => Array.from({ length: n }, (_, i) => i);
const SWATCHES = ['#f2b134', '#1d6f8a', '#c5503f', '#16313a', '#e9e2d0'];

/** Looping CSS preview for the tools that have no motion of their own. Decorative, so hidden from assistive tech. */
const STRIPS = {
  hijri: () => (
    <div className="labs-hijri">
      <div className="labs-moon"><i /></div>
      <div className="labs-month">
        {range(21).map((i) => <i key={i} className={i === 9 ? 'labs-day labs-day-on' : 'labs-day'} style={{ '--k': i }} />)}
      </div>
    </div>
  ),
  schema: () => (
    <div className="labs-code" dir="ltr">
      {SCHEMA_LINES.map((line, i) => <span key={line} className="labs-line" style={{ '--k': i }}>{line}</span>)}
      <b className="labs-badge">✓</b>
    </div>
  ),
  brief: () => (
    <div className="labs-paper">
      {[88, 62, 74, 48].map((width, i) => <i key={width} className="labs-bar" style={{ width: `${width}%`, '--k': i }} />)}
      <b className="labs-stamp">✓</b>
    </div>
  ),
  vat: () => (
    <div className="labs-receipt" dir="ltr">
      <span className="labs-row" style={{ '--k': 0 }}><em>100</em></span>
      <span className="labs-row" style={{ '--k': 1 }}><em>+ 15%</em></span>
      <span className="labs-row labs-total" style={{ '--k': 2 }}><em>115</em></span>
    </div>
  ),
  adbudget: () => (
    <div className="labs-funnel">
      {[100, 72, 44].map((width, i) => <i key={width} className="labs-tier" style={{ width: `${width}%`, '--k': i }} />)}
      <b className="labs-drip" />
    </div>
  ),
  imagecompress: () => (
    <div className="labs-compare">
      <i className="labs-pic labs-pic-sharp" />
      <i className="labs-pic labs-pic-soft" />
      <b className="labs-handle" />
      <span className="labs-down">▼</span>
    </div>
  ),
  signature: (t) => (
    <div className="labs-sig">
      <i className="labs-avatar" />
      <div className="labs-sig-text">
        <b className="labs-sig-name">{t.name}</b>
        <i className="labs-sig-line" />
        <i className="labs-sig-line labs-sig-short" />
      </div>
      <span className="labs-copy">{t.copy}</span>
    </div>
  ),
  social: () => (
    <div className="labs-share">
      <i className="labs-share-img" />
      <i className="labs-share-line" />
      <i className="labs-share-line labs-share-short" />
      <b className="labs-heart">♥</b>
      <div className="labs-dots-row">{range(3).map((i) => <i key={i} className="labs-net" style={{ '--k': i }} />)}</div>
    </div>
  ),
  wordcount: () => (
    <div className="labs-words">
      {[96, 82, 90, 60].map((width, i) => <i key={width} className="labs-wline" style={{ width: `${width}%`, '--k': i }} />)}
      <b className="labs-count" />
    </div>
  ),
  seofiles: () => (
    <div className="labs-files" dir="ltr">
      {['robots.txt', 'sitemap.xml'].map((name, i) => (
        <div key={name} className="labs-file" style={{ '--k': i }}>
          <i className="labs-file-line" /><i className="labs-file-line labs-file-short" /><i className="labs-file-line" />
          <span>{name}</span>
        </div>
      ))}
    </div>
  ),
  invoice: () => (
    <div className="labs-invoice">
      <i className="labs-inv-head" />
      {range(3).map((i) => <span key={i} className="labs-inv-row" style={{ '--k': i }}><i /><b /></span>)}
      <span className="labs-inv-total"><i /><b /></span>
      <em className="labs-pdf">PDF</em>
    </div>
  ),
  json: () => (
    <div className="labs-json" dir="ltr">
      <pre className="labs-json-pretty">{JSON_LINES.join('\n')}</pre>
      <pre className="labs-json-min">{MINIFIED}</pre>
    </div>
  ),
  favicon: () => (
    <div className="labs-fav">
      {[['16', 22], ['32', 38], ['180', 64]].map(([label, size], i) => (
        <span key={label} className="labs-fav-item" style={{ '--k': i }}>
          <i className="labs-fav-box" style={{ width: size, height: size }} />
          <em dir="ltr">{label}</em>
        </span>
      ))}
    </div>
  ),
  cssunits: () => (
    <div className="labs-units" dir="ltr">
      <span className="labs-unit">16px</span>
      <div className="labs-track"><i className="labs-knob" /></div>
      <span className="labs-unit labs-unit-b">1rem</span>
    </div>
  ),
  qr: () => (
    <div className="labs-qr">
      <div className="labs-qr-grid">
        {QR_FINDERS.map(([x, y]) => (
          <i key={`f${x}${y}`} className="labs-qr-finder" style={{ gridColumn: `${x + 1} / span 3`, gridRow: `${y + 1} / span 3`, '--d': x + y }} />
        ))}
        {QR_MODULES.map(({ x, y }) => (
          <i key={`${x}-${y}`} className="labs-qr-module" style={{ gridColumn: x + 1, gridRow: y + 1, '--d': x + y }} />
        ))}
        <b className="labs-qr-beam" />
      </div>
      <span className="labs-qr-chip" dir="ltr">PNG</span>
    </div>
  ),
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
