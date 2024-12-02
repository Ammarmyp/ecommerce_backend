import { Request, Response } from "express";
import { ProductSchema } from "../services/validation";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import prisma from "../../prisma/client";
import { fromError } from "zod-validation-error";

export const createProduct = async (req: Request, res: Response) => {
  const { success, error } = await ProductSchema.safeParseAsync(req.body);

  if (error) {
    const validationError = fromError(error).toString();
    throw new BadRequestException(
      validationError,
      ErrorCodes.UNPROCESSABLENTITY
    );
  }

  const product = await prisma.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.status(201).json(product);
};
