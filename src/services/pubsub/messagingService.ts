import { PubSub } from '@google-cloud/pubsub';

const pubsub = new PubSub();

export const publishMessage = async (
  topicName: string,
  data: any,
  attributes: Record<string, string> = {}
) => {
  try {
    const topic = pubsub.topic(topicName);
    const messageBuffer = Buffer.from(JSON.stringify(data));
    
    const messageId = await topic.publish(messageBuffer, attributes);
    console.log(`Message ${messageId} published.`);
    return messageId;
  } catch (error) {
    console.error('Error publishing message:', error);
    throw error;
  }
};

export const subscribeToTopic = async (
  subscriptionName: string,
  callback: (message: any) => Promise<void>
) => {
  try {
    const subscription = pubsub.subscription(subscriptionName);

    subscription.on('message', async (message) => {
      try {
        const data = JSON.parse(message.data.toString());
        await callback(data);
        message.ack();
      } catch (error) {
        console.error('Error processing message:', error);
        message.nack();
      }
    });

    subscription.on('error', (error) => {
      console.error('Subscription error:', error);
    });
  } catch (error) {
    console.error('Error setting up subscription:', error);
    throw error;
  }
};