import { config } from '@/config/config';
import { EVENT_TYPE, MessageType, TOPICS } from '@/message-broker/types';
import { logger } from '@/utils/logger';
import {KafkaJS} from '@confluentinc/kafka-javascript';
const {Kafka, logLevel} = KafkaJS;

class Consumer {
  private readonly consumer: KafkaJS.Consumer;
  private isConnected: boolean;

  constructor() {
    this.consumer = new Kafka({
      kafkaJS: {
        clientId: config.kafka.clientId,
        brokers: config.kafka.brokers,
        logLevel: logLevel.DEBUG
      }
    }).consumer({
      kafkaJS: {
        groupId: config.kafka.groupId
      }
    });
    this.isConnected = false;
  }

  connect = async () => {
  if (this.isConnected) {
    logger.info('Consumer already connected');
    return;
  }
  try {
    await this.consumer.connect();
    this.isConnected = true;
    logger.info('Consumer connected successfully');
  } catch (error: any) {
    logger.error('Unable to connect to consumer', error);
    throw new Error(error);
  }
  }

  disconnect = async () => {
    if (!this.isConnected) return;
    try {
      await this.consumer.disconnect();
      this.isConnected = false;
      logger.info('Consumer disconnected successfully');
    } catch (error: any) {
      logger.error('Unable to disconnect consumer', error);
      throw new Error(error);
    }
  }

  isHealthy = (): boolean => {
    return this.isConnected;
  }

  subscribe = async (topics: TOPICS[number][], messageHandler: (message: MessageType) => void) => {
    await this.consumer.subscribe({ topics: [...topics] });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (topic !== "OrderEvents") {
          return;
        }

        if (message.key && message.value) {
          const inputMessage: MessageType = {
            headers: message.headers,
            event: message.key.toString() as EVENT_TYPE,
            data: message.value ? JSON.parse(message.value.toString()) : null,
          };
          await messageHandler(inputMessage);
          await this.consumer.commitOffsets([
            { topic, partition, offset: (Number(message.offset) + 1).toString() },
          ]);
        }
      },
    });
  }
}

export {Consumer};