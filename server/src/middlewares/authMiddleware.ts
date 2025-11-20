import type { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.js";
import type { Types } from "mongoose";

export interface AuthRequest extends Request {
  user?: {
    _id: string | Types.ObjectId;
    name: string;
    email: string;
  };
}

interface User {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
}

const protect: RequestHandler = asyncHandler(
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    let token;
    if (!token) {
      res.status(401);
      throw new Error("Not Authorized.");
    }

    token = req.cookies.token;
    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        if (!decoded) {
          res.status(401);
          throw new Error("Invalid Token. Not Authorized.");
        }

        req.user = (await User.findById(decoded.userId).select(
          "-password"
        )) as User;

        next();
      } catch (err) {}
    }
  }
);

export { protect };
