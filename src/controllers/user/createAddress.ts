import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import ApiResponse from "../../services/apiResponse";
import { AddressSchema } from "../../services/validation";

const createAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);

  const address = await prisma.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        true,
        "Address of the user was  successfully created!",
        address
      )
    );
};

export default createAddress;
