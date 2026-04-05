const CHUNK_RELOAD_KEY = "rumuze:chunk-reload-attempt";

function getErrorMessage(errorLike) {
  if (!errorLike) {
    return "";
  }

  if (typeof errorLike === "string") {
    return errorLike;
  }

  return String(errorLike?.message || errorLike?.reason || errorLike);
}

export function isDynamicImportFailure(errorLike) {
  const message = getErrorMessage(errorLike);

  return [
    "Failed to fetch dynamically imported module",
    "Importing a module script failed",
    "error loading dynamically imported module",
    "Failed to import",
  ].some((pattern) => message.includes(pattern));
}

function getReloadMarker() {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.pathname}${window.location.search}`;
}

export function shouldAttemptChunkRecovery() {
  if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
    return false;
  }

  return sessionStorage.getItem(CHUNK_RELOAD_KEY) !== getReloadMarker();
}

function markChunkRecoveryAttempt() {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  sessionStorage.setItem(CHUNK_RELOAD_KEY, getReloadMarker());
}

export function clearChunkRecoveryAttempt() {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  sessionStorage.removeItem(CHUNK_RELOAD_KEY);
}

export async function recoverFromChunkError() {
  if (typeof window === "undefined") {
    return false;
  }

  if (!shouldAttemptChunkRecovery()) {
    return false;
  }

  markChunkRecoveryAttempt();

  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map(async (registration) => {
          try {
            await registration.update();
          } catch {
            return null;
          }
          return null;
        }),
      );
    }

    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    }
  } catch (error) {
    console.warn("Chunk recovery cleanup failed:", error);
  }

  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set("v", Date.now().toString());
  window.location.replace(nextUrl.toString());
  return true;
}
