import { getDataProvider } from "../providers";

export function subscribeToUsers(onData, onError) {
  return getDataProvider().subscribeToUsers({}, onData, onError);
}

export async function updateUserRole({ uid, role }) {
  return getDataProvider().updateUserRole({ uid, role });
}
