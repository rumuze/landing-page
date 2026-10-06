import { useCallback } from "react";
import { useAuth } from "../context/auth-core";
import { useMessagingActions } from "./useMessagingActions";
import { createThreadRequestId } from "../utils/messages";
import { buildLeadThread } from "../utils/leadQualification";

export function useLeadQualificationSubmission() {
  const { user } = useAuth();
  const { createThread } = useMessagingActions();

  return useCallback(
    async ({ intent, formData, source }) => {
      return createThread({
        formData: buildLeadThread({ intent, formData, source }),
        user,
        options: {
          clientRequestId: createThreadRequestId(),
        },
      });
    },
    [createThread, user],
  );
}
