import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExternalLink, QrCode } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import Select from '../../components/ui/Select';
import CopyButton from '../../components/ui/CopyButton';
import { buttonClass, fieldClass, inputClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import { COUNTRIES, buildWhatsAppLink } from '../../tools/whatsapp';

const WhatsAppLinkPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const prefix = isAr ? '' : '/en';
  const page = toolsContent[lang].whatsapp;
  const common = toolsContent[lang].common;

  const [countryId, setCountryId] = useState('SA');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  const country = COUNTRIES.find((item) => item.id === countryId) ?? COUNTRIES[0];
  const result = useMemo(
    () => buildWhatsAppLink({ dial: country.dial, number, message }),
    [country.dial, number, message],
  );
  const countryOptions = useMemo(
    () =>
      COUNTRIES.map((item) => ({
        value: item.id,
        label: item[lang],
        meta: `+${item.dial}`,
        keywords: `${item.en} ${item.ar} ${item.id}`,
      })),
    [lang],
  );
  const numberError = !result.ok && result.error !== 'empty' ? page.errors[result.error] : '';

  return (
    <ToolPageShell toolId="whatsapp">
      <div className="grid gap-5 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
        <ToolField id="wa-country" label={page.country}>
          {(props) => (
            <Select
              {...props}
              value={countryId}
              onChange={setCountryId}
              options={countryOptions}
              searchable
              searchPlaceholder={common.search}
              noResults={common.noResults}
            />
          )}
        </ToolField>

        <ToolField id="wa-number" label={page.number} hint={page.numberHint} error={numberError}>
          {(props) => (
            <input
              {...props}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              dir="ltr"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              placeholder="055 123 4567"
              className={`${fieldClass(Boolean(numberError))} text-left`}
            />
          )}
        </ToolField>
      </div>

      <ToolField id="wa-message" label={page.message} hint={page.messageHint} className="mt-5">
        {(props) => (
          <textarea
            {...props}
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={page.messagePlaceholder}
            className={`${inputClass} resize-y`}
          />
        )}
      </ToolField>

      <div className="mt-8 border-t border-[rgb(var(--border-subtle)/0.7)] pt-6">
        <label htmlFor="wa-result" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-gray-300">
          {page.result}
        </label>
        <textarea
          id="wa-result"
          readOnly
          dir="ltr"
          rows={2}
          value={result.ok ? result.url : ''}
          placeholder="https://wa.me/…"
          onFocus={(event) => event.target.select()}
          className={`${inputClass} resize-y text-left font-mono text-sm`}
        />

        <p className="mt-2 min-h-[1.5rem] text-sm text-slate-600 dark:text-gray-400" role="status">
          {result.ok ? (
            <>
              {page.opensChat} <bdi dir="ltr" className="font-semibold">{result.display}</bdi>
            </>
          ) : null}
        </p>
        {result.ok && result.longUrl ? (
          <p className="mt-1 text-sm font-medium text-amber-700 dark:text-amber-400">{page.longUrl}</p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-3">
          <CopyButton id="wa-copy" text={result.ok ? result.url : ''} disabled={!result.ok} label={common.copy} copiedLabel={common.copied} />
          {result.ok ? (
            <>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass} border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}
              >
                <ExternalLink size={18} aria-hidden="true" />
                {page.test}
              </a>
              <Link
                to={`${prefix}/qr-generator?url=${encodeURIComponent(result.url)}`}
                className={`${buttonClass} border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}
              >
                <QrCode size={18} aria-hidden="true" />
                {page.makeQr}
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </ToolPageShell>
  );
};

export default WhatsAppLinkPage;
