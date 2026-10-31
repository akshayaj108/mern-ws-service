import config from "config";
import { createServer } from "node:http";
import { Server } from "socket.io";

const wsServer = createServer();
// following from docs - https://socket.io/docs/v4/server-installation/
const io = new Server(wsServer, {
    cors: {
        origin: config.get("cors.origin.admin_dashboard")
    }
});

io.on("connection", (socket) =>{

    socket.on("join", (data) =>{
        socket.join(String(data.tenantId));
        socket.emit("join", { roomId: String(data.tenantId)});
    });
});

export {
    wsServer,
    io
};