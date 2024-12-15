import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCodes } from "../../exceptions/root";
import { CartItemSchema } from "../../schema/cart";
import ApiResponse from "../../services/apiResponse";

const addItemToCart = async (req: Request, res: Response) => {
  const validatedData = CartItemSchema.parse(req.body);

  const product = await prisma.product.findFirst({
    where: { id: validatedData.productId },
  });

  if (!product)
    throw new NotFoundException(
      "Product not found",
      ErrorCodes.PRODUCT_NOT_FOUND
    );

  const cartItem = await prisma.cartItem.create({
    data: {
      userId: req.user?.id!,
      productId: product.id,
      quantity: validatedData.quantity,
    },
  });

  res
    .status(201)
    .json(new ApiResponse(true, "item created in the cart", cartItem));
};

export default addItemToCart;
