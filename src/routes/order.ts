import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { errorHandler } from "../services/error-handler";
import Orders from "../controllers/order";

const orderRouter: Router = Router();

orderRouter.post("/new", [authMiddleware], errorHandler(Orders.createOrder));

export default orderRouter;
