import { apiProvider } from "./apiProvider";
import { firebaseProvider } from "./firebase/firebaseProvider";
import { assertProviderInterface } from "./providerInterface";

const providerMap = {
  api: apiProvider,
  firebase: firebaseProvider,
};

const providerName = import.meta.env.VITE_DATA_PROVIDER === "api" ? "api" : "firebase";

export function getDataProvider() {
  return assertProviderInterface(providerMap[providerName]);
}

export function getActiveProviderName() {
  return providerName;
}
