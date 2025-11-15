// CORE
import type { Request, Response } from "express";

// CUSTOM
import { User } from "../models/user.js";

// REGISTER
const userRegister = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne(email);
    if (userExist) {
        return res.status(400).json({ message: "Email already used." });
    }

    const createdUser = await User.create({ name, email, password });
    if (!createdUser) {
        return res.status(400).json({ message: "User creation failed." });
    }

    return res.status(201).json({
        message: "User creation successful.",
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
    });
};

export { userRegister };
