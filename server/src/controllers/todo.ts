// CORE
import type { Request, Response } from "express";

// CUSTOM
import { Todo } from "../models/todo";

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

export { createTodo };
