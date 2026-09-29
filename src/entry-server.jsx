import { StaticRouter } from 'react-router-dom';
import { prerenderToNodeStream } from 'react-dom/static';
import i18n from './i18n';
import App from './App.jsx';

const collect = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    stream.on('error', reject);
  });

/**
 * Renders one route to static HTML plus the <head> tags collected by
 * react-helmet-async. Used only at build time by scripts/prerender.js.
 */
async function renderOnce(url) {
  const helmetContext = {};
  const { prelude } = await prerenderToNodeStream(
    <App
      RouterComponent={StaticRouter}
      routerProps={{ location: url }}
      helmetContext={helmetContext}
    />,
    // React streams Suspense boundaries larger than ~12KB out of line behind
    // a fallback. For static files we want every boundary rendered in place.
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  );
  return { html: await collect(prelude), helmetContext };
}

export async function render(url, lang) {
  await i18n.changeLanguage(lang);

  const { html, helmetContext } = await renderOnce(url);
  const { helmet } = helmetContext;

  return {
    html,
    head: {
      htmlAttributes: helmet.htmlAttributes.toString(),
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      link: helmet.link.toString(),
      script: helmet.script.toString(),
    },
  };
}
