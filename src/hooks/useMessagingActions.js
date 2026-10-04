import { useCallback } from "react";

// The chat service pulls in the Firebase SDK, so it is loaded when a message is
// actually sent, not when a form that can send one is first shown.
const loadChatService = () => import("../services/chatService");

export function useMessagingActions() {
  const createThread = useCallback(async ({ formData, user = null, options = {} }) => {
    const { createThread: createThreadService } = await loadChatService();
    return createThreadService({ formData, user, options });
  }, []);

  const sendMessage = useCallback(async (payload) => {
    const { sendMessage: sendMessageService } = await loadChatService();
    return sendMessageService(payload);
  }, []);

  const updateThreadStatus = useCallback(async ({ threadId, status }) => {
    const { updateThreadStatus: updateThreadStatusService } = await loadChatService();
    return updateThreadStatusService({ threadId, status });
  }, []);

  return {
    createThread,
    sendMessage,
    updateThreadStatus,
  };
}
