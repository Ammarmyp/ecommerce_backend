import { Request, Response } from "express";
import { ProductSchema } from "../../services/validation";
import { fromError } from "zod-validation-error";
import { BadRequestException } from "../../exceptions/bad-request";
import { ErrorCodes } from "../../exceptions/root";
import prisma from "../../../prisma/client";
import { NotFoundException } from "../../exceptions/not-found";
import ApiResponse from "../../services/apiResponse";

export const updateProduct = async (req: Request, res: Response) => {
  const { error, data } = await ProductSchema.safeParseAsync(req.body);

  if (error) {
    const validationError = fromError(error).toString();
    throw new BadRequestException(
      validationError,
      ErrorCodes.UNPROCESSABLENTITY
    );
  }

  const product = await prisma.product.findFirst({
    where: { id: parseInt(req.body.id, 10) },
  });

  if (!product) {
    throw new NotFoundException(
      "Product not found",
      ErrorCodes.PRODUCT_NOT_FOUND
    );
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: parseInt(req.body.id, 10),
    },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      tags: data.tags.join(","),
    },
  });

  res
    .status(200)
    .json(
      new ApiResponse(true, "product updated successfully", updatedProduct)
    );
};
