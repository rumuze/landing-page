export const dataProviderInterface = {
  createThread: "function",
  sendMessage: "function",
  subscribeToThreads: "function",
  subscribeToMessages: "function",
  subscribeToNotifications: "function",
};

export function assertProviderInterface(provider) {
  const missingMethods = Object.entries(dataProviderInterface)
    .filter(([methodName, methodType]) => typeof provider?.[methodName] !== methodType)
    .map(([methodName]) => methodName);

  if (missingMethods.length > 0) {
    throw new Error(
      `Invalid data provider. Missing methods: ${missingMethods.join(", ")}`,
    );
  }

  return provider;
}
