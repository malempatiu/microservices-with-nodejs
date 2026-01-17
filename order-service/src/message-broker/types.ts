import { config } from "@/config/config"

export type TOPICS = typeof config.kafka.topics;
export type TOPIC_TYPE = typeof config.kafka.topics[number];
export type EVENT_TYPE = typeof config.kafka.events[number];

export type ProduceMessageRecord = {
  topic: TOPIC_TYPE;
  event: EVENT_TYPE;
  headers: Record<string, any>;
  message: Record<string, any>;
}

export type MessageType = {
  headers?: Record<string, any>;
  event: EVENT_TYPE;
  data: Record<string, any>;
}