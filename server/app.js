import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import groupMessageRouter from "./routes/group.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import axios from "axios";

import {app, server} from "./socket/socket.js"
dotenv.config();
const PORT = process.env.PORT || 6969;

app.get("/", (req, res) => {
  res.send("<h1>App is healthy</h1>");
});

// keep alive mechanism
// Create a keep-alive endpoint
app.get("/keep-alive", (req, res) => {
  res.status(200).send("Server is alive");
});

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/groups", groupMessageRouter);

server.listen(PORT, '0.0.0.0', (err) => {
  connectToMongoDB();
  if (err) {
    console.log("Error in starting Node.js server");
  } else {
    console.log(`Server is running on port ${PORT}`);

    // Set up keep-alive ping
    setInterval(() => {
      axios
        .get(`http://localhost:${PORT}/keep-alive`)
        .then((response) => {
          console.log("Keep-alive ping successful:", response.data);
        })
        .catch((error) => {
          console.error("Keep-alive ping failed:", error);
        });
    }, 300000); // Ping every 5 minutes
  }
});
