import { KafkaJS } from "@confluentinc/kafka-javascript";
import { logger } from "@/utils/logger";
import { ProduceMessageRecord } from "../../types";
import { config } from "@/config/config";
const {Kafka, logLevel} = KafkaJS;

class Producer {
  private readonly producer: KafkaJS.Producer;
  private isConnected: boolean;

  constructor() {
    this.producer = new Kafka({
      kafkaJS: {
        clientId: config.kafka.clientId,
        brokers: config.kafka.brokers,
        logLevel: logLevel.DEBUG
      }
    }).producer({kafkaJS: { acks: -1 }});
    this.isConnected = false;
  }

  connect = async () => {
    if (this.isConnected) {
      logger.info('Producer already connected');
      return;
    }
    try {
      await this.producer.connect();
      this.isConnected = true;
      logger.info('Producer connected successfully');
    } catch (error: any) {
      logger.error('Unable to connect to producer', error);
      throw new Error(error);
    }
  }

  disconnect = async () => {
    if (!this.isConnected) return;
    try {
      await this.producer.disconnect();
      this.isConnected = false;
      logger.info('Producer disconnected successfully');
    } catch (error: any) {
      logger.error('Unable to disconnect producer', error);
      throw new Error(error);
    }
  }

   private toBuffer(data: any): Buffer {
    if (Buffer.isBuffer(data)) {
      return data;
    }
    if (typeof data === 'string') {
      return Buffer.from(data);
    }
    // Assume it's an object that needs JSON serialization
    return Buffer.from(JSON.stringify(data));
  }

  publish = async (messageRecord: ProduceMessageRecord) => {
    try {
      const result = await this.producer.send({
        topic: messageRecord.topic,
        messages: [{
          headers: messageRecord.headers,
          key: messageRecord.event,
          value: this.toBuffer(messageRecord.message),
        }]
      })
      logger.info(`Published ${result.length} messages`);
    } catch (error: any) {
      logger.error('Unable to publish message', error);
      throw new Error(error.message);
    }
  }

  isHealthy = (): boolean => {
    return this.isConnected;
  }
}

export {Producer};