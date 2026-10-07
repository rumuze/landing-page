import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, ImageDown, Trash2, X } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import CompareSlider from '../../components/tools/CompareSlider';
import Odometer from '../../components/tools/Odometer';
import Select from '../../components/ui/Select';
import SegmentedControl from '../../components/ui/SegmentedControl';
import { buttonClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import {
  MAX_FILES,
  MAX_WIDTHS,
  OUTPUT_TYPES,
  compressImage,
  formatBytes,
  outputName,
  savedPercent,
  validateFile,
} from '../../tools/imageCompress';

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);
const DEBOUNCE_MS = 200;

let nextId = 1;

const ImageCompressorPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].imagecompress;
  const isAr = lang === 'ar';

  const [format, setFormat] = useState('webp');
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState('0');
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [problems, setProblems] = useState([]);
  const [over, setOver] = useState(false);

  const itemsRef = useRef([]);
  const urls = useRef(new Set());
  const run = useRef(0);

  const track = (url) => {
    urls.current.add(url);
    return url;
  };
  const release = (url) => {
    if (url && urls.current.delete(url)) URL.revokeObjectURL(url);
  };

  useEffect(() => {
    itemsRef.current = items;
  });

  useEffect(() => {
    const held = urls.current;
    return () => {
      held.forEach((url) => URL.revokeObjectURL(url));
      held.clear();
    };
  }, []);

  const addFiles = (list) => {
    const files = [...list];
    if (!files.length) return;
    const found = [];
    const accepted = [];
    const room = MAX_FILES - itemsRef.current.length;
    for (const file of files) {
      const problem = validateFile(file);
      if (problem) found.push({ key: problem, name: file.name });
      else if (accepted.length < room) accepted.push(file);
      else if (!found.some((entry) => entry.key === 'tooMany')) found.push({ key: 'tooMany', name: '' });
    }
    setProblems(found);
    if (!accepted.length) return;
    const added = accepted.map((file) => ({ id: nextId++, file, originalUrl: track(URL.createObjectURL(file)), status: 'working', result: null }));
    setItems((current) => [...current, ...added]);
    setSelectedId((current) => current ?? added[0].id);
  };

  // Pasting an image anywhere on the page adds it.
  useEffect(() => {
    const onPaste = (event) => {
      const files = [...(event.clipboardData?.files ?? [])];
      if (files.length) addFiles(files);
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
    // addFiles only reads refs and sets state, so the listener is made once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compress again whenever the images or the settings change. A newer run cancels an older one.
  const idsKey = items.map((item) => item.id).join(',');
  useEffect(() => {
    if (!itemsRef.current.length) return undefined;
    const token = ++run.current;
    const mime = OUTPUT_TYPES.find((type) => type.id === format).mime;
    const timer = window.setTimeout(async () => {
      setItems((current) => current.map((item) => ({ ...item, status: 'working' })));
      for (const item of itemsRef.current) {
        if (run.current !== token) return;
        try {
          const result = await compressImage(item.file, { mime, quality: quality / 100, maxWidth: Number(maxWidth) });
          if (run.current !== token) return;
          const url = track(URL.createObjectURL(result.blob));
          setItems((current) =>
            current.map((entry) => {
              if (entry.id !== item.id) return entry;
              release(entry.result?.url);
              return { ...entry, status: 'done', result: { ...result, url } };
            }),
          );
        } catch (error) {
          if (run.current !== token) return;
          setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, status: 'error', error: error.message } : entry)));
        }
      }
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
    // The list itself is read through the ref; the ids stand for it here.
  }, [idsKey, format, quality, maxWidth]);

  const remove = (id) => {
    const item = items.find((entry) => entry.id === id);
    release(item?.originalUrl);
    release(item?.result?.url);
    setItems((current) => current.filter((entry) => entry.id !== id));
    setSelectedId((current) => (current === id ? (items.find((entry) => entry.id !== id)?.id ?? null) : current));
  };

  const clear = () => {
    run.current += 1;
    urls.current.forEach((url) => URL.revokeObjectURL(url));
    urls.current.clear();
    setItems([]);
    setSelectedId(null);
    setProblems([]);
  };

  const ext = OUTPUT_TYPES.find((type) => type.id === format).ext;
  const widthOptions = useMemo(
    () =>
      MAX_WIDTHS.map((width) => ({
        value: String(width),
        label: width === 0 ? page.settings.widths.original : fill(page.settings.widths.limit, { n: width }),
      })),
    [page.settings.widths],
  );

  const finalOf = (item) => (item.result && item.result.blob.size < item.file.size ? item.result : null);
  const done = items.filter((item) => item.status === 'done');
  const totalBefore = done.reduce((sum, item) => sum + item.file.size, 0);
  const totalAfter = done.reduce((sum, item) => sum + (finalOf(item)?.blob.size ?? item.file.size), 0);
  const selected = items.find((item) => item.id === selectedId && item.result) ?? items.find((item) => item.result);

  const problemText = (problem) => fill(page.errors[problem.key], { name: problem.name });
  const itemProblems = items.filter((item) => item.status === 'error').map((item) => ({ key: item.error, name: item.file.name }));

  return (
    <ToolPageShell wide toolId="imagecompress">
      <label
        htmlFor="ic-input"
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          addFiles(event.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center gap-3 rounded-3xl border-2 border-dashed px-6 py-10 text-center transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-cyan-700 ${
          over ? 'dropzone-active border-cyan bg-cyan/10' : 'border-slate-300 hover:border-cyan dark:border-white/20'
        }`}
        data-testid="dropzone"
      >
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan/15 text-cyan-800 dark:text-cyan">
          <ImageDown size={28} aria-hidden="true" />
        </span>
        <span className="type-h4 copy-primary dark:text-white">{page.drop.title}</span>
        <span className="max-w-md text-sm text-slate-600 dark:text-slate-300">{page.drop.hint}</span>
        <span className={`${buttonClass} bg-cyan text-slate-950`}>{page.drop.choose}</span>
        <input
          id="ic-input"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="sr-only"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = '';
          }}
        />
      </label>

      {problems.length || itemProblems.length ? (
        <ul role="alert" className="mt-4 grid gap-1 text-sm font-medium text-red-600 dark:text-red-400">
          {[...problems, ...itemProblems].map((problem, index) => (
            <li key={`${problem.key}-${problem.name}-${index}`}>{problemText(problem)}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div>
          <p id="ic-format-label" className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">
            {page.settings.format}
          </p>
          <SegmentedControl
            id="ic-format"
            label={page.settings.format}
            fill
            options={OUTPUT_TYPES.map((type) => ({ value: type.id, label: page.settings.formats[type.id] }))}
            value={format}
            onChange={setFormat}
          />
        </div>

        <ToolField id="ic-quality" label={`${page.settings.quality}: ${quality}`} hint={page.settings.qualityHint}>
          {(props) => (
            <input
              {...props}
              type="range"
              min="40"
              max="95"
              step="1"
              value={quality}
              onChange={(event) => setQuality(Number(event.target.value))}
              className="h-11 w-full cursor-pointer accent-[#2FAD00]"
            />
          )}
        </ToolField>

        <ToolField id="ic-width" label={page.settings.maxWidth}>
          {(props) => <Select {...props} value={maxWidth} onChange={setMaxWidth} options={widthOptions} />}
        </ToolField>
      </div>

      {items.length ? (
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p id="ic-totals" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {done.length === items.length
                ? page.totals.split(/(\{before\}|\{after\})/).map((part, index) =>
                    part === '{before}' || part === '{after}' ? (
                      <bdi key={index} dir="ltr">
                        {formatBytes(part === '{before}' ? totalBefore : totalAfter)}
                      </bdi>
                    ) : (
                      part
                    ),
                  )
                : page.item.working}
            </p>
            <button type="button" id="ic-clear" onClick={clear} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 dark:text-slate-300">
              <Trash2 size={16} aria-hidden="true" />
              {page.clear}
            </button>
          </div>

          <ul className="mt-4 grid gap-3" aria-label={page.compare.label}>
            {items.map((item) => {
              const final = finalOf(item);
              const afterSize = final ? final.blob.size : item.file.size;
              const percent = savedPercent(item.file.size, afterSize);
              const isSelected = selected?.id === item.id;
              return (
                <li
                  key={item.id}
                  data-testid="ic-item"
                  data-status={item.status}
                  className={`item-in grid gap-3 rounded-2xl border-2 p-3 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:items-center ${
                    isSelected ? 'border-cyan' : 'border-[rgb(var(--border-subtle)/0.8)]'
                  }`}
                >
                  <img src={item.originalUrl} alt="" className="h-16 w-16 rounded-xl bg-slate-200 object-cover dark:bg-white/10" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white" dir="auto">
                      {item.file.name}
                    </p>
                    {item.result ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {fill(page.item.dimensions, { w: item.result.width, h: item.result.height })}
                      </p>
                    ) : null}

                    {item.status === 'working' && !item.result ? (
                      <span className="brief-bar mt-2 block w-2/3" />
                    ) : (
                      <div className="mt-2 grid gap-1.5" dir="ltr">
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <span className="w-12 shrink-0">{page.item.before}</span>
                          <span className="h-2 flex-1 rounded-full bg-slate-400/70" />
                          <span className="w-16 shrink-0 text-right tabular-nums" data-testid="ic-before">
                            {formatBytes(item.file.size)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <span className="w-12 shrink-0">{page.item.after}</span>
                          <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                            <span className="size-bar block h-full rounded-full bg-cyan" style={{ width: `${(afterSize / item.file.size) * 100}%` }} />
                          </span>
                          <span className="w-16 shrink-0 text-right font-semibold tabular-nums" data-testid="ic-after">
                            {formatBytes(afterSize)}
                          </span>
                        </div>
                      </div>
                    )}

                    {item.result && !final ? <p className="mt-1 text-xs font-medium text-amber-700 dark:text-amber-400">{page.item.kept}</p> : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    {item.result && final ? (
                      <span className="rounded-full bg-cyan/15 px-3 py-1 text-sm font-bold text-slate-900 dark:text-white" data-testid="ic-saved" dir={isAr ? 'rtl' : 'ltr'}>
                        {page.item.saved.split('{n}').map((part, index, all) => (
                          <React.Fragment key={index}>
                            {part}
                            {index < all.length - 1 ? <Odometer value={percent} /> : null}
                          </React.Fragment>
                        ))}
                      </span>
                    ) : null}
                    {item.result ? (
                      <>
                        <button
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setSelectedId(item.id)}
                          className="min-h-[2.25rem] rounded-lg border-2 border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:border-cyan dark:border-white/10 dark:text-slate-200"
                        >
                          {page.item.show}
                        </button>
                        <a
                          href={final ? final.url : item.originalUrl}
                          download={final ? outputName(item.file.name, ext) : item.file.name}
                          className="inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-lg bg-cyan px-3 text-sm font-semibold text-slate-950"
                        >
                          <Download size={15} aria-hidden="true" />
                          {page.item.download}
                        </a>
                      </>
                    ) : null}
                    <button
                      type="button"
                      aria-label={`${page.item.remove}: ${item.file.name}`}
                      onClick={() => remove(item.id)}
                      className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:text-red-600"
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {selected?.result ? (
            <div className="mt-8">
              <CompareSlider
                original={selected.originalUrl}
                compressed={selected.result.url}
                width={selected.result.originalWidth}
                height={selected.result.originalHeight}
                labels={{ ...page.compare, slider: page.compare.label }}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default ImageCompressorPage;
