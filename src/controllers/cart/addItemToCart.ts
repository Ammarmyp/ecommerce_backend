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

  let cartItem;

  const existingCartItem = await prisma.cartItem.findFirst({
    where: {
      productId: validatedData.productId,
      userId: req.user?.id,
    },
  });

  let responseMessage;
  if (existingCartItem) {
    cartItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + validatedData.quantity },
    });

    responseMessage = "quantity updated";
  } else {
    cartItem = await prisma.cartItem.create({
      data: {
        userId: req.user?.id!,
        productId: product.id,
        quantity: validatedData.quantity,
      },
    });

    responseMessage = "Item created in the cart!";
  }
  const statusCode = existingCartItem ? 200 : 201;

  res.status(statusCode).json(new ApiResponse(true, responseMessage, cartItem));
};

export default addItemToCart;
