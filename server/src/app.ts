// CORE
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

// CUSTOM
import { connectingDb } from "./config/db.js";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

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
app.use(cookieParser());

app.use(errorHandler);

// ROUTES
app.use("/api/auth", userRouter);
app.use("/api/todo", todoRouter);

app.listen(PORT, () => {
  connectingDb();
  console.log(`Server is running on http://localhost:${PORT}`);
});
