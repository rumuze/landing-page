// Stand-in for `virtual:pwa-register/react` during the prerender (SSR) build.
// The service worker only exists in the browser.
export function useRegisterSW() {
  return {
    needRefresh: [false, () => {}],
    offlineReady: [false, () => {}],
    updateServiceWorker: async () => {},
  };
}
