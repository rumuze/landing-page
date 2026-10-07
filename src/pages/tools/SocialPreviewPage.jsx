import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageDown, X } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import ShareCard from '../../components/tools/ShareCard';
import CodeStream from '../../components/tools/CodeStream';
import SegmentedControl from '../../components/ui/SegmentedControl';
import CopyButton from '../../components/ui/CopyButton';
import { buttonClass, fieldClass, inputClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import { DESCRIPTION_ADVICE, EXAMPLE, PLATFORMS, TITLE_ADVICE, buildMetaTags, domainOf, lengthStatus, tokenizeHtmlLine } from '../../tools/socialPreview';

const EMPTY = { title: '', description: '', url: '', imageUrl: '', siteName: '' };
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];

const StatusChip = ({ status, label, count }) => (
  <span
    className={`ms-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
      status === 'good' ? 'bg-cyan/15 text-slate-900 dark:text-white' : status === 'long' ? 'bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-200' : 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
    }`}
  >
    {count} · {label}
  </span>
);

const SocialPreviewPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].social;
  const common = toolsContent[lang].common;

  const [values, setValues] = useState(EMPTY);
  const [platform, setPlatform] = useState('whatsapp');
  const [image, setImage] = useState('');
  const imageRef = useRef('');

  // An example is filled in once the page is in the browser, so the first view shows a real card.
  useEffect(() => {
    setValues(EXAMPLE);
  }, []);

  useEffect(
    () => () => {
      if (imageRef.current) URL.revokeObjectURL(imageRef.current);
    },
    [],
  );

  const set = (name) => (event) => setValues((current) => ({ ...current, [name]: event.target.value }));

  const chooseImage = (file) => {
    if (!file || !ACCEPTED.includes(file.type)) return;
    if (imageRef.current) URL.revokeObjectURL(imageRef.current);
    imageRef.current = URL.createObjectURL(file);
    setImage(imageRef.current);
  };
  const removeImage = () => {
    if (imageRef.current) URL.revokeObjectURL(imageRef.current);
    imageRef.current = '';
    setImage('');
  };

  const domain = domainOf(values.url) || page.card.sampleDomain;
  const title = values.title.trim() || page.card.sampleTitle;
  const description = values.description.trim() || page.card.sampleDescription;
  const tags = useMemo(() => buildMetaTags(values), [values]);
  const lines = useMemo(() => (tags ? tags.split('\n') : ['<!-- ... -->']), [tags]);
  const titleStatus = lengthStatus(values.title, TITLE_ADVICE);
  const descriptionStatus = lengthStatus(values.description, DESCRIPTION_ADVICE);
  const time = lang === 'ar' ? '١٠:٣٠ ص' : '10:30';

  return (
    <ToolPageShell wide toolId="social">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid min-w-0 content-start gap-5">
          <ToolField
            id="sp-title"
            label={
              <>
                {page.fields.title}
                <StatusChip status={titleStatus} label={page.status[titleStatus]} count={[...values.title.trim()].length} />
              </>
            }
            hint={page.hints.title}
          >
            {(props) => <input {...props} type="text" dir="auto" value={values.title} onChange={set('title')} placeholder={page.placeholders.title} className={inputClass} />}
          </ToolField>

          <ToolField
            id="sp-description"
            label={
              <>
                {page.fields.description}
                <StatusChip status={descriptionStatus} label={page.status[descriptionStatus]} count={[...values.description.trim()].length} />
              </>
            }
            hint={page.hints.description}
          >
            {(props) => <textarea {...props} rows={3} dir="auto" value={values.description} onChange={set('description')} placeholder={page.placeholders.description} className={`${inputClass} resize-y`} />}
          </ToolField>

          <div className="grid gap-5 sm:grid-cols-2">
            <ToolField id="sp-url" label={page.fields.url}>
              {(props) => <input {...props} type="text" dir="ltr" autoComplete="off" value={values.url} onChange={set('url')} placeholder={page.placeholders.url} className={`${fieldClass(false)} text-left`} />}
            </ToolField>
            <ToolField id="sp-site" label={page.fields.siteName}>
              {(props) => <input {...props} type="text" dir="auto" value={values.siteName} onChange={set('siteName')} placeholder={page.placeholders.siteName} className={inputClass} />}
            </ToolField>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">{page.fields.image}</p>
            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="sp-image"
                className={`${buttonClass} cursor-pointer border-2 border-slate-200 text-slate-700 focus-within:outline focus-within:outline-2 focus-within:outline-cyan-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}
              >
                <ImageDown size={18} aria-hidden="true" />
                {page.chooseImage}
                <input
                  id="sp-image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={(event) => {
                    chooseImage(event.target.files[0]);
                    event.target.value = '';
                  }}
                />
              </label>
              {image ? (
                <button type="button" id="sp-remove-image" onClick={removeImage} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-red-600 dark:text-slate-300">
                  <X size={16} aria-hidden="true" />
                  {page.removeImage}
                </button>
              ) : null}
            </div>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-gray-400">{page.hints.image}</p>
          </div>

          <ToolField id="sp-image-url" label={page.fields.imageUrl} hint={page.hints.imageUrl}>
            {(props) => <input {...props} type="text" dir="ltr" autoComplete="off" value={values.imageUrl} onChange={set('imageUrl')} placeholder={page.placeholders.imageUrl} className={`${fieldClass(false)} text-left`} />}
          </ToolField>
        </div>

        <div className="min-w-0">
          <SegmentedControl
            id="sp-platform"
            label={page.platformLabel}
            fill
            options={PLATFORMS.map((value) => ({ value, label: page.platforms[value] }))}
            value={platform}
            onChange={setPlatform}
          />

          <div className="mt-5" data-testid="sp-card">
            <ShareCard key={platform} platform={platform} title={title} description={description} domain={domain} image={image} noImage={page.card.noImage} time={time} />
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{page.approximate}</p>

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">{page.tagsLabel}</p>
            <CodeStream lines={lines} streamKey="tags" label={page.tagsLabel} tokenize={tokenizeHtmlLine} />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{page.tagsHint}</p>
            <div className="mt-3">
              <CopyButton id="sp-copy" text={tags} disabled={!tags} label={page.copyTags} copiedLabel={common.copied} />
            </div>
          </div>
        </div>
      </div>
    </ToolPageShell>
  );
};

export default SocialPreviewPage;
