import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Download, ImagePlus } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import CodeStream from '../../components/tools/CodeStream';
import { saveBlob, saveText } from '../../components/tools/saveFile';
import SegmentedControl from '../../components/ui/SegmentedControl';
import CopyButton from '../../components/ui/CopyButton';
import { buttonClass, inputClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import { SHAPES, SIZES, buildIco, cornerRadius, glyphOf, glyphScale, headWithColor, isHex, manifestJson } from '../../tools/favicon';
import { contrastRatio, hexToRgb } from '../../tools/palette';
import { tokenizeHtmlLine } from '../../tools/socialPreview';

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);
const ACCEPT = 'image/png,image/jpeg,image/webp,image/svg+xml';
const MAX_FILE = 8 * 1024 * 1024;

/** Draws one icon on a canvas of `size` pixels: a shape in the background colour with the letters or the picture on it. */
function draw(canvas, size, { glyph, bg, fg, shape, picture }) {
  const ctx = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;
  ctx.clearRect(0, 0, size, size);
  const radius = cornerRadius(shape, size);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, radius);
  ctx.clip();
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);
  if (picture) {
    // Cropped to a square from the middle, so a wide picture is not squeezed.
    const side = Math.min(picture.width, picture.height);
    ctx.drawImage(picture, (picture.width - side) / 2, (picture.height - side) / 2, side, side, 0, 0, size, size);
  } else if (glyph) {
    ctx.fillStyle = fg;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `800 ${Math.round(size * glyphScale(glyph))}px "Noto Sans Arabic", Cairo, system-ui, -apple-system, "Segoe UI", sans-serif`;
    ctx.fillText(glyph, size / 2, size / 2 + size * 0.04);
  }
  ctx.restore();
}

const toBlob = (canvas) => new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

const FaviconPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].favicon;
  const common = toolsContent[lang].common;

  const [text, setText] = useState('R');
  const [bg, setBg] = useState('#0f766e');
  const [fg, setFg] = useState('#ffffff');
  const [shape, setShape] = useState('rounded');
  const [picture, setPicture] = useState(null);
  const [pictureName, setPictureName] = useState('');
  const [pictureError, setPictureError] = useState('');
  const [siteName, setSiteName] = useState('My site');
  const canvases = useRef({});
  const urlRef = useRef('');

  const glyph = glyphOf(text);
  const options = useMemo(() => ({ glyph, bg, fg, shape, picture }), [glyph, bg, fg, shape, picture]);
  const ratio = useMemo(() => {
    if (!isHex(bg) || !isHex(fg)) return null;
    return contrastRatio(hexToRgb(bg), hexToRgb(fg));
  }, [bg, fg]);

  useEffect(() => () => URL.revokeObjectURL(urlRef.current), []);

  // The icons are drawn in the browser: they depend on fonts and the canvas, so nothing is drawn on the server.
  useEffect(() => {
    const draws = () => {
      for (const { id, size } of SIZES) if (canvases.current[id]) draw(canvases.current[id], size, options);
      if (canvases.current.tab) draw(canvases.current.tab, 16, options);
    };
    draws();
    // Redraw once the page fonts are ready, so the letters use them.
    document.fonts?.ready?.then(draws);
  }, [options]);

  const loadPicture = useCallback(
    async (file) => {
      setPictureError('');
      if (!file) return;
      if (!ACCEPT.split(',').includes(file.type)) return setPictureError(page.errors.type);
      if (file.size > MAX_FILE) return setPictureError(page.errors.size);
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = url;
        // An SVG without a size has none; a square default keeps it drawable.
        if (!image.width) {
          image.width = 512;
          image.height = 512;
        }
        setPicture(image);
        setPictureName(file.name);
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        setPictureError(page.errors.read);
      };
      image.src = url;
    },
    [page],
  );

  const pngOf = (id) => toBlob(canvases.current[id]);

  const saveOne = async (item) => saveBlob(item.file, await pngOf(item.id));

  const icoBytes = async () => {
    const images = [];
    for (const id of ['ico16', 'ico32']) {
      const blob = await pngOf(id);
      images.push({ size: id === 'ico16' ? 16 : 32, data: new Uint8Array(await blob.arrayBuffer()) });
    }
    return buildIco(images);
  };

  const saveIco = async () => saveBlob('favicon.ico', new Blob([await icoBytes()], { type: 'image/x-icon' }));

  const saveAll = async () => {
    await saveIco();
    for (const item of SIZES) {
      await saveOne(item);
      // Browsers ask before a page saves many files; a short pause keeps them from dropping some.
      await new Promise((resolve) => window.setTimeout(resolve, 150));
    }
    saveText('site.webmanifest', `${manifestJson({ name: siteName, color: bg })}\n`, 'application/manifest+json');
  };

  const snippet = headWithColor(bg);
  const manifest = manifestJson({ name: siteName, color: bg });
  const lowContrast = !picture && ratio !== null && ratio < 3;

  const outlineButton = `${buttonClass} border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`;

  return (
    <ToolPageShell wide toolId="favicon">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-w-0 grid content-start gap-5">
          <ToolField id="fv-text" label={page.textLabel} hint={page.textHint}>
            {(props) => <input {...props} type="text" dir="auto" maxLength={12} value={text} onChange={(event) => setText(event.target.value)} className={inputClass} />}
          </ToolField>

          <SegmentedControl id="fv-shape" label={page.shapeLabel} fill options={SHAPES.map((key) => ({ value: key, label: page.shapes[key] }))} value={shape} onChange={setShape} />

          <div className="grid grid-cols-2 gap-4">
            {[
              ['fv-bg', page.background, bg, setBg],
              ['fv-fg', page.letters, fg, setFg],
            ].map(([id, label, value, set]) => (
              <ToolField key={id} id={id} label={label}>
                {(props) => (
                  <div className="flex items-center gap-2">
                    <input {...props} type="color" value={isHex(value) ? value : '#000000'} onChange={(event) => set(event.target.value)} className="h-11 w-14 cursor-pointer rounded-lg border-2 border-slate-200 bg-transparent p-0.5 dark:border-white/20" />
                    <span className="font-mono text-sm text-slate-600 dark:text-slate-300" dir="ltr">
                      {value}
                    </span>
                  </div>
                )}
              </ToolField>
            ))}
          </div>

          {lowContrast ? (
            <p role="status" data-testid="fv-contrast" className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
              <AlertTriangle size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
              {fill(page.lowContrast, { ratio: ratio.toFixed(1) })}
            </p>
          ) : null}

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">{page.pictureLabel}</p>
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="fv-picture" className={`${outlineButton} cursor-pointer`}>
                <ImagePlus size={18} aria-hidden="true" />
                {page.choosePicture}
              </label>
              <input id="fv-picture" type="file" accept={ACCEPT} className="sr-only" onChange={(event) => loadPicture(event.target.files?.[0])} />
              {picture ? (
                <button
                  type="button"
                  id="fv-remove-picture"
                  onClick={() => {
                    setPicture(null);
                    setPictureName('');
                  }}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  {page.removePicture}
                </button>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400" data-testid="fv-picture-name">
              {pictureName || page.pictureHint}
            </p>
            {pictureError ? (
              <p role="alert" className="mt-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                {pictureError}
              </p>
            ) : null}
          </div>

          <ToolField id="fv-name" label={page.siteName}>
            {(props) => <input {...props} type="text" dir="auto" maxLength={40} value={siteName} onChange={(event) => setSiteName(event.target.value)} className={inputClass} />}
          </ToolField>
        </div>

        <div className="min-w-0">
          <div className="rounded-2xl bg-slate-100 p-4 dark:bg-white/5" aria-hidden="true">
            <div className="flex items-center gap-2 rounded-t-xl bg-white px-3 py-2 shadow-sm dark:bg-slate-800" dir="ltr">
              <span key={`${glyph}|${bg}|${fg}|${shape}|${pictureName}`} className="fav-pop inline-flex">
                <canvas ref={(node) => { canvases.current.tab = node; }} width="16" height="16" className="size-4" />
              </span>
              <span className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">{siteName || page.siteName}</span>
            </div>
            <div className="h-6 rounded-b-xl bg-white/60 dark:bg-white/5" />
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{page.tabNote}</p>

          <ul dir="ltr" className="mt-5 grid grid-cols-5 items-end gap-3" data-testid="fv-sizes">
            {SIZES.map((item) => (
              <li key={item.id} className="grid justify-items-center gap-2">
                <canvas
                  ref={(node) => {
                    canvases.current[item.id] = node;
                  }}
                  width={item.size}
                  height={item.size}
                  data-testid={`fv-canvas-${item.size}`}
                  aria-label={fill(page.iconLabel, { size: item.size })}
                  role="img"
                  className="fav-icon max-w-full rounded-sm"
                  style={{ width: Math.min(item.size, 96), height: Math.min(item.size, 96), imageRendering: item.size < 64 ? 'pixelated' : 'auto' }}
                />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300" dir="ltr">
                  {item.size}px
                </span>
                <button type="button" id={`fv-save-${item.size}`} onClick={() => saveOne(item)} className="min-h-[2rem] px-2 text-xs font-bold text-slate-700 underline decoration-slate-400 underline-offset-2 hover:text-slate-950 dark:text-cyan dark:decoration-cyan/50" aria-label={fill(page.saveOne, { size: item.size })}>
                  PNG
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" id="fv-save-all" onClick={saveAll} className={`${buttonClass} bg-cyan text-slate-950`}>
              <Download size={18} aria-hidden="true" />
              {page.saveAll}
            </button>
            <button type="button" id="fv-save-ico" onClick={saveIco} className={outlineButton}>
              favicon.ico
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="fv-head-title" className="min-w-0">
          <h2 id="fv-head-title" className="type-h4 copy-primary dark:text-white">
            {page.head.title}
          </h2>
          <p className="mt-1 mb-3 text-sm text-slate-600 dark:text-slate-300">{page.head.text}</p>
          <CodeStream lines={snippet.split('\n')} streamKey="head" label={page.head.title} tokenize={tokenizeHtmlLine} />
          <div className="mt-3">
            <CopyButton id="fv-copy-head" text={snippet} label={page.copy} copiedLabel={common.copied} variant="outline" />
          </div>
        </section>
        <section aria-labelledby="fv-manifest-title" className="min-w-0">
          <h2 id="fv-manifest-title" className="type-h4 copy-primary dark:text-white">
            {page.manifest.title}
          </h2>
          <p className="mt-1 mb-3 text-sm text-slate-600 dark:text-slate-300">{page.manifest.text}</p>
          <CodeStream lines={manifest.split('\n')} streamKey="manifest" label={page.manifest.title} />
          <div className="mt-3">
            <CopyButton id="fv-copy-manifest" text={manifest} label={page.copy} copiedLabel={common.copied} variant="outline" />
          </div>
        </section>
      </div>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default FaviconPage;
