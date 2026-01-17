import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  dbUrl: string;
  catalogUrl: string;
  kafka: {
    clientId: string;
    groupId: string;
    brokers: string[];
    partitions: number;
    replication: number;
    topics: typeof TOPICS;
    events: typeof EVENTS;
    topicsBootstrap: boolean;
  }

}

const TOPICS = ['OrderEvents', 'CatalogEvents'] as const;
const EVENTS = ['create_order', 'cancel_order'] as const;

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DB_URL || '',
  catalogUrl: process.env.CATALOG_URL || '',
  kafka: {
    // A label that names a particular producer or consumer
    clientId: process.env.KAFKA_CLIENT_ID || 'order-service',
    // For multiple consumers in a group to share workload then give same group id
    groupId: process.env.KAFKA_GROUP_ID || 'order-service-group',
    // Responsible for write and reading messages to partitions
    brokers: [process.env.KAFKA_BROKER_1 || 'localhost:9092'],
    // A single data log in kafka broker can be splitted into multiple logs called partitions
    // These smaller partitions can increase write capacity and overall cluster throughput can be higher 
    partitions: Number(process.env.TOPIC_PARTITIONS) || 2,
    // determines how many copies of partitions are needed for data integrity
    replication: Number(process.env.REPLICATION_FACTOR) || 1,
    topics: TOPICS,
    events: EVENTS,
    topicsBootstrap: Boolean(process.env.TOPICS_BOOTSTRAP) || false
  }
};

export {config};