import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useRooms } from "../../contexts/RoomContext";

let socket;

export default function Room({ id }) {
  const { rooms, setRooms } = useRooms();

  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    console.log(rooms);
    await fetch("/api/socket", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(id),
    });

    socket = io();

    socket.on("join-room", (msg) => {
      setRooms((prev) => ({
        ...prev,
        [id]: { ...prev[id], messages: [...(prev[id]?.messages || []), msg] },
      }));
    });

    socket.on("server-message", (msg) => {
      setRooms((prev) => ({
        ...prev,
        [id]: { ...prev[id], messages: [...(prev[id]?.messages || []), msg] },
      }));
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("client-message", e.target.elements.chat.value);
  }

  return (
    <div className="mx-auto max-w-3xl my-4">
      <h1 className="text-xl mb-5">Room {id}</h1>
      <div className="bg-slate-200 h-[480px] rounded-xl space-y-2 overflow-y-scroll">
        {rooms[id]?.messages?.map((msg, i) => (
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
  let { id } = context.params;
  return { props: { id } };
}
