import config from "config";
import { KafkaBroker } from "../config/kafka";
import { MessageBroker } from "../types/broker";
import { SERVICE_NAME } from "../common/constants";

let broker: MessageBroker | null = null;

export const createMessageBroker = (): MessageBroker => {
  console.log("connecting to kafka broker...");
  // singleton
  if (!broker) {
    broker = new KafkaBroker(SERVICE_NAME, [config.get("kafka.broker")]);
  }
  return broker;
};
