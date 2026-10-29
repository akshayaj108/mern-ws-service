import { KafkaMessage } from "kafkajs"
import { io } from "../socket";

export const handleEmitData = (eventType: string, message: KafkaMessage) =>{
    const order = JSON.parse(message.value.toString());
    io.to(order.data.tenantId).emit(eventType, order);
    return;
}