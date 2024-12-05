import { Router } from "express";
import { createProduct } from "../controllers/product/create";
import { errorHandler } from "../services/error-handler";
import authMiddleware from "../middlewares/auth";
import addminMiddleware from "../middlewares/admin";
import { updateProduct } from "../controllers/product/update";
import { deleteProduct } from "../controllers/product/delete";
import { getProductById } from "../controllers/product/getById";

const productsRouter: Router = Router();

productsRouter.post(
  "/new",
  [authMiddleware, addminMiddleware],
  errorHandler(createProduct)
);

productsRouter.put(
  "/edit/:id",
  [authMiddleware, addminMiddleware],
  errorHandler(updateProduct)
);

productsRouter.delete(
  "/delete/:id",
  [authMiddleware, addminMiddleware],
  errorHandler(deleteProduct)
);

productsRouter.get("/:id", getProductById);

export default productsRouter;
