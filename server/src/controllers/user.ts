// CORE
import type { Request, Response, NextFunction } from "express";

// CUSTOM
import { User } from "../models/user.js";

const userRegister = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const checkUser = await User.findOne({ email });
    if (checkUser) {
        res.status(400).json({ message: "Email already exist." });
        return;
    }

    const createdUser = await User.create({
        name,
        email,
        password,
    });
    if (createdUser) {
        res.status(201).json({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            message: "User creation success.",
        });
    } else {
        res.status(400).json({ message: "Failed at user creation." });
    }
};

export { userRegister };
