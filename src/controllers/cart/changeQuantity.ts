import { Request, Response } from "express";
import { ChangeQuantitySchema } from "../../schema/cart";
import prisma from "../../../prisma/client";
import ApiResponse from "../../services/apiResponse";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCodes } from "../../exceptions/root";

const changeQuantity = async (req: Request, res: Response) => {
  const validatedData = ChangeQuantitySchema.parse(req.body);
  const item = await prisma.cartItem.findFirst({
    where: {
      id: parseInt(req.params.id),
      userId: req.user?.id,
    },
  });

  if (!item)
    throw new NotFoundException(
      "This item is not found in the users cart",
      ErrorCodes.PRODUCT_NOT_FOUND
    );

  const updatedCart = await prisma.cartItem.update({
    where: {
      id: parseInt(req.params.id),
      userId: req.user?.id,
    },
    data: {
      quantity: validatedData.quantity,
    },
  });

  res
    .status(200)
    .json(new ApiResponse(true, "Quantity updated successfully!", updatedCart));
};

export default changeQuantity;
