import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCodes } from "../../exceptions/root";
import ApiResponse from "../../services/apiResponse";

const deleteFromCart = async (req: Request, res: Response) => {
  const cartItemId = parseInt(req.params.id);
  const cartItem = await prisma.cartItem.findFirst({
    where: { id: cartItemId, userId: req.user?.id },
  });

  if (!cartItem)
    throw new NotFoundException(
      "Product not found! for that user",
      ErrorCodes.PRODUCT_NOT_FOUND
    );

  const deletedItem = await prisma.cartItem.delete({
    where: {
      id: cartItem.id,
    },
  });

  res
    .status(202)
    .json(new ApiResponse(true, "Item successfully deleted!", deletedItem));
};

export default deleteFromCart;
