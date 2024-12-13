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

addressRouter.delete(
  "/delete/:id",
  [authMiddleware],
  errorHandler(UserAddress.deleteAddress)
);

addressRouter.get(
  "/list",
  [authMiddleware],
  errorHandler(UserAddress.listAddresses)
);

export default addressRouter;
