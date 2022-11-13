import { useState, createContext, useContext } from "react";

export const initialRooms = {};

export const RoomContext = createContext({
  rooms: undefined,
  setRooms: () => null,
});

export const useRooms = () => useContext(RoomContext);

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(initialRooms);
  return (
    <RoomContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomContext.Provider>
  );
};
