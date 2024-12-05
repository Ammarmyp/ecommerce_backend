import { Router } from "express";
import { createProduct } from "../controllers/product/create";
import { errorHandler } from "../services/error-handler";
import authMiddleware from "../middlewares/auth";
import addminMiddleware from "../middlewares/admin";
import { updateProduct } from "../controllers/product/update";

const productsRouter: Router = Router();

productsRouter.post(
  "/new",
  [authMiddleware, addminMiddleware],
  errorHandler(createProduct)
);

productsRouter.put(
  "/:id",
  [authMiddleware, addminMiddleware],
  errorHandler(updateProduct)
);

export default productsRouter;
