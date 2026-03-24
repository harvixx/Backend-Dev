import { Router } from "express"
import { useRegister } from "../controllers/auth.controller.js";
const authRouter = Router();
authRouter.post("/register",useRegister)
export default authRouter;