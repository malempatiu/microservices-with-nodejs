import { Producer } from "./kafka/producer/Producer";
import { config } from "@/config/config";
import { BootstrapTopics } from "./kafka/BootstrapTopics";
import { ProduceMessageRecord } from "./types";

class MessageBroker {
  private readonly producer: Producer;
  constructor() {
    this.producer = new Producer();
  }

  start = async () => {
    if (config.nodeEnv === 'development' && config.kafka.topicsBootstrap) {
      await BootstrapTopics.create(['OrderEvents']);
    }
    await this.producer.connect();
    // TODO: connect to consumer and subscribe
  }

  stop = async () => {
    await this.producer.disconnect();
    // TODO: disconnect consumer and related stuff
  }

  private getHealthStatus = (): boolean => {
    const producerHealthy = this.producer?.isHealthy() ?? false;
    // const consumerHealthy = this.consumer?.isHealthy() ?? false;
    return producerHealthy //&& consumerHealthy,
  }

  isHealthy = (): boolean => {
    return this.getHealthStatus();
  }

  sendMessage = async (data: ProduceMessageRecord) => {
    await this.producer.publish(data);
  }
}

export {MessageBroker};