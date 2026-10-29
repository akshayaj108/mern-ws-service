import logger from "./src/config/logger";
import config from "config";
import { createMessageBroker } from "./src/factories/broker-factory";
import { wsServer } from "./src/socket";
import { MessageBroker } from "./src/types/broker";

const startServer = async () => {
  let broker: MessageBroker | null = null;
  try {
    broker = createMessageBroker();
    await broker.connectConsumer();
    await broker.consumeMessage(["order"], false);
    const PORT = config.get("server.port");
    wsServer.listen(PORT, () =>{
      console.log(`Listening on port ${PORT}`)
    }).on("error", (err) =>{
      console.log("error", err);
      process.exit(1);
    })
  } catch (err) {
    if(broker){
      await broker.disconnectConsumer();
    }
    logger.error("Error happened: ", err);
    process.exit(1);
  }
};

void startServer();
