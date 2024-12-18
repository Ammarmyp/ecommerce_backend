import { CartItem } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import ApiResponse from "../../services/apiResponse";

const listItems = async (req: Request, res: Response) => {
  const items: CartItem[] = await prisma.cartItem.findMany({
    where: {
      userId: req.user?.id,
    },
    include: { product: true },
  });

  res
    .status(200)
    .json(
      new ApiResponse(true, "List of cart items fetched successfully!", items)
    );
};

export default listItems;
