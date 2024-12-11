import { Router } from "express";
import createAddress from "../controllers/user/createAddress";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../services/error-handler";

const addressRouter: Router = Router();

addressRouter.post("/new", [authMiddleware], errorHandler(createAddress));

export default addressRouter;
