import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../services/error-handler";
import UserAddress from "../controllers/user";

const addressRouter: Router = Router();

addressRouter.post(
  "/new",
  [authMiddleware],
  errorHandler(UserAddress.createAddress)
);

export default addressRouter;
