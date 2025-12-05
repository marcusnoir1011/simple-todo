// CORE
<<<<<<< HEAD
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
=======
import type { Request, Response, RequestHandler } from "express";

// CUSTOM
import { User } from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import type { AuthRequest } from "../middlewares/authMiddleware.js";

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
      sameSite: "none",
      secure: true,
      path: "/",
    });
    res.status(200).json({
      message: "Logout successful.",
    });
  }
);

const getUserProfile: RequestHandler = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const user = {
      _id: req.user?._id,
      name: req.user?.name,
      email: req.user?.email,
    };
    res.status(200).json({ user });
  }
);

const updateUserProfile: RequestHandler = asyncHandler(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    const filteredResult = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    };

    res.status(200).json({ message: "Updated user profile.", filteredResult });
  }
);

export {
  userRegister,
  userLogin,
  userLogout,
  getUserProfile,
  updateUserProfile,
};
>>>>>>> dev
