import { Router } from "express";
import authRouter from "./auth";
import productsRouter from "./products";
import addressRouter from "./user";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/product", productsRouter);
rootRouter.use("/user/address", addressRouter);

export default rootRouter;
