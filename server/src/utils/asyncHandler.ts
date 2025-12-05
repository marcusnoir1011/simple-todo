// CORE
import type { Request, Response, NextFunction } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.js";

const asyncHandler =
  (
    controllerFn: (
      req: Request | AuthRequest,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) =>
  (req: Request | AuthRequest, res: Response, next: NextFunction) => {
    Promise.resolve(controllerFn(req, res, next).catch(next));
  };

// const asyncHandler = <P extends any[], R>(
//   controllerFn: (...args: P) => Promise<R>
// ) => {
//   return (...args: P) => {
//     const next = args[2];
//     Promise.resolve(controllerFn(...args)).catch(next);
//   };
// };

export default asyncHandler;
