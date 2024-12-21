import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

import useConversation from "../zustand/useConversation.js";

const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};

// eslint-disable-next-line react/prop-types
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  useEffect(() => {
    if (authUser) {
      // const serverUrl =
      //   window.location.hostname === "localhost"
      //     ? "http://localhost:9000"
      //     : "https://chater-pater-backend.onrender.com";
      const socket = io("https://chater-pater.up.railway.app", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  useEffect(() => {
    if (socket && selectedConversation && selectedConversation.name) {
      socket.emit("joinGroup", selectedConversation._id);
    }
  }, [socket, selectedConversation]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
