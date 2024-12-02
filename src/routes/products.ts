import { Router } from "express";
import { createProduct } from "../controllers/product";
import { errorHandler } from "../services/error-handler";
import authMiddleware from "../middlewares/auth";
import addminMiddleware from "../middlewares/admin";

const productsRouter: Router = Router();

productsRouter.post(
  "/new",
  [authMiddleware, addminMiddleware],
  errorHandler(createProduct)
);

export default productsRouter;
