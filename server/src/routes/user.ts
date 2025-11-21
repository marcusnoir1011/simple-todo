// CORE
import { Router, type RequestHandler } from "express";

// CUSTOM
import {
  userLogin,
  userRegister,
  userLogout,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.js";
import { protect } from "../middlewares/authMiddleware.js";

const router: Router = Router();

router.post("/register", userRegister as RequestHandler);
router.post("/login", userLogin as RequestHandler);
router.post("/logout", userLogout as RequestHandler);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
