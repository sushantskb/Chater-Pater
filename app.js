import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 6969;


app.get("/", (req, res) => {
  res.send("<h1>App is healthy</h1>");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
