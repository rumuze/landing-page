import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './fonts.js'
import './index.css'
import i18n from './i18n'
import App from './App.jsx'
import { localeFromPath } from './seo/linking'
import { preloadPageFor } from './routes/pageLoaders'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

async function start() {
  // The prerendered markup was produced in the route's language, so match it
  // before React hydrates.
  const language = i18n.changeLanguage(localeFromPath(window.location.pathname))

  // Hydrating before the page's chunk has loaded would swap the server-rendered page for a
  // loading skeleton until it arrives. Wait for the chunk first (but never for long).
  const prerendered = container.hasChildNodes()
  const chunk = prerendered
    ? Promise.race([preloadPageFor(window.location.pathname).catch(() => {}), new Promise((resolve) => setTimeout(resolve, 4000))])
    : Promise.resolve()
  await Promise.all([language, chunk])

  if (prerendered) {
    hydrateRoot(container, app, {
      // Keep a record so hydration mismatches can be inspected in tests.
      onRecoverableError: (error) => {
        window.__recoverableErrors = [...(window.__recoverableErrors ?? []), String(error?.message ?? error)]
      },
    })
  } else {
    createRoot(container).render(app)
  }
}

start()
