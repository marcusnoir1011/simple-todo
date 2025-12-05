// CORE
import { Router } from "express";

// CUSTOM
import {
    createTodo,
    getAllTodo,
    getTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todo.js";

const router: Router = Router();

router.post("/create", createTodo);
router.get("/getAllTodo", getAllTodo);
router.get("/get/:id", getTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
