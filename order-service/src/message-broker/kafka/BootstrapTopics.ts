import { config } from "@/config/config";
import { TOPIC_TYPE } from "../types";
import {KafkaJS} from '@confluentinc/kafka-javascript';
import { logger } from "@/utils/logger";
const {Kafka, logLevel} = KafkaJS;

class BootstrapTopics {
  static create = async (topics: TOPIC_TYPE[]) => {
    const admin = new Kafka({
      kafkaJS: {
        brokers: config.kafka.brokers,
        logLevel: logLevel.DEBUG
      }
    }).admin();

    try {
      await admin.connect();
      const existingTopics = await admin.listTopics();
      const topicsToCreate = topics.filter((topic) => !existingTopics.includes(topic));
      if (!topicsToCreate.length) {
        logger.info('All Topics already exists');
        return;
      }
      await admin.createTopics({
        topics: topicsToCreate.map((topic) => ({
          topic, 
          numPartitions: config.kafka.partitions, 
          replicationFactor: config.kafka.replication 
        }))
      });
      logger.info(`Created ${topicsToCreate.length} topic(s)`);
    } catch (e: any) {
      logger.error("Unable to create topic(s)", e);
      if (config.kafka.topicsBootstrap) {
        throw new Error('Failed to bootstrap Kafka topics')
      }
      logger.warn('Continuing without topic bootstrap');
    } finally {
      await admin.disconnect();
    }
  }
}

export {BootstrapTopics};