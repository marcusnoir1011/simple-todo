// CORE
import { Router } from "express";

// CUSTOM
import {
    createTodo,
    getAllTodo,
    getTodo,
    updateTodo,
    deleteTodo,
} from "../controllers/todo";

const router: Router = Router();

router.post("/create", createTodo);
router.get("/allTodo", getAllTodo);
router.get("/todo/:id", getTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
