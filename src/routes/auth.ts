import { Router } from "express";
import { login, signup } from "../controllers/auth";

const authRouter: Router = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);

export default authRouter;
