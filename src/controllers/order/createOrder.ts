import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import ApiResponse from "../../services/apiResponse";
import { BadRequestException } from "../../exceptions/bad-request";
import { ErrorCodes } from "../../exceptions/root";

const createOrder = async (req: Request, res: Response) => {
  /**
   * * create a transaction
   * *to list all the cart items and proceed if the cart is not empty
   * * calculate the total amount
   * * fetch address of the user
   * * define the computed fields for formatted address on address module
   * * create order and order products
   * * then create an event for the order
   */

  return await prisma.$transaction(async (tx) => {
    const userId = req.user?.id;
    if (!userId)
      throw new BadRequestException(
        "User not found",
        ErrorCodes.USER_NOT_FOUND
      );
    const cartItems = await tx.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res
        .status(400)
        .json(new ApiResponse(true, "Cart is currently empty!"));
    }

    const totalAmount = cartItems.reduce((total, item) => {
      return total + +item.product.price * item.quantity;
    }, 0);

    const address = await tx.address.findFirst({
      where: { id: req.user?.defualtShippingAddressId! },
    });

    const formattedAddress = `${address?.lineOne}, ${address?.city}, ${address?.region}, ${address?.country}`;

    const order = await tx.order.create({
      data: {
        address: formattedAddress,
        netAmount: totalAmount,
        userId: userId,
        products: {
          create: cartItems.map((cart) => ({
            productId: cart.productId,
            quantity: cart.quantity,
          })),
        },
      },
    });

    await tx.orderEvent.create({
      data: {
        orderId: order.id,
        status: "PENDING",
      },
    });
  });
};

export default createOrder;
