import { Server } from "socket.io";
import app from "./src/app.js";
import { createServer } from "http";
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // 📥 receive message
    socket.on("chat message", (msg) => {
        console.log("Message:", msg);

        // 📤 send to all
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
})
httpServer.listen(3000, () => {
    console.log("server is running");
});