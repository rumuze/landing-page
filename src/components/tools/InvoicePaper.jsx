import React from 'react';
import Odometer from './Odometer';
import { formatMinor } from '../../tools/vat';

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);

const Party = ({ title, party, taxLabel }) => (
  <div className="min-w-0">
    <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-500">{title}</p>
    <p className="mt-1 font-bold" dir="auto">
      {party.name || '–'}
    </p>
    {party.address ? (
      <p className="whitespace-pre-line text-slate-600" dir="auto">
        {party.address}
      </p>
    ) : null}
    {party.email ? <p className="text-slate-600">{party.email}</p> : null}
    {party.taxId ? (
      <p className="text-slate-600">
        {taxLabel}: <span dir="ltr">{party.taxId}</span>
      </p>
    ) : null}
  </div>
);

/**
 * The invoice as a sheet of paper. It is always drawn on white with dark text, so it prints the same
 * from the light and the dark theme; `invoice-print` is the part the print stylesheet keeps. Lines
 * slide in as they are added, the totals roll, and a PAID stamp lands when the status is paid.
 */
const InvoicePaper = ({ data, labels, isAr }) => {
  const { calc, currency, number, dueDisplay, issuedDisplay, notes, status } = data;
  const money = (minor) => formatMinor(minor);
  const hasLines = calc.lines.length > 0;

  return (
    <article className="invoice-print invoice-paper relative rounded-xl p-6 text-sm sm:p-8" dir={isAr ? 'rtl' : 'ltr'} data-testid="invoice-paper">
      {status === 'paid' ? (
        <span className="brief-stamp absolute end-6 top-20 rounded-lg border-[4px] border-emerald-600 px-4 py-1 text-xl font-black tracking-widest text-emerald-700 opacity-80" data-testid="invoice-stamp">
          {labels.stamp}
        </span>
      ) : null}

      <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-slate-900 pb-4">
        <div>
          <p className="text-3xl font-black uppercase tracking-wide">{labels.invoice}</p>
          <p className="mt-1 font-mono text-slate-600" dir="ltr">
            {number || '–'}
          </p>
        </div>
        <dl className="grid gap-1 text-end">
          <div className="flex justify-end gap-2">
            <dt className="text-slate-500">{labels.issued}</dt>
            <dd className="font-semibold" dir="auto">
              {issuedDisplay || '–'}
            </dd>
          </div>
          {dueDisplay ? (
            <div className="flex justify-end gap-2">
              <dt className="text-slate-500">{labels.due}</dt>
              <dd className="font-semibold" dir="auto">
                {dueDisplay}
              </dd>
            </div>
          ) : null}
        </dl>
      </header>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <Party title={labels.from} party={data.seller} taxLabel={labels.taxNumber} />
        <Party title={labels.to} party={data.buyer} taxLabel={labels.taxNumber} />
      </div>

      {hasLines ? (
        <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label={labels.invoice}>
          <table className="w-full min-w-[28rem] text-sm">
            <thead>
              <tr className="border-b border-slate-300 text-xs uppercase tracking-wide text-slate-500">
                <th scope="col" className="py-2 text-start font-semibold">{labels.description}</th>
                <th scope="col" className="py-2 text-end font-semibold">{labels.quantity}</th>
                <th scope="col" className="py-2 text-end font-semibold">{labels.unitPrice}</th>
                <th scope="col" className="py-2 text-end font-semibold">{labels.vat}</th>
                <th scope="col" className="py-2 text-end font-semibold">{labels.amount}</th>
              </tr>
            </thead>
            <tbody>
              {calc.lines.map((line) => (
                <tr key={line.id} className="item-in border-b border-slate-200" data-testid="invoice-line">
                  <td className="py-2 pe-3" dir="auto">
                    {line.description}
                  </td>
                  <td className="py-2 text-end tabular-nums" dir="ltr">
                    {line.quantityMilli / 1000}
                  </td>
                  <td className="py-2 text-end tabular-nums" dir="ltr">
                    {money(line.unitMinor)}
                  </td>
                  <td className="py-2 text-end tabular-nums" dir="ltr">
                    {line.rate}%
                  </td>
                  <td className="py-2 text-end font-semibold tabular-nums" dir="ltr">
                    {money(line.net)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 rounded-lg border-2 border-dashed border-slate-300 p-6 text-center text-slate-500">{labels.empty}</p>
      )}

      {hasLines ? (
        <dl className="ms-auto mt-4 grid max-w-xs gap-1.5" data-testid="invoice-totals">
          <div className="flex justify-between gap-6">
            <dt className="text-slate-600">{labels.subtotal}</dt>
            <dd className="tabular-nums" dir="ltr" data-testid="invoice-subtotal">
              <Odometer value={money(calc.subtotal)} />
            </dd>
          </div>
          {calc.vatByRate.map((group) => (
            <div key={group.rate} className="flex justify-between gap-6">
              <dt className="text-slate-600">{fill(labels.vatAt, { rate: group.rate })}</dt>
              <dd className="tabular-nums" dir="ltr" data-testid={`invoice-vat-${group.rate}`}>
                <Odometer value={money(group.vat)} />
              </dd>
            </div>
          ))}
          <div className="mt-1 flex items-baseline justify-between gap-6 border-t-2 border-slate-900 pt-2 text-lg font-black">
            <dt>{labels.total}</dt>
            <dd className="tabular-nums" dir="ltr" data-testid="invoice-total">
              <Odometer value={money(calc.total)} /> <span className="text-sm font-bold">{currency}</span>
            </dd>
          </div>
        </dl>
      ) : null}

      {notes ? (
        <div className="mt-6 border-t border-slate-200 pt-3">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-500">{labels.notes}</p>
          <p className="mt-1 whitespace-pre-line text-slate-600" dir="auto">
            {notes}
          </p>
        </div>
      ) : null}
    </article>
  );
};

export default InvoicePaper;
