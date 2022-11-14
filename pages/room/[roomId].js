import io from "socket.io-client";
import { useState, useEffect } from "react";

let socket;

export default function Room({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.emit("join-room", { roomId, adminId: socket.id });

    socket.on("server-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("client-message", {
      roomId,
      msg: e.target.elements.chat.value,
    });
  }

  return (
    <div className="mx-auto max-w-3xl my-4">
      <h1 className="text-xl mb-5">Room {roomId}</h1>
      <div className="bg-slate-200 h-[480px] rounded-xl space-y-2 overflow-y-scroll">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="bg-slate-500 text-white rounded-full px-2 py-1"
          >
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input id="chat" name="chat" className="mt-2 border-2 rounded w-full" />
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  let { roomId } = context.params;
  return { props: { roomId } };
}
