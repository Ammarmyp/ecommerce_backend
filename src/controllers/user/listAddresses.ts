import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import ApiResponse from "../../services/apiResponse";

const listAddresses = async (req: Request, res: Response) => {
  const addresses = await prisma.address.findMany({
    where: { userId: req.user?.id },
  });

  res
    .status(200)
    .json(
      new ApiResponse(true, "List of addresses fetched successfully", addresses)
    );
};

export default listAddresses;
