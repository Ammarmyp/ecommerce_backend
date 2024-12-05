import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCodes } from "../../exceptions/root";
import ApiResponse from "../../services/apiResponse";

export const getProductById = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(req.params.id, 10) },
  });
  if (!product) {
    throw new NotFoundException(
      "Product not found",
      ErrorCodes.PRODUCT_NOT_FOUND
    );
  }

  res
    .status(200)
    .json(new ApiResponse(true, "Product is fetched successfully", product));
};
