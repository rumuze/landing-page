import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Printer, Trash2 } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import InvoicePaper from '../../components/tools/InvoicePaper';
import Select from '../../components/ui/Select';
import SegmentedControl from '../../components/ui/SegmentedControl';
import CopyButton from '../../components/ui/CopyButton';
import { buttonClass, fieldClass, inputClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import { GREGORIAN_MONTHS } from '../../tools/hijri';
import { isIsoDate } from '../../tools/schema';
import { MAX_ITEMS, PAYMENT_TERMS, RATE_CHOICES, calcInvoice, dueDate, invoiceToText, nextInvoiceNumber, parseQuantity, parseUnitPrice } from '../../tools/invoice';
import { formatMinor } from '../../tools/vat';

let nextId = 1;
const newItem = (values = {}) => ({ id: nextId++, description: '', quantity: '1', price: '', rate: 15, ...values });

const EMPTY_PARTY = { name: '', address: '', taxId: '', email: '' };
const EMPTY_META = { number: 'INV-0001', issueDate: '', terms: '14', currency: 'SAR', notes: '', status: 'draft' };

const EXAMPLE = {
  seller: { name: 'Example Studio', address: '12 King Fahd Road\nRiyadh', taxId: '300000000000003', email: 'billing@example.com' },
  buyer: { name: 'Client Trading Co.', address: '8 Olaya Street\nRiyadh', taxId: '', email: '' },
  items: [
    { description: 'Website design', quantity: '1', price: '4500', rate: 15 },
    { description: 'Monthly hosting', quantity: '12', price: '85', rate: 15 },
    { description: 'Training session', quantity: '2', price: '300', rate: 0 },
  ],
};

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);

const todayIso = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const InvoicePage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const isAr = lang === 'ar';
  const page = toolsContent[lang].invoice;
  const common = toolsContent[lang].common;

  const [seller, setSeller] = useState(EMPTY_PARTY);
  const [buyer, setBuyer] = useState(EMPTY_PARTY);
  const [meta, setMeta] = useState(EMPTY_META);
  const [items, setItems] = useState(() => [newItem()]);

  // An example invoice dated today is put in once the page is in the browser (the page is built ahead
  // of time, so "today" is not known before), and the first view is a working invoice.
  useEffect(() => {
    setSeller(EXAMPLE.seller);
    setBuyer(EXAMPLE.buyer);
    setMeta((current) => ({ ...current, issueDate: todayIso() }));
    setItems(EXAMPLE.items.map((item) => newItem(item)));
  }, []);

  const setParty = (setter, key) => (event) => setter((current) => ({ ...current, [key]: event.target.value }));
  const setMetaField = (key) => (event) => setMeta((current) => ({ ...current, [key]: event.target.value }));
  const setItem = (id, key) => (event) => setItems((current) => current.map((item) => (item.id === id ? { ...item, [key]: event.target.value } : item)));

  const priced = useMemo(
    () => items.map((item) => ({ id: item.id, description: item.description, quantityMilli: parseQuantity(item.quantity), unitMinor: parseUnitPrice(item.price), rate: item.rate })),
    [items],
  );
  const calc = useMemo(() => calcInvoice(priced), [priced]);

  const dateOk = isIsoDate(meta.issueDate);
  const due = dateOk ? dueDate(meta.issueDate, Number(meta.terms)) : '';
  const formatDate = (iso) => {
    if (!isIsoDate(iso)) return '';
    const [year, month, day] = iso.split('-').map(Number);
    return `${day} ${GREGORIAN_MONTHS[lang][month - 1]} ${year}`;
  };
  const data = { seller, buyer, calc, currency: meta.currency.trim(), number: meta.number.trim(), issuedDisplay: formatDate(meta.issueDate), dueDisplay: meta.terms === '0' ? '' : formatDate(due), notes: meta.notes.trim(), status: meta.status };

  const text = useMemo(
    () => invoiceToText({ number: data.number, seller, buyer, issueDate: meta.issueDate, due, currency: data.currency, calc }, { ...page.paper, from: page.paper.from }, formatMinor),
    // The pieces named here are everything the text is made from.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [calc, seller, buyer, meta, due, page],
  );

  const print = () => {
    // The PDF takes its file name from the page title.
    const previous = document.title;
    document.title = `${page.paper.invoice} ${data.number}`.trim();
    const restore = () => {
      document.title = previous;
      window.removeEventListener('afterprint', restore);
    };
    window.addEventListener('afterprint', restore);
    window.print();
  };

  const rateOptions = RATE_CHOICES.map((rate) => ({ value: String(rate), label: `${rate}%` }));
  const termOptions = PAYMENT_TERMS.map((days) => ({ value: String(days), label: page.terms[days] }));

  const partyFields = (title, party, setter, prefix, withEmail) => (
    <fieldset className="grid gap-3 rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] p-4">
      <legend className="px-2 text-sm font-bold text-slate-700 dark:text-slate-200">{title}</legend>
      <ToolField id={`iv-${prefix}-name`} label={page.fields[`${prefix}Name`]}>
        {(props) => <input {...props} type="text" dir="auto" value={party.name} onChange={setParty(setter, 'name')} className={inputClass} />}
      </ToolField>
      <ToolField id={`iv-${prefix}-address`} label={page.fields[`${prefix}Address`]}>
        {(props) => <textarea {...props} rows={2} dir="auto" value={party.address} onChange={setParty(setter, 'address')} className={`${inputClass} resize-y`} />}
      </ToolField>
      <div className={withEmail ? 'grid gap-3 sm:grid-cols-2' : ''}>
        <ToolField id={`iv-${prefix}-tax`} label={page.fields[`${prefix}TaxId`]}>
          {(props) => <input {...props} type="text" dir="ltr" value={party.taxId} onChange={setParty(setter, 'taxId')} className={`${fieldClass(false)} text-left`} />}
        </ToolField>
        {withEmail ? (
          <ToolField id={`iv-${prefix}-email`} label={page.fields.sellerEmail}>
            {(props) => <input {...props} type="text" dir="ltr" value={party.email} onChange={setParty(setter, 'email')} className={`${fieldClass(false)} text-left`} />}
          </ToolField>
        ) : null}
      </div>
    </fieldset>
  );

  return (
    <ToolPageShell wide toolId="invoice">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="grid min-w-0 content-start gap-5">
          {partyFields(page.sections.seller, seller, setSeller, 'seller', true)}
          {partyFields(page.sections.buyer, buyer, setBuyer, 'buyer', false)}

          <fieldset className="grid gap-4 rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] p-4">
            <legend className="px-2 text-sm font-bold text-slate-700 dark:text-slate-200">{page.sections.details}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <ToolField id="iv-number" label={page.fields.number}>
                {(props) => <input {...props} type="text" dir="ltr" value={meta.number} onChange={setMetaField('number')} className={`${fieldClass(false)} text-left`} />}
              </ToolField>
              <ToolField id="iv-date" label={page.fields.issueDate} hint={page.hints.issueDate} error={meta.issueDate && !dateOk ? page.errors.date : ''}>
                {(props) => <input {...props} type="text" inputMode="numeric" dir="ltr" value={meta.issueDate} onChange={setMetaField('issueDate')} placeholder="2026-01-15" className={`${fieldClass(Boolean(meta.issueDate && !dateOk))} text-left`} />}
              </ToolField>
              <ToolField id="iv-terms" label={page.fields.terms}>
                {(props) => <Select {...props} value={meta.terms} onChange={(value) => setMeta((current) => ({ ...current, terms: value }))} options={termOptions} />}
              </ToolField>
              <ToolField id="iv-currency" label={page.fields.currency} hint={page.hints.currency}>
                {(props) => <input {...props} type="text" dir="ltr" maxLength={6} value={meta.currency} onChange={setMetaField('currency')} className={`${fieldClass(false)} text-left uppercase`} />}
              </ToolField>
            </div>
            <ToolField id="iv-notes" label={page.fields.notes}>
              {(props) => <textarea {...props} rows={2} dir="auto" value={meta.notes} onChange={setMetaField('notes')} className={`${inputClass} resize-y`} />}
            </ToolField>
            <SegmentedControl
              id="iv-status"
              label={page.status.label}
              fill
              options={[
                { value: 'draft', label: page.status.draft },
                { value: 'paid', label: page.status.paid },
              ]}
              value={meta.status}
              onChange={(value) => setMeta((current) => ({ ...current, status: value }))}
            />
            <div>
              <button type="button" id="iv-next" onClick={() => setMeta((current) => ({ ...current, number: nextInvoiceNumber(current.number) }))} className="text-sm font-semibold text-cyan-800 hover:underline dark:text-cyan">
                {page.nextNumber}
              </button>
            </div>
          </fieldset>

          <fieldset className="grid gap-3 rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] p-4">
            <legend className="px-2 text-sm font-bold text-slate-700 dark:text-slate-200">{page.sections.items}</legend>
            {items.map((item, index) => {
              const quantityBad = item.quantity.trim() !== '' && parseQuantity(item.quantity) === null;
              const priceBad = item.price.trim() !== '' && parseUnitPrice(item.price) === null;
              const n = index + 1;
              return (
                <div key={item.id} className="item-in grid gap-2 rounded-xl bg-slate-50 p-3 dark:bg-white/5 sm:grid-cols-[minmax(0,1fr)_5rem_7rem_6rem_auto] sm:items-end" data-testid="iv-row">
                  <ToolField id={`iv-desc-${item.id}`} label={`${page.item.description} (${fill(page.item.line, { n })})`}>
                    {(props) => <input {...props} type="text" dir="auto" value={item.description} onChange={setItem(item.id, 'description')} className={inputClass} />}
                  </ToolField>
                  <ToolField id={`iv-qty-${item.id}`} label={page.item.quantity} error={quantityBad ? page.errors.quantity : ''}>
                    {(props) => <input {...props} type="text" inputMode="decimal" dir="ltr" value={item.quantity} onChange={setItem(item.id, 'quantity')} className={`${fieldClass(quantityBad)} text-left`} />}
                  </ToolField>
                  <ToolField id={`iv-price-${item.id}`} label={page.item.price} error={priceBad ? page.errors.price : ''}>
                    {(props) => <input {...props} type="text" inputMode="decimal" dir="ltr" value={item.price} onChange={setItem(item.id, 'price')} className={`${fieldClass(priceBad)} text-left`} />}
                  </ToolField>
                  <ToolField id={`iv-rate-${item.id}`} label={page.item.rate}>
                    {(props) => (
                      <Select
                        {...props}
                        value={String(item.rate)}
                        onChange={(value) => setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, rate: Number(value) } : entry)))}
                        options={rateOptions}
                      />
                    )}
                  </ToolField>
                  <button
                    type="button"
                    aria-label={fill(page.item.remove, { n })}
                    disabled={items.length === 1}
                    onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}
                    className="grid h-11 w-11 place-items-center rounded-xl text-slate-500 hover:text-red-600 disabled:opacity-30"
                  >
                    <Trash2 size={17} aria-hidden="true" />
                  </button>
                </div>
              );
            })}
            {items.length < MAX_ITEMS ? (
              <button
                type="button"
                id="iv-add"
                onClick={() => setItems((current) => [...current, newItem()])}
                className={`${buttonClass} justify-self-start border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}
              >
                <Plus size={18} aria-hidden="true" />
                {page.item.add}
              </button>
            ) : null}
          </fieldset>

          <div>
            <button
              type="button"
              id="iv-clear"
              onClick={() => {
                setSeller(EMPTY_PARTY);
                setBuyer(EMPTY_PARTY);
                setMeta((current) => ({ ...EMPTY_META, issueDate: current.issueDate }));
                setItems([newItem()]);
              }}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              {page.clear}
            </button>
          </div>
        </div>

        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <InvoicePaper data={data} labels={page.paper} isAr={isAr} />
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" id="iv-print" onClick={print} disabled={!calc.lines.length} className={`${buttonClass} bg-cyan text-slate-950 disabled:cursor-not-allowed disabled:opacity-50`}>
              <Printer size={18} aria-hidden="true" />
              {page.print}
            </button>
            <CopyButton id="iv-copy" text={text} disabled={!calc.lines.length} variant="outline" label={page.copyText} copiedLabel={common.copied} />
          </div>
        </div>
      </div>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default InvoicePage;
