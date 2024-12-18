import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../services/error-handler";
import CartItem from "../controllers/cart";

const cartRouter: Router = Router();

cartRouter.post(
  "/addItem",
  [authMiddleware],
  errorHandler(CartItem.addItemToCart)
);

cartRouter.delete(
  "/delete/:id",
  [authMiddleware],
  errorHandler(CartItem.deleteFromCart)
);

cartRouter.get("/getCart", [authMiddleware], errorHandler(CartItem.listItems));

cartRouter.put(
  "/changeQuantity/:id",
  [authMiddleware],
  errorHandler(CartItem.changeQuantity)
);

export default cartRouter;
