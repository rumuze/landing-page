import { useCallback } from "react";
import { useAuth } from "../context/auth-core";
import { useMessagingActions } from "./useMessagingActions";
import { createThreadRequestId } from "../utils/messages";
import {
  buildLeadThreadMessage,
  buildLeadThreadSubject,
} from "../utils/leadQualification";

export function useLeadQualificationSubmission() {
  const { user } = useAuth();
  const { createThread } = useMessagingActions();

  return useCallback(
    async ({ intent, formData, source }) => {
      return createThread({
        formData: {
          name: formData.fullName,
          email: formData.workEmail,
          company: formData.companyName,
          subject: buildLeadThreadSubject({ intent, formData }),
          message: buildLeadThreadMessage({ intent, formData, source }),
        },
        user,
        options: {
          clientRequestId: createThreadRequestId(),
        },
      });
    },
    [createThread, user],
  );
}
