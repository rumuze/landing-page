import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Blocks, Boxes, Globe, Megaphone, Plus, Search, Smartphone, Users, Workflow } from 'lucide-react';
import { useAuth } from '../../context/auth-core';
import { useMessagingActions } from '../../hooks/useMessagingActions';
import { createThreadRequestId } from '../../utils/messages';
import { WAVE_ORDER, WAVE_DEPTH } from './serviceWaveLayout';
import { createServiceWave } from './serviceWavePhysics';
import { serviceWaveContent } from '../../content/serviceWaveContent';
import { WAVE_REQUEST_MODES, buildWaveThread, parseWaveContact } from '../../utils/serviceWaveRequest';

const ICONS = {
  erp: Boxes,
  crm: Users,
  odoo: Blocks,
  project: Plus,
  websites: Globe,
  seo: Search,
  mobile: Smartphone,
  ads: Megaphone,
  automation: Workflow,
};

// A flat wave: a closed path made of alternating curves. No fills that blend.
const wavePath = (height, amp) => {
  const curves = Array.from({ length: 12 }, (_, i) => {
    const y = i % 2 ? amp - amp * 0.9 : amp + amp * 0.9;
    return `Q${i * 200 + 100} ${y} ${(i + 1) * 200} ${amp}`;
  }).join(' ');
  return `M0 ${amp} ${curves} V${height} H0Z`;
};

const WAVES = [
  { name: 'one', height: 300, amp: 40 },
  { name: 'two', height: 300, amp: 34 },
  { name: 'three', height: 300, amp: 28 },
];

const ServiceWave = ({ isAr }) => {
  const locale = isAr ? 'ar' : 'en';
  const copy = serviceWaveContent[locale];
  const { user } = useAuth();
  const { createThread } = useMessagingActions();

  const rootRef = useRef(null);
  const fieldRef = useRef(null);
  const linksRef = useRef(null);
  const cardRef = useRef(null);
  const engineRef = useRef(null);
  const contactRef = useRef(null);
  const tapRef = useRef(() => {});

  const [openKey, setOpenKey] = useState(null);
  const [mode, setMode] = useState('order');
  const [contact, setContact] = useState('');
  const [note, setNote] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

  const resetForm = () => {
    setMode('order');
    setContact('');
    setNote('');
    setError('');
    setStatus('idle');
  };

  const close = useCallback(() => {
    setOpenKey((current) => {
      if (current) {
        rootRef.current?.querySelector(`[data-key="${current}"] button`)?.focus({ preventScroll: true });
      }
      return null;
    });
  }, []);

  // The engine reports taps; this decides what a tap means.
  useEffect(() => {
    tapRef.current = (key) => {
      if (openKey === key) {
        close();
        return;
      }
      resetForm();
      setOpenKey(key);
    };
  });

  useEffect(() => {
    const engine = createServiceWave({
      root: rootRef.current,
      field: fieldRef.current,
      links: linksRef.current,
      card: cardRef.current,
      rtl: isAr,
      onTap: (key) => tapRef.current(key),
      onDismiss: () => setOpenKey(null),
    });
    engineRef.current = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [isAr]);

  useEffect(() => {
    engineRef.current?.setOpen(openKey);
    if (openKey) contactRef.current?.focus({ preventScroll: true });
  }, [openKey]);

  useEffect(() => {
    if (!openKey) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openKey, close]);

  const item = openKey ? copy.items[openKey] : null;
  const privacyPath = isAr ? '/privacy' : '/en/privacy';
  const ids = useMemo(() => ({ title: 'svc-card-title', text: 'svc-card-text', error: 'svc-card-error' }), []);

  const submit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    if (!parseWaveContact(contact)) {
      setError(copy.contactError);
      contactRef.current?.focus();
      return;
    }
    setError('');
    if (honeypot) {
      setStatus('sent'); // a bot filled the hidden field: pretend it worked, send nothing
      return;
    }

    setStatus('sending');
    try {
      const thread = buildWaveThread({
        service: copy.items[openKey].label,
        mode,
        contact,
        note,
        locale,
      });
      await createThread({
        formData: { name: thread.name, email: thread.email, subject: `Quick request | ${thread.name}`, message: thread.message },
        user,
        options: { clientRequestId: createThreadRequestId() },
      });
      setStatus('sent');
    } catch (failure) {
      console.error('Service wave request failed:', failure);
      setStatus('failed');
    }
  };

  return (
    <section className="svc-section" aria-labelledby="svc-wave-title">
      <div className="content-shell">
        <h2 id="svc-wave-title" className={`type-h3 copy-primary dark:text-white ${isAr ? 'text-right' : 'text-left'}`}>
          {copy.title}
        </h2>

        <div className="svc-wave" ref={rootRef} dir={isAr ? 'rtl' : 'ltr'}>
          <div className="svc-wave__bg" aria-hidden="true">
            {WAVES.map(({ name, height, amp }) => (
              <svg key={name} className={`svc-wave__layer svc-wave__layer--${name}`} viewBox={`0 0 2400 ${height}`} preserveAspectRatio="none">
                <path d={wavePath(height, amp)} />
              </svg>
            ))}
          </div>

          <svg className="svc-wave__links" aria-hidden="true" ref={linksRef} />

          <ul className="svc-wave__field" aria-label={copy.regionLabel} ref={fieldRef}>
            {WAVE_ORDER.map((key) => {
              const Icon = ICONS[key];
              const { label, text } = copy.items[key];
              return (
                <li className="svc-chip" data-key={key} data-depth={WAVE_DEPTH[key]} key={key}>
                  <button
                    aria-expanded={openKey === key}
                    aria-haspopup="dialog"
                    aria-label={`${label}: ${text}`}
                    className="svc-chip__btn"
                    type="button"
                  >
                    <span className="svc-tile">
                      <i className="svc-ring" aria-hidden="true" />
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="svc-lbl" dir="auto">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Phones only (see .svc-scrim): tapping the dim layer closes the form. */}
          <div aria-hidden="true" className="svc-scrim" hidden={!openKey} onClick={close} />

          <form
            aria-labelledby={ids.title}
            className={`svc-card${openKey ? ' is-open' : ''}`}
            hidden={!openKey}
            noValidate
            onSubmit={submit}
            ref={cardRef}
            role="dialog"
          >
            <button aria-label={copy.close} className="svc-card__x" onClick={close} type="button">×</button>
            <h3 id={ids.title}>{item?.label}</h3>
            <p id={ids.text}>{item?.text}</p>

            {status === 'sent' ? (
              <div className="svc-card__done" role="status">
                <strong>{copy.successTitle}</strong>
                <span>{copy.successBody}</span>
              </div>
            ) : (
              <>
                <div className="svc-card__modes" role="group" aria-label={copy.regionLabel}>
                  {WAVE_REQUEST_MODES.map((value) => (
                    <button aria-pressed={mode === value} key={value} onClick={() => setMode(value)} type="button">
                      {copy.modes[value]}
                    </button>
                  ))}
                </div>

                <label className="sr-only" htmlFor="svc-contact">{copy.contactLabel}</label>
                <input
                  aria-describedby={error ? ids.error : undefined}
                  aria-invalid={Boolean(error)}
                  autoComplete="off"
                  dir="auto"
                  id="svc-contact"
                  inputMode="text"
                  onChange={(event) => setContact(event.target.value)}
                  placeholder={copy.contactLabel}
                  ref={contactRef}
                  spellCheck={false}
                  value={contact}
                />
                <label className="sr-only" htmlFor="svc-note">{copy.notePlaceholder[mode]}</label>
                <textarea
                  id="svc-note"
                  maxLength={600}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder={copy.notePlaceholder[mode]}
                  rows={2}
                  value={note}
                />

                {/* Honeypot: people never see it, bots tend to fill it. */}
                <div aria-hidden="true" className="svc-card__trap">
                  <input autoComplete="off" name="companyWebsite" onChange={(event) => setHoneypot(event.target.value)} tabIndex={-1} value={honeypot} />
                </div>

                <p className="svc-card__error" id={ids.error} role="alert">
                  {error || (status === 'failed' ? copy.submitError : '')}
                </p>
                <button className="svc-card__send" disabled={status === 'sending'} type="submit">
                  {status === 'sending' ? copy.sending : copy.submit}
                </button>
                <p className="svc-card__legal">
                  {copy.privacy} <Link to={privacyPath}>{copy.privacyLink}</Link>
                </p>
              </>
            )}
          </form>
        </div>

        <p className="svc-hint">{copy.hint}</p>
      </div>
    </section>
  );
};

export default ServiceWave;
