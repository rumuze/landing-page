import { createMessage } from "./messages";

let contactIntegration;

export function initContactIntegration() {
  if (contactIntegration) {
    return contactIntegration;
  }

  contactIntegration = {
    preload() {},
    async saveMessage(message, user = null) {
      try {
        await createMessage(message, user);
        return true;
      } catch (error) {
        console.error("Firestore write error:", error);
        return false;
      }
    },
  };

  return contactIntegration;
}
