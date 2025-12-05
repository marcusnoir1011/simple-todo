// CORE
import type { Request, RequestHandler, Response } from "express";

// CUSTOM
import { Todo } from "../models/todo.js";
<<<<<<< HEAD
=======
import asyncHandler from "../utils/asyncHandler.js";
>>>>>>> dev

// Creating todo

const createTodo: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { title } = req.body;
    const result = await Todo.create({
      title,
    });

    res.status(201).json({
      message: "Todo has been created successfully.",
      data: result,
    });
  }
);

// Getting todo
const getAllTodo: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await Todo.find();

    res.status(200).json({
      message: "All todo has been fetched.",
      data: result,
    });
  }
);

const getTodo: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await Todo.findById(id);

    res.status(200).json({
      message: "Todo has been fetched.",
      data: result?.title,
    });
  }
);

// Update
const updateTodo: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title } = req.body;
    const result = await Todo.findByIdAndUpdate(id, {
      title,
    });

    res.status(200).json({
      message: "Todo has been updated.",
      data: result,
    });
  }
);

// Delete
const deleteTodo: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await Todo.findByIdAndDelete(id);

    res.status(200).json({ message: "Todo has been delete." });
  }
);

export { createTodo, getAllTodo, getTodo, updateTodo, deleteTodo };
