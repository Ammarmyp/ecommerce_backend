import { Router } from "express";
import authRouter from "./auth";
import productsRouter from "./products";
import addressRouter from "./user";
import cartRouter from "./cart";
import orderRouter from "./order";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/product", productsRouter);
rootRouter.use("/user/address", addressRouter);
rootRouter.use("/user/cart", cartRouter);
rootRouter.use("/user/order", orderRouter);

export default rootRouter;
