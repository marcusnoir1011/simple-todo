// CORE
import type { Response } from "express";
import jwt from "jsonwebtoken";
import type { Types } from "mongoose";

interface JwtPayload {
  userId: Types.ObjectId;
}

const generateToken = (res: Response, userId: Types.ObjectId): void => {
  const JWT_SECRET: string | undefined = process.env.JWT_SECRET!;
  if (!JWT_SECRET)
    throw new Error("JWT_SECRET not defined in environment variable.");

  const payload: JwtPayload = { userId };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none", // none in prod
    maxAge: 1 * 24 * 60 * 60 * 1000,
    path: "/",
  });
};

export default generateToken;
