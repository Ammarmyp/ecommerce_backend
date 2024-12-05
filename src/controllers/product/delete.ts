import { Request, Response } from "express";
import { ProductSchema } from "../../services/validation";
import { fromError } from "zod-validation-error";
import { BadRequestException } from "../../exceptions/bad-request";
import { ErrorCodes } from "../../exceptions/root";
import prisma from "../../../prisma/client";
import { NotFoundException } from "../../exceptions/not-found";

export const deleteProduct = async (req: Request, res: Response) => {
  const { error } = await ProductSchema.safeParseAsync(req.body);

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
    throw new NotFoundException("Not found", ErrorCodes.PRODUCT_NOT_FOUND);
  }

  const deletedProduct = await prisma.product.delete({
    where: { id: parseInt(req.body.id, 10) },
  });

  res.status(200).json(deletedProduct);
};
