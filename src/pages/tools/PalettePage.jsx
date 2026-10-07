import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageDown } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import SegmentedControl from '../../components/ui/SegmentedControl';
import CopyButton from '../../components/ui/CopyButton';
import { buttonClass } from '../../components/tools/toolStyles';
import { useCopy } from '../../components/tools/useCopy';
import { toolsContent } from '../../content/toolsContent';
import { contrastRatio, extractPalette, paletteToCss, readableOn, rgbToHex, rgbToHsl, wcagLevel } from '../../tools/palette';

const SAMPLE_SIZE = 128;
const COUNTS = [3, 4, 5, 6, 8];
const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 0, g: 0, b: 0 };
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);

/** Pixels of a smaller copy of the picture, so a big photo is quick to read. */
function sampleBitmap(bitmap) {
  const scale = Math.min(1, SAMPLE_SIZE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(bitmap, 0, 0, width, height);
  return context.getImageData(0, 0, width, height).data;
}

/** A small picture to start from, painted in the page, so the tool opens with colours to show. */
function paintSample() {
  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 300;
  const context = canvas.getContext('2d');
  const sky = context.createLinearGradient(0, 0, 0, 300);
  sky.addColorStop(0, '#12355b');
  sky.addColorStop(0.55, '#e8745a');
  sky.addColorStop(1, '#f7c95c');
  context.fillStyle = sky;
  context.fillRect(0, 0, 480, 300);
  context.fillStyle = '#fff3c4';
  context.beginPath();
  context.arc(330, 150, 46, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#0b2a2f';
  context.beginPath();
  context.moveTo(0, 300);
  context.lineTo(0, 215);
  context.quadraticCurveTo(120, 150, 240, 225);
  context.quadraticCurveTo(360, 165, 480, 230);
  context.lineTo(480, 300);
  context.fill();
  context.fillStyle = '#2f9e6f';
  context.fillRect(0, 262, 480, 38);
  return canvas;
}

const PalettePage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].palette;
  const common = toolsContent[lang].common;
  const { copy } = useCopy();

  const [count, setCount] = useState(5);
  const [pixels, setPixels] = useState(null);
  const [source, setSource] = useState(null); // { url, name, sample }
  const [error, setError] = useState('');
  const [over, setOver] = useState(false);
  const [flash, setFlash] = useState('');
  const url = useRef('');

  const setPicture = (nextUrl, name, sample, data) => {
    if (url.current) URL.revokeObjectURL(url.current);
    url.current = nextUrl;
    setSource({ url: nextUrl, name, sample });
    setPixels(data);
  };

  useEffect(
    () => () => {
      if (url.current) URL.revokeObjectURL(url.current);
    },
    [],
  );

  // The sample picture is painted once the page is in the browser.
  useEffect(() => {
    const canvas = paintSample();
    const data = sampleBitmap(canvas);
    canvas.toBlob((blob) => {
      if (blob) setPicture(URL.createObjectURL(blob), 'sample', true, data);
    }, 'image/png');
  }, []);

  const load = async (file) => {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      setError(page.errors.type);
      return;
    }
    try {
      const bitmap = await createImageBitmap(file);
      const data = sampleBitmap(bitmap);
      bitmap.close?.();
      const colors = extractPalette(data, 1);
      if (!colors.length) {
        setError(page.errors.empty);
        return;
      }
      setError('');
      setPicture(URL.createObjectURL(file), file.name, false, data);
    } catch {
      setError(page.errors.decode);
    }
  };

  // Pasting an image anywhere on the page loads it.
  useEffect(() => {
    const onPaste = (event) => {
      const file = [...(event.clipboardData?.files ?? [])][0];
      if (file) load(file);
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
    // load only reads the page copy and sets state, so one listener is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const palette = useMemo(() => (pixels ? extractPalette(pixels, count) : []), [pixels, count]);
  const paletteKey = palette.map((color) => color.hex).join('');
  const css = useMemo(() => paletteToCss(palette), [palette]);

  useEffect(() => {
    if (!flash) return undefined;
    const timer = window.setTimeout(() => setFlash(''), 1600);
    return () => window.clearTimeout(timer);
  }, [flash]);

  const copyColor = (hex) => {
    copy(hex);
    setFlash(hex);
  };

  return (
    <ToolPageShell wide toolId="palette">
      <label
        htmlFor="pl-input"
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          load(event.dataTransfer.files[0]);
        }}
        className={`flex cursor-pointer flex-col items-center gap-3 rounded-3xl border-2 border-dashed px-6 py-8 text-center transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-cyan-700 ${
          over ? 'dropzone-active border-cyan bg-cyan/10' : 'border-slate-300 hover:border-cyan dark:border-white/20'
        }`}
      >
        {source ? (
          <img src={source.url} alt="" className="max-h-44 w-auto max-w-full rounded-xl object-contain shadow" data-testid="pl-image" />
        ) : (
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan/15 text-cyan-800 dark:text-cyan">
            <ImageDown size={28} aria-hidden="true" />
          </span>
        )}
        <span className="type-h4 copy-primary dark:text-white">{page.drop.title}</span>
        <span className="max-w-md text-sm text-slate-600 dark:text-slate-300">{page.drop.hint}</span>
        {source?.sample ? <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{page.sample}</span> : null}
        <span className={`${buttonClass} bg-cyan text-slate-950`}>{page.drop.choose}</span>
        <input
          id="pl-input"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(event) => {
            load(event.target.files[0]);
            event.target.value = '';
          }}
        />
      </label>
      {error ? (
        <p role="alert" className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}

      <div className="mt-8 max-w-md">
        <SegmentedControl
          id="pl-count"
          label={page.count}
          fill
          options={COUNTS.map((value) => ({ value: String(value), label: String(value) }))}
          value={String(count)}
          onChange={(value) => setCount(Number(value))}
        />
      </div>

      {palette.length ? (
        <>
          <ul key={paletteKey} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" data-testid="pl-swatches">
            {palette.map((color, index) => {
              const text = readableOn(color);
              const textColor = rgbToHex(text);
              const hsl = rgbToHsl(color);
              const percent = Math.round(color.share * 100);
              return (
                <li key={color.hex} className="swatch" style={{ '--i': index }}>
                  <button
                    type="button"
                    data-hex={color.hex}
                    onClick={() => copyColor(color.hex)}
                    aria-label={flash === color.hex ? fill(page.swatch.copied, { hex: color.hex }) : fill(page.swatch.copy, { hex: color.hex })}
                    className="block w-full overflow-hidden rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] text-start shadow-sm"
                  >
                    <span className="block px-4 pb-8 pt-6 text-lg font-black" style={{ backgroundColor: color.hex, color: textColor }} dir="ltr">
                      {flash === color.hex ? '✓ ' : ''}
                      {color.hex.toUpperCase()}
                    </span>
                    <span className="block bg-white/70 px-4 py-3 text-xs text-slate-600 dark:bg-white/5 dark:text-slate-300" dir="ltr">
                      <span className="block">RGB {color.r}, {color.g}, {color.b}</span>
                      <span className="block">HSL {hsl.h}, {hsl.s}%, {hsl.l}%</span>
                      <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                        <span className="swatch-share block h-full rounded-full" style={{ width: `${Math.max(4, percent)}%`, backgroundColor: color.hex }} />
                      </span>
                      <span className="mt-1 block text-[0.7rem]">{fill(page.swatch.share, { n: percent })}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <section className="mt-10" aria-labelledby="pl-contrast-title">
            <h2 id="pl-contrast-title" className="type-h4 copy-primary dark:text-white">
              {page.contrast.title}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-300">{page.contrast.intro}</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[30rem] text-sm" data-testid="pl-contrast">
                <thead>
                  <tr className="text-start text-xs text-slate-500 dark:text-slate-400">
                    <th scope="col" className="py-2 text-start font-semibold">HEX</th>
                    <th scope="col" className="py-2 text-start font-semibold">{page.contrast.white}</th>
                    <th scope="col" className="py-2 text-start font-semibold">{page.contrast.black}</th>
                  </tr>
                </thead>
                <tbody>
                  {palette.map((color) => {
                    const onWhite = contrastRatio(color, WHITE);
                    const onBlack = contrastRatio(color, BLACK);
                    const best = onWhite >= onBlack ? 'white' : 'black';
                    const cell = (id, ratio, textRgb) => {
                      const level = wcagLevel(ratio);
                      return (
                        <td className="py-2 pe-4">
                          <span className="inline-flex items-center gap-2">
                            {/* A drawn sample, not text: it is meant to show a poor pairing when the contrast fails. */}
                            <svg viewBox="0 0 56 36" width="56" height="36" role="img" aria-label={`Aa ${color.hex} ${rgbToHex(textRgb)}`} className="rounded-lg">
                              <rect width="56" height="36" fill={color.hex} />
                              <text x="28" y="24" textAnchor="middle" fontSize="16" fontWeight="700" fill={rgbToHex(textRgb)}>
                                Aa
                              </text>
                            </svg>
                            <span className="tabular-nums" dir="ltr">
                              {ratio.toFixed(2)}:1
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                                level === 'fail' ? 'bg-red-100 text-red-800 dark:bg-red-400/15 dark:text-red-200' : 'bg-cyan/15 text-slate-900 dark:text-white'
                              }`}
                            >
                              {page.contrast.levels[level]}
                            </span>
                            {best === id ? <span className="text-xs font-semibold text-cyan-800 dark:text-cyan">{page.contrast.best}</span> : null}
                          </span>
                        </td>
                      );
                    };
                    return (
                      <tr key={color.hex} className="border-t border-[rgb(var(--border-subtle)/0.6)]" data-hex={color.hex}>
                        <th scope="row" className="py-2 pe-4 text-start font-mono text-xs font-semibold" dir="ltr">
                          <span className="me-2 inline-block h-3 w-3 rounded-full align-middle" style={{ backgroundColor: color.hex }} />
                          {color.hex.toUpperCase()}
                        </th>
                        {cell('white', onWhite, WHITE)}
                        {cell('black', onBlack, BLACK)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-10" aria-labelledby="pl-export-title">
            <h2 id="pl-export-title" className="type-h4 copy-primary dark:text-white">
              {page.export.title}
            </h2>
            <pre tabIndex={0} aria-label={page.export.css} dir="ltr" className="mt-3 max-h-60 overflow-auto rounded-2xl bg-[#0b1220] p-4 text-left font-mono text-[0.8rem] leading-6 text-[#c6f088]" data-testid="pl-css">
              {css}
            </pre>
            <div className="mt-4 flex flex-wrap gap-3">
              <CopyButton id="pl-copy-css" text={css} label={page.export.copyCss} copiedLabel={common.copied} />
              <CopyButton id="pl-copy-hex" text={palette.map((color) => color.hex).join(', ')} variant="outline" label={page.export.copyHexes} copiedLabel={common.copied} />
            </div>
          </section>
        </>
      ) : null}

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default PalettePage;
