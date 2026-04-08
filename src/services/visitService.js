import { getDataProvider } from "../providers";

export async function trackVisit(payload) {
  return getDataProvider().trackVisit(payload);
}

export function subscribeToVisits(onData, onError) {
  return getDataProvider().subscribeToVisits({}, onData, onError);
}
