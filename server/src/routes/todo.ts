// CORE
import { Router } from "express";

// CUSTOM
import { createTodo } from "../controllers/todo";

const router: Router = Router();

router.post("/create", createTodo);
