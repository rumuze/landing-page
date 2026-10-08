import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Plus, Trash2 } from 'lucide-react';
import ToolPageShell from '../../components/tools/ToolPageShell';
import ToolField from '../../components/tools/ToolField';
import CodeStream from '../../components/tools/CodeStream';
import { saveText } from '../../components/tools/saveFile';
import SegmentedControl from '../../components/ui/SegmentedControl';
import ChipGroup from '../../components/ui/ChipGroup';
import CopyButton from '../../components/ui/CopyButton';
import { buttonClass, fieldClass, inputClass } from '../../components/tools/toolStyles';
import { toolsContent } from '../../content/toolsContent';
import {
  EXAMPLE_URLS,
  MAX_SITEMAP_URLS,
  PRESETS,
  buildRobots,
  buildSitemap,
  checkRobots,
  hostsOf,
  parseSitemapLines,
  splitLines,
  testPath,
  tokenizeRobotsLine,
} from '../../tools/seoFiles';
import { tokenizeHtmlLine } from '../../tools/socialPreview';

const MAX_GROUPS = 6;
let nextId = 1;

const toEditor = (group) => ({
  id: nextId++,
  agents: group.agents.join('\n'),
  disallow: group.disallow.join('\n'),
  allow: group.allow.join('\n'),
  crawlDelay: group.crawlDelay ? String(group.crawlDelay) : '',
});
const fromEditor = (editor) => {
  const delay = Number.parseInt(editor.crawlDelay, 10);
  return {
    agents: splitLines(editor.agents),
    disallow: splitLines(editor.disallow),
    allow: splitLines(editor.allow),
    crawlDelay: Number.isFinite(delay) && delay > 0 ? delay : 0,
  };
};
const presetGroups = (name) => PRESETS[name].groups.map(toEditor);

const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, key) => values[key]);

const SeoFilesPage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'ar' : 'en';
  const page = toolsContent[lang].seofiles;
  const common = toolsContent[lang].common;

  const [tab, setTab] = useState('robots');
  const [preset, setPreset] = useState('allow');
  const [groups, setGroups] = useState(() => presetGroups('allow'));
  const [sitemaps, setSitemaps] = useState('');
  const [crawler, setCrawler] = useState('Googlebot');
  const [path, setPath] = useState('/admin/login');
  const [urls, setUrls] = useState('');

  // An example is put in once the page is in the browser, so the first view shows real files.
  useEffect(() => {
    setPreset('store');
    setGroups(presetGroups('store'));
    setSitemaps('https://example.com/sitemap.xml');
    setPath('/checkout/payment');
    setUrls(EXAMPLE_URLS);
  }, []);

  const choosePreset = (name) => {
    if (!name) return;
    setPreset(name);
    setGroups(presetGroups(name));
  };
  const updateGroup = (id, key) => (event) => {
    setPreset('');
    setGroups((current) => current.map((group) => (group.id === id ? { ...group, [key]: event.target.value } : group)));
  };

  const config = useMemo(() => ({ groups: groups.map(fromEditor), sitemaps: splitLines(sitemaps) }), [groups, sitemaps]);
  const robots = useMemo(() => buildRobots(config), [config]);
  const robotsLines = useMemo(() => (robots ? robots.split('\n') : ['# robots.txt']), [robots]);
  const problems = useMemo(() => checkRobots(config), [config]);
  const verdict = useMemo(() => testPath(config.groups, crawler.trim() || '*', path.trim() || '/'), [config, crawler, path]);

  const parsed = useMemo(() => parseSitemapLines(urls), [urls]);
  const hosts = useMemo(() => hostsOf(parsed.entries), [parsed]);
  const sitemap = useMemo(() => (parsed.entries.length ? buildSitemap(parsed.entries.slice(0, MAX_SITEMAP_URLS)) : ''), [parsed]);
  const sitemapLines = useMemo(() => (sitemap ? sitemap.split('\n') : ['<!-- sitemap.xml -->']), [sitemap]);

  const problemText = (problem) => fill(page.checks[problem.id], { value: problem.value ?? '' });
  const ruleText = verdict.rule ? `${verdict.rule.type === 'allow' ? 'Allow' : 'Disallow'}: ${verdict.rule.pattern}` : '';

  return (
    <ToolPageShell wide toolId="seofiles">
      <SegmentedControl
        id="sf-tab"
        label={page.tabLabel}
        fill
        options={[
          { value: 'robots', label: page.tabs.robots },
          { value: 'sitemap', label: page.tabs.sitemap },
        ]}
        value={tab}
        onChange={setTab}
      />

      {tab === 'robots' ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="min-w-0">
            <ChipGroup id="sf-preset" label={page.presetLabel} options={Object.keys(PRESETS).map((key) => ({ value: key, label: page.presets[key] }))} value={preset} onChange={choosePreset} />

            <div className="mt-6 grid gap-5">
              {groups.map((group, index) => (
                <fieldset key={group.id} className="item-in rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] p-4">
                  <legend className="px-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                    {page.fields.agents} {groups.length > 1 ? index + 1 : ''}
                  </legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ToolField id={`sf-agents-${index}`} label={page.fields.agents} hint={page.hints.agents} className="sm:col-span-2">
                      {(props) => <textarea {...props} rows={2} dir="ltr" value={group.agents} onChange={updateGroup(group.id, 'agents')} className={`${inputClass} resize-y text-left font-mono text-sm`} />}
                    </ToolField>
                    <ToolField id={`sf-disallow-${index}`} label={page.fields.disallow} hint={page.hints.disallow}>
                      {(props) => <textarea {...props} rows={4} dir="ltr" value={group.disallow} onChange={updateGroup(group.id, 'disallow')} className={`${inputClass} resize-y text-left font-mono text-sm`} />}
                    </ToolField>
                    <ToolField id={`sf-allow-${index}`} label={page.fields.allow} hint={page.hints.allow}>
                      {(props) => <textarea {...props} rows={4} dir="ltr" value={group.allow} onChange={updateGroup(group.id, 'allow')} className={`${inputClass} resize-y text-left font-mono text-sm`} />}
                    </ToolField>
                    <ToolField id={`sf-delay-${index}`} label={page.fields.crawlDelay} hint={page.hints.crawlDelay}>
                      {(props) => <input {...props} type="text" inputMode="numeric" dir="ltr" value={group.crawlDelay} onChange={updateGroup(group.id, 'crawlDelay')} className={`${fieldClass(false)} text-left`} />}
                    </ToolField>
                  </div>
                  {groups.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setPreset('');
                        setGroups((current) => current.filter((item) => item.id !== group.id));
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-red-600"
                    >
                      <Trash2 size={15} aria-hidden="true" />
                      {page.fields.agents} {index + 1}
                    </button>
                  ) : null}
                </fieldset>
              ))}
              {groups.length < MAX_GROUPS ? (
                <button
                  type="button"
                  id="sf-add-group"
                  onClick={() => {
                    setPreset('');
                    setGroups((current) => [...current, toEditor({ agents: [], allow: [], disallow: [] })]);
                  }}
                  className={`${buttonClass} justify-self-start border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}
                >
                  <Plus size={18} aria-hidden="true" />
                  {page.fields.agents}
                </button>
              ) : null}

              <ToolField id="sf-sitemaps" label={page.fields.sitemaps} hint={page.hints.sitemaps}>
                {(props) => <textarea {...props} rows={2} dir="ltr" value={sitemaps} onChange={(event) => setSitemaps(event.target.value)} className={`${inputClass} resize-y text-left font-mono text-sm`} />}
              </ToolField>
            </div>
          </div>

          <div className="min-w-0">
            <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">{page.output}</p>
            <CodeStream lines={robotsLines} streamKey="robots" label={page.output} tokenize={tokenizeRobotsLine} />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{page.where.robots}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <CopyButton id="sf-copy-robots" text={robots} disabled={!robots} label={page.copyFile} copiedLabel={common.copied} />
              <button
                type="button"
                id="sf-download-robots"
                disabled={!robots}
                onClick={() => saveText('robots.txt', `${robots}\n`, 'text/plain;charset=utf-8')}
                className={`${buttonClass} border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan disabled:opacity-50 dark:border-white/10 dark:text-gray-300`}
              >
                <Download size={18} aria-hidden="true" />
                {page.download.robots}
              </button>
            </div>

            <section className="mt-6 rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] p-4" aria-labelledby="sf-checks-title">
              <h2 id="sf-checks-title" className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {page.checks.title}
              </h2>
              {problems.length ? (
                <ul className="mt-2 grid gap-1.5 text-sm" data-testid="sf-checks">
                  {problems.map((problem, index) => (
                    <li key={`${problem.id}-${index}`} data-level={problem.level} className={problem.level === 'error' ? 'text-red-700 dark:text-red-300' : 'text-amber-800 dark:text-amber-300'}>
                      {problemText(problem)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300" data-testid="sf-checks">
                  {page.checks.allGood}
                </p>
              )}
            </section>

            <section className="mt-6 rounded-2xl border border-[rgb(var(--border-subtle)/0.8)] p-4" aria-labelledby="sf-test-title">
              <h2 id="sf-test-title" className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {page.test.title}
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <ToolField id="sf-crawler" label={page.test.crawler}>
                  {(props) => <input {...props} type="text" dir="ltr" value={crawler} onChange={(event) => setCrawler(event.target.value)} placeholder={page.test.crawlerPlaceholder} className={`${fieldClass(false)} text-left`} />}
                </ToolField>
                <ToolField id="sf-path" label={page.test.path}>
                  {(props) => <input {...props} type="text" dir="ltr" value={path} onChange={(event) => setPath(event.target.value)} placeholder={page.test.pathPlaceholder} className={`${fieldClass(false)} text-left`} />}
                </ToolField>
              </div>
              <div key={`${verdict.allowed}-${ruleText}`} className="tool-rise mt-4 flex flex-wrap items-center gap-3" data-testid="sf-verdict" data-allowed={verdict.allowed ? 'true' : 'false'}>
                <span className={`rounded-lg border-[3px] px-3 py-1 text-sm font-black uppercase tracking-wide ${verdict.allowed ? 'border-cyan text-cyan-800 dark:text-cyan' : 'border-red-500 text-red-700 dark:text-red-300'}`}>
                  {verdict.allowed ? page.test.allowed : page.test.blocked}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {verdict.rule ? (
                    <>
                      {fill(page.test.byRule, { rule: '' })}
                      <code dir="ltr" className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">
                        {ruleText}
                      </code>
                    </>
                  ) : verdict.group ? (
                    page.test.noRule
                  ) : (
                    page.test.noGroup
                  )}
                </span>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="min-w-0">
            <ToolField id="sf-urls" label={page.sitemap.urls} hint={page.sitemap.urlsHint}>
              {(props) => <textarea {...props} rows={12} dir="ltr" value={urls} onChange={(event) => setUrls(event.target.value)} className={`${inputClass} resize-y text-left font-mono text-sm`} />}
            </ToolField>
            <button type="button" id="sf-example" onClick={() => setUrls(EXAMPLE_URLS)} className={`${buttonClass} mt-4 border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan dark:border-white/10 dark:text-gray-300`}>
              {page.sitemap.loadExample}
            </button>
            <ul className="mt-4 grid gap-1.5 text-sm" data-testid="sf-sitemap-checks" aria-live="polite">
              <li className="font-semibold text-slate-700 dark:text-slate-200">{fill(page.sitemap.count, { n: parsed.entries.length })}</li>
              {parsed.invalid.length ? <li className="text-red-700 dark:text-red-300">{fill(page.sitemap.invalid, { n: parsed.invalid.length, lines: parsed.invalid.slice(0, 3).join(' | ') })}</li> : null}
              {parsed.duplicates ? <li className="text-amber-800 dark:text-amber-300">{fill(page.sitemap.duplicates, { n: parsed.duplicates })}</li> : null}
              {hosts.length > 1 ? <li className="text-amber-800 dark:text-amber-300">{fill(page.sitemap.mixedHosts, { hosts: hosts.join(', ') })}</li> : null}
              {parsed.entries.length > MAX_SITEMAP_URLS ? <li className="text-red-700 dark:text-red-300">{page.sitemap.tooMany}</li> : null}
            </ul>
          </div>
          <div className="min-w-0">
            <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-gray-300">{page.output}</p>
            <CodeStream lines={sitemapLines} streamKey={`sitemap-${parsed.entries.length}`} label={page.output} tokenize={tokenizeHtmlLine} />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{sitemap ? page.where.sitemap : page.sitemap.empty}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <CopyButton id="sf-copy-sitemap" text={sitemap} disabled={!sitemap} label={page.copyFile} copiedLabel={common.copied} />
              <button
                type="button"
                id="sf-download-sitemap"
                disabled={!sitemap}
                onClick={() => saveText('sitemap.xml', `${sitemap}\n`, 'application/xml;charset=utf-8')}
                className={`${buttonClass} border-2 border-slate-200 text-slate-700 hover:border-cyan hover:text-cyan disabled:opacity-50 dark:border-white/10 dark:text-gray-300`}
              >
                <Download size={18} aria-hidden="true" />
                {page.download.sitemap}
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{page.notice}</p>
    </ToolPageShell>
  );
};

export default SeoFilesPage;
