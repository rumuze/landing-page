import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDb } from "./firebaseClient";

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
            ...message,
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
