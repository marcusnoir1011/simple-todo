import { Router } from "express";
import { userRegister } from "../controllers/user.js";

const router: Router = Router();

router.post("/register", userRegister);

export default router;
