import { useEffect } from 'react';
import {
  clearChunkRecoveryAttempt,
  isDynamicImportFailure,
  recoverFromChunkError,
} from '../utils/chunkRecovery';

/**
 * After a deploy, a visitor's open tab can ask for page bundles that no longer
 * exist. Recover once by reloading instead of showing a broken page.
 */
export function useChunkErrorRecovery(pathname) {
  // A page that stayed up for five seconds counts as recovered.
  useEffect(() => {
    const timer = window.setTimeout(clearChunkRecoveryAttempt, 5000);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleChunkIssue = async (event) => {
      const errorLike = event?.reason ?? event?.error ?? event?.message;

      if (!isDynamicImportFailure(errorLike)) {
        return;
      }

      event?.preventDefault?.();
      await recoverFromChunkError();
    };

    window.addEventListener('error', handleChunkIssue);
    window.addEventListener('unhandledrejection', handleChunkIssue);

    return () => {
      window.removeEventListener('error', handleChunkIssue);
      window.removeEventListener('unhandledrejection', handleChunkIssue);
    };
  }, []);
}
