import express from "express";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 6969
app.get("/", (req, res) => {
    res.send("<h1>App is healthy</h1>")
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})