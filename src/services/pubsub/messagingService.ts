export const publishMessage = async (
  topicName: string,
  data: unknown,
  attributes: Record<string, string> = {}
) => {
  console.warn(
    '[messagingService] Google Cloud Pub/Sub client cannot run in the browser. ' +
      'Implement publish/subscribe via a backend or swap to a client-ready service.'
  );
  void topicName;
  void data;
  void attributes;

  const messageId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `client-msg-${Date.now()}`;
  return messageId;
};

export const subscribeToTopic = async (
  subscriptionName: string,
  callback: (message: unknown) => Promise<void>
) => {
  console.warn(
    '[messagingService] Subscriptions are not available in the client build. No messages will be received.'
  );
  void subscriptionName;
  void callback;
};