import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://192.168.2.172:5173",
      "https://chater-pater.up.railway.app",
    ],
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};
const groupMap = {}; // This will map group ids to user ids

io.on("connection", (socket) => {
  console.log("A user is connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("joinGroup", (groupId) => {
    if (!groupMap[groupId]) {
      groupMap[groupId] = [];
    }
    if (!groupMap[groupId].includes(userId)) {
      groupMap[groupId].push(userId);
    }
    socket.join(groupId);
    console.log("User joined group", userId, groupId);
  });

  socket.on("sendGroupMessage", (data) => {
    const { groupId, message } = data;
    const groupMembers = groupMap[groupId] || [];
    groupMembers.forEach((memberId) => {
      const socketId = getReceiverSocketId(memberId);
      if (socketId) {
        io.to(socketId).emit("receiveGroupMessage", message);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    Object.keys(groupMap).forEach((groupId) => {
      groupMap[groupId] = groupMap[groupId].filter((id) => id !== userId);
      if (groupMap[groupId].length === 0) {
        delete groupMap[groupId];
      }
    });
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
