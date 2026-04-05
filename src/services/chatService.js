import { getDataProvider } from "../providers";

export async function createThread({ formData, user = null, options = {} }) {
  return getDataProvider().createThread({ formData, user, options });
}

export async function sendMessage(payload) {
  return getDataProvider().sendMessage(payload);
}

export function subscribeToThreads(params, onData, onError) {
  return getDataProvider().subscribeToThreads(params, onData, onError);
}

export function subscribeToMessages(params, onData, onError) {
  return getDataProvider().subscribeToMessages(params, onData, onError);
}

export function subscribeToNotifications(params, onData, onError) {
  return getDataProvider().subscribeToNotifications(params, onData, onError);
}

export async function updateThreadStatus(payload) {
  return getDataProvider().updateThreadStatus(payload);
}

export async function markNotificationAsRead(payload) {
  return getDataProvider().markNotificationAsRead(payload);
}

export async function markNotificationsAsRead(payload) {
  return getDataProvider().markNotificationsAsRead(payload);
}

export async function getLegacyMessages(params) {
  return getDataProvider().getLegacyMessages(params);
}
