import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 6969;


app.get("/", (req, res) => {
  res.send("<h1>App is healthy</h1>");
});

// middlewares
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectToMongoDB()
  console.log(`Server is running on port http://localhost:${PORT}`);
});
