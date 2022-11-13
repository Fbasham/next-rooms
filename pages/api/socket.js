import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  const roomId = req.body;

  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket) => {
    socket.join(roomId);
    socket.to(roomId).emit("join-room", `${socket.id} has joined the room`);
    socket.on("client-message", (msg) => {
      socket.in(roomId).emit("server-message", msg);
    });
  };

  io.on("connection", onConnection);

  res.end();
}
