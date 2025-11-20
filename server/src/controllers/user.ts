// CORE
import type { Request, Response, RequestHandler } from "express";

// CUSTOM
import { User } from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";

// REGISTER
const userRegister: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "Email already used." });
      return;
    }

    const createdUser = await User.create({ name, email, password });
    if (!createdUser) {
      res.status(400).json({ message: "User creation failed." });
      return;
    }

    res.status(201).json({
      message: "User creation successful.",
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
    });
  }
);

const userLogin: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const isMatch = await userExist.matchPassword(password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credential." });
      return;
    }

    generateToken(res, userExist._id);
    res.status(200).json({
      message: "Login successful.",
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
    });
  }
);

const userLogout: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      message: "Logout successful.",
    });
  }
);

const getUserProfile: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: "User Profile." });
  }
);

const updateUserProfile: RequestHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {}
);

export {
  userRegister,
  userLogin,
  userLogout,
  getUserProfile,
  updateUserProfile,
};
