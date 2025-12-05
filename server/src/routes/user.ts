<<<<<<< HEAD
import { Router } from "express";
import { userRegister } from "../controllers/user.js";

const router: Router = Router();

router.post("/register", userRegister);
=======
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
>>>>>>> dev

export default router;
