import { Producer } from "./kafka/producer/Producer";
import { config } from "@/config/config";
import { BootstrapTopics } from "./kafka/BootstrapTopics";
import { logger } from "@/utils/logger";

class MessageBroker {
   private producer?: Producer;
   private healthy: boolean = false;

  async start(): Promise<void> {
    try {
      logger.info('Starting message broker...');

      // Bootstrap topics
      if (config.nodeEnv === 'development' && config.kafka.topicsBootstrap) {
        await BootstrapTopics.create(['OrderEvents']);
      }

      // Initialize and connect producer
      this.producer = new Producer();
      await this.producer.connect();

      // Initialize and connect consumer (if needed)
      // this.consumer = new Consumer();
      // await this.consumer.connect();
      // await this.consumer.subscribe(['OrderEvents']);

      this.healthy = true;
      logger.info('Message broker started successfully');
    } catch (error) {
      this.healthy = false;
      logger.error(`Failed to start message broker: ${error}`);
      throw error;
    }
  }

   async stop(): Promise<void> {
    try {
      logger.info('Stopping message broker...');

      // if (this.consumer) {
      //   await this.consumer.disconnect();
      // }

      if (this.producer) {
        await this.producer.disconnect();
      }

      this.healthy = false;
      logger.info('Message broker stopped successfully');
    } catch (error) {
      logger.error(`Error stopping message broker: ${error}`);
      throw error;
    }
  }

  isHealthy = (): boolean => {
    const producerHealthy = this.producer?.isHealthy() ?? false;
    // const consumerHealthy = this.consumer?.isHealthy() ?? false;
    this.healthy = producerHealthy;
    return this.healthy;
  }

  getProducer(): Producer {
    if (!this.producer) {
      throw new Error('Producer not initialized. Call start() first.');
    }
    return this.producer;
  }
}

export {MessageBroker};