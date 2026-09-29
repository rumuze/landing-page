import { useRegisterSW } from 'virtual:pwa-register/react';

/** Registers the service worker and exposes the "new version ready" state. */
export function usePwaUpdate() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  return { needRefresh, dismissUpdate: () => setNeedRefresh(false), applyUpdate: () => updateServiceWorker(true) };
}
