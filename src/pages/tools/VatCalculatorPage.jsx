import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import Receipt from '../../components/tools/Receipt';
import Select from '../../components/ui/Select';
import SegmentedControl from '../../components/ui/SegmentedControl';
import CopyButton from '../../components/ui/CopyButton';
import { fieldClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import { VAT_COUNTRIES, calcVat, formatMinor, parseAmount, parseRate, vatShare } from '../../tools/vat';

const EXAMPLE_AMOUNT = '1000';

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);

const VatCalculatorPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const page = toolsContent[lang].vat;
  const common = toolsContent[lang].common;

  const [countryId, setCountryId] = useState('SA');
  const [customRate, setCustomRate] = useState('');
  const [mode, setMode] = useState('add');
  const [amount, setAmount] = useState('');
  const [shown, setShown] = useState(null);

  // The page is rendered ahead of time, so the example amount is filled in once it is in the browser,
  // and the receipt prints with real numbers straight away.
  useEffect(() => {
    setAmount(EXAMPLE_AMOUNT);
  }, []);

  const country = VAT_COUNTRIES.find((item) => item.id === countryId);
  const rate = countryId === 'custom' ? parseRate(customRate) : country.rate;
  const minor = parseAmount(amount);

  const result = useMemo(
    () => (minor !== null && rate !== null ? { rate, mode, ...calcVat(minor, rate, mode) } : null),
    [minor, rate, mode],
  );
  if (result && result !== shown) setShown(result);

  const options = useMemo(
    () => [
      ...VAT_COUNTRIES.map((item) => ({
        value: item.id,
        label: item[lang],
        meta: `${item.rate}%`,
        keywords: `${item.en} ${item.ar} ${item.id}`,
      })),
      { value: 'custom', label: page.countries.custom },
    ],
    [lang, page.countries.custom],
  );

  const amountError = amount.trim() !== '' && minor === null ? page.errors.amount : '';
  const rateError = countryId === 'custom' && customRate.trim() !== '' && rate === null ? page.errors.rate : '';

  const rows = shown
    ? [
        { id: 'net', label: page.receipt.net, value: formatMinor(shown.net) },
        { id: 'vat', label: fill(page.receipt.vat, { rate: shown.rate }), value: formatMinor(shown.vat) },
        { id: 'gross', label: page.receipt.gross, value: formatMinor(shown.gross), strong: true },
      ]
    : [];
  const share = shown ? vatShare(shown) : 0;
  const summary = shown
    ? fill(page.summary, { net: formatMinor(shown.net), vat: formatMinor(shown.vat), rate: shown.rate, gross: formatMinor(shown.gross) })
    : '';

  return (
    <ToolPageShell wide toolId="vat">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
        <div className="grid min-w-0 content-start gap-5">
          <ToolField id="vat-country" label={page.country}>
            {(props) => (
              <Select
                {...props}
                value={countryId}
                onChange={setCountryId}
                options={options}
                searchable
                searchPlaceholder={common.search}
                noResults={common.noResults}
              />
            )}
          </ToolField>

          {countryId === 'custom' ? (
            <ToolField id="vat-rate" label={page.customRate} error={rateError}>
              {(props) => (
                <input
                  {...props}
                  type="text"
                  inputMode="decimal"
                  dir="ltr"
                  autoComplete="off"
                  value={customRate}
                  onChange={(event) => setCustomRate(event.target.value)}
                  placeholder="15"
                  className={`${fieldClass(Boolean(rateError))} text-left`}
                />
              )}
            </ToolField>
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {page.rateLabel}: <strong id="vat-rate-shown">{country.rate}%</strong>
            </p>
          )}

          <SegmentedControl
            id="vat-mode"
            label={page.modeLabel}
            fill
            options={[
              { value: 'add', label: page.modes.add },
              { value: 'remove', label: page.modes.remove },
            ]}
            value={mode}
            onChange={setMode}
          />

          <ToolField id="vat-amount" label={page.amount[mode]} hint={page.amountHint} error={amountError}>
            {(props) => (
              <input
                {...props}
                type="text"
                inputMode="decimal"
                dir="ltr"
                autoComplete="off"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="1000"
                className={`${fieldClass(Boolean(amountError))} text-left text-lg font-semibold`}
              />
            )}
          </ToolField>

          <div>
            <CopyButton id="vat-copy" text={summary} disabled={!result} label={page.copySummary} copiedLabel={common.copied} />
          </div>
        </div>

        <div className={`min-w-0 transition-opacity duration-300 ${shown && !result ? 'opacity-50' : ''}`} aria-live="polite">
          <Receipt
            title={page.receipt.title}
            rows={rows}
            share={share}
            shareLabel={fill(page.receipt.share, { share: Math.round(share * 1000) / 10 })}
            empty={page.receipt.empty}
            printKey={`${countryId}-${mode}`}
            active={Boolean(shown)}
            isAr={isAr}
          />
        </div>
      </div>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default VatCalculatorPage;
