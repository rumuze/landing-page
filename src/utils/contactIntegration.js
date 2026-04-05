import { createThread } from "./messages";

let contactIntegration;

export function initContactIntegration() {
  if (contactIntegration) {
    return contactIntegration;
  }

  contactIntegration = {
    preload() {},
    async saveMessage(message, user = null) {
      try {
        // creates a thread and a first message in the subcollection
        await createThread(message, user);
        return true;
      } catch (error) {
        console.error("Firestore thread creation error:", error);
        return false;
      }
    },
  };

  return contactIntegration;
}
