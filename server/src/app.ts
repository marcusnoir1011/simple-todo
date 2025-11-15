// CORE
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// CUSTOM
import { connectingDb } from "./config/db.js";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";

dotenv.config();

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

// Middleware
app.use(
    cors({
        origin: CLIENT_URL,
    })
);
app.use(express.json());

// ROUTES
app.use("/api/auth", userRouter);
app.use("api/todo", todoRouter);

app.listen(PORT, () => {
    connectingDb();
    console.log(`Server is running on http://localhost:${PORT}`);
});
