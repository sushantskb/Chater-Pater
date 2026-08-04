import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import groupMessageRouter from "./routes/group.routes.js";
import path from "path";
import connectToMongoDB from "./db/connectToMongoDB.js";
import axios from "axios";

import { app, server } from "./socket/socket.js";
dotenv.config();
const PORT = process.env.PORT || 6969;

const __dirname = path.resolve();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/groups", groupMessageRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("/health", (req, res) => {
  return res.send("<h1>App is running fine!!!</h1>");
});

const hitAPI = async => () => {
  try {
    await axios.get("https://chater-pater-7160.onrender.com/health");
    console.log("API hit successfully");
  } catch (error) {
    console.error("Error hitting API:", error);
  }
}

setInterval(hitAPI, 5 * 60 * 1000); // Hit the API every 5 minutes

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(PORT, "0.0.0.0", (err) => {
  connectToMongoDB();

  console.log(`Server is running on port ${PORT}`);
});
