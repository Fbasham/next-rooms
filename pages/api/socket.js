import { Server } from "socket.io";
import { writeRoom, writeMessage } from "../../lib/dbHelper";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("join-room", ({ roomId, adminId }) => {
      writeRoom(roomId, adminId);
      socket.join(roomId);
    });

    socket.on("client-message", async ({ roomId, msg }) => {
      writeMessage(roomId, msg);
      socket.in(roomId).emit("server-message", msg);
    });
  });

  res.end();
}
