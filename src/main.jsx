import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './fonts.js'
import './index.css'
import i18n from './i18n'
import App from './App.jsx'
import { hasLocalePrefix } from './seo/linking'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

async function start() {
  // The prerendered markup was produced in the route's language, so match it
  // before React hydrates.
  await i18n.changeLanguage(hasLocalePrefix(window.location.pathname, 'ar') ? 'ar' : 'en')

  if (container.hasChildNodes()) {
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
