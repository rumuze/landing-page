const DATA_PROVIDER_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";
const POLLING_INTERVAL_MS = 15000;

const buildUrl = (path, params = {}) => {
  const url = new URL(`${DATA_PROVIDER_BASE_URL}${path}`, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};

const requestJson = async (path, options = {}) => {
  const response = await fetch(buildUrl(path, options.params), {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

const createPollingSubscription = (fetcher, onData, onError) => {
  let isActive = true;

  const run = async () => {
    try {
      const result = await fetcher();

      if (isActive) {
        onData(result ?? []);
      }
    } catch (error) {
      if (isActive && onError) {
        onError(error);
      }
    }
  };

  void run();
  const intervalId = window.setInterval(run, POLLING_INTERVAL_MS);

  return () => {
    isActive = false;
    window.clearInterval(intervalId);
  };
};

export const apiProvider = {
  async trackVisit(payload) {
    return requestJson("/visits", {
      method: "POST",
      body: payload,
    });
  },

  async createThread({ formData, user, options = {} }) {
    const response = await requestJson("/threads", {
      method: "POST",
      body: { formData, user, options },
    });

    return response?.id ?? null;
  },

  async sendMessage(payload) {
    await requestJson(`/threads/${payload.threadId}/messages`, {
      method: "POST",
      body: payload,
    });
  },

  subscribeToThreads({ user }, onData, onError) {
    return createPollingSubscription(
      () => requestJson("/threads", { params: { userId: user?.uid, role: user?.role } }),
      onData,
      onError,
    );
  },

  subscribeToMessages({ threadId }, onData, onError) {
    return createPollingSubscription(
      () => requestJson(`/threads/${threadId}/messages`),
      onData,
      onError,
    );
  },

  subscribeToNotifications({ userId }, onData, onError) {
    return createPollingSubscription(
      () => requestJson("/notifications", { params: { userId } }),
      onData,
      onError,
    );
  },

  async updateThreadStatus({ threadId, status }) {
    await requestJson(`/threads/${threadId}`, {
      method: "PATCH",
      body: { status },
    });
  },

  async markNotificationAsRead({ notificationId }) {
    await requestJson(`/notifications/${notificationId}`, {
      method: "PATCH",
      body: { isRead: true },
    });
  },

  async markNotificationsAsRead({ notificationIds }) {
    await requestJson("/notifications/bulk-read", {
      method: "POST",
      body: { notificationIds },
    });
  },

  subscribeToUsers(_params, onData, onError) {
    return createPollingSubscription(
      () => requestJson("/users"),
      onData,
      onError,
    );
  },

  subscribeToVisits(_params, onData, onError) {
    return createPollingSubscription(
      () => requestJson("/visits"),
      onData,
      onError,
    );
  },

  async updateUserRole({ uid, role }) {
    await requestJson(`/users/${uid}/role`, {
      method: "PATCH",
      body: { role },
    });
  },

  async ensureUserProfile({ firebaseUser }) {
    return requestJson(`/profiles/${firebaseUser.uid}/ensure`, {
      method: "POST",
      body: { firebaseUser },
    });
  },

  async getUserProfile({ uid }) {
    return requestJson(`/profiles/${uid}`);
  },

  subscribeToUserProfile({ uid }, onData, onError) {
    return createPollingSubscription(
      () => requestJson(`/profiles/${uid}`),
      onData,
      onError,
    );
  },

  async getLegacyMessages({ mode = "user", userId = null }) {
    return requestJson("/messages", {
      params: { mode, userId },
    });
  },
};
