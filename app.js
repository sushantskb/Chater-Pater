import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import groupMessageRouter from "./routes/group.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 6969;

app.get("/", (req, res) => {
  res.send("<h1>App is healthy</h1>");
});

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/groups", groupMessageRouter);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
