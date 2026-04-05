import { useCallback } from "react";
import {
  createThread as createThreadService,
  sendMessage as sendMessageService,
  updateThreadStatus as updateThreadStatusService,
} from "../services/chatService";

export function useMessagingActions() {
  const createThread = useCallback(async ({ formData, user = null, options = {} }) => {
    return createThreadService({ formData, user, options });
  }, []);

  const sendMessage = useCallback(async (payload) => {
    return sendMessageService(payload);
  }, []);

  const updateThreadStatus = useCallback(async ({ threadId, status }) => {
    return updateThreadStatusService({ threadId, status });
  }, []);

  return {
    createThread,
    sendMessage,
    updateThreadStatus,
  };
}
