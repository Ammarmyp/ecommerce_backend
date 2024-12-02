import { Router } from "express";
import authRouter from "./auth";
import productsRouter from "./products";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/product", productsRouter);

export default rootRouter;
