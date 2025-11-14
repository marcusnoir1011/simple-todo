// CORE
import type { Request, Response } from "express";

// CUSTOM
import { Todo } from "../models/todo.js";

// Creating todo

const createTodo = async (req: Request, res: Response) => {
    const { title } = req.body;
    try {
        const result = await Todo.create({
            title,
        });

        res.status(201).json({
            message: "Todo has been created successfully.",
            data: result,
        });
    } catch (err: any) {
        console.error("Error creating todo: ", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

// Getting todo
const getAllTodo = async (req: Request, res: Response) => {
    try {
        const result = await Todo.find();

        res.status(200).json({
            message: "All todo has been fetched.",
            data: result,
        });
    } catch (err) {
        console.error("Error fetching all todos: ", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};
const getTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await Todo.findById(id);

        res.status(200).json({
            message: "Todo has been fetched.",
            data: result?.title,
        });
    } catch (err) {
        console.error("Error fetching the todo: ", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

// Update
const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const result = await Todo.findByIdAndUpdate(id, {
            title,
        });

        res.status(200).json({
            message: "Todo has been updated.",
            data: result,
        });
    } catch (err) {
        console.error("Error updating the todo: ", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};

// Delete
const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await Todo.findByIdAndDelete(id);

        res.status(200).json({ message: "Todo has been delete." });
    } catch (err) {
        console.error("Error deleting todo: ", err);
        res.status(500).json({ message: "Something went wrong." });
    }
};
export { createTodo, getAllTodo, getTodo, updateTodo, deleteTodo };
