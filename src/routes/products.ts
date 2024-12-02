import { Router } from "express";
import { createProduct } from "../controllers/product";
import { errorHandler } from "../services/error-handler";
import authMiddleware from "../middlewares/auth";

const productsRouter: Router = Router();

productsRouter.post("/new", [authMiddleware], errorHandler(createProduct));

export default productsRouter;
