import { useEffect, useState } from 'react';
import { CONSENT_UNSET, readConsent, subscribeToConsent } from '../utils/consent';

/**
 * Current analytics consent. It starts as "unset" on the server and on the
 * first client render so prerendered markup and hydration agree, then reads
 * the stored choice in an effect.
 */
export function useConsent() {
  const [consent, setConsent] = useState(CONSENT_UNSET);

  useEffect(() => {
    setConsent(readConsent());
    return subscribeToConsent(setConsent);
  }, []);

  return consent;
}
