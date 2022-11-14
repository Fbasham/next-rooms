import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [admin, setAdmin] = useState("");
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  function handleCreateRoom(e) {
    e.preventDefault();
    if (admin) {
      const newRoomId = (100000 + Math.random() * 100000) | 0;
      router.push(`/room/${newRoomId}`);
    }
  }

  function handleJoinRoom(e) {
    e.preventDefault();
    if (name && roomId) {
      router.push(`/room/${roomId}`);
    }
  }

  return (
    <div className="flex gap-10">
      <form
        className="flex flex-col gap-3 grow p-10"
        onSubmit={handleCreateRoom}
      >
        <label htmlFor="name">Name:</label>
        <input
          id="admin"
          name="admin"
          className="border-2 rounded"
          onChange={(e) => setAdmin(e.target.value)}
        />
        <button className="bg-purple-600 text-white rounded w-1/3 mx-auto hover:bg-purple-700">
          Create Room
        </button>
      </form>
      <form className="flex flex-col gap-3 grow p-10" onSubmit={handleJoinRoom}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          className="border-2 rounded"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="room">Room:</label>
        <input
          id="room"
          name="room"
          pattern="\d{6}"
          title="Six digit room code"
          className="border-2 rounded"
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button className="bg-purple-600 text-white rounded w-1/3 mx-auto hover:bg-purple-700">
          Enter Room
        </button>
      </form>
    </div>
  );
}
