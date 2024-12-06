import { Router } from "express";
import { errorHandler } from "../services/error-handler";
import authMiddleware from "../middlewares/auth";
import addminMiddleware from "../middlewares/admin";
import Property from "../controllers/product";

const productsRouter: Router = Router();

productsRouter.post(
  "/new",
  [authMiddleware, addminMiddleware],
  errorHandler(Property.createProduct)
);

productsRouter.put(
  "/edit/:id",
  [authMiddleware, addminMiddleware],
  errorHandler(Property.updateProduct)
);

productsRouter.delete(
  "/delete/:id",
  [authMiddleware, addminMiddleware],
  errorHandler(Property.deleteProduct)
);

productsRouter.get("/:id", errorHandler(Property.getProductById));
productsRouter.get("/", errorHandler(Property.getProducts));

export default productsRouter;
