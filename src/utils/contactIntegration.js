import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDb } from "./firebaseClient";
import { buildPublicMessagePayload } from "./messages";

let contactIntegration;

export function initContactIntegration() {
  if (contactIntegration) {
    return contactIntegration;
  }

  contactIntegration = {
    preload() {},
    async saveMessage(message) {
      try {
        await addDoc(
          collection(getDb(), "messages"),
          {
            ...buildPublicMessagePayload(message),
            createdAt: serverTimestamp(),
          },
        );

        return true;
      } catch (error) {
        console.error("Firestore write error:", error);
        return false;
      }
    },
  };

  return contactIntegration;
}
