import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import ApiResponse from "../../services/apiResponse";

const getProducts = async (req: Request, res: Response) => {
  const skip = req.query.skip ? parseInt(req.query.skip as string, 10) : 0;

  if (isNaN(skip) || skip < 0) {
    return res.status(400).json(new ApiResponse(false, "in valid skip value"));
  }

  const count = await prisma.product.count();
  const products = await prisma.product.findMany({
    skip: skip,
    take: 10,
  });

  res
    .status(200)
    .json(new ApiResponse(true, "products fetched", { count, products }));
};

export default getProducts;
