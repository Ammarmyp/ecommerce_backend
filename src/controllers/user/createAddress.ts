import { Request, Response } from "express";
import { AddressSchema } from "../../services/validation";
import prisma from "../../../prisma/client";
import { User } from "@prisma/client";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCodes } from "../../exceptions/root";
import ApiResponse from "../../services/apiResponse";

const createAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);
  let user: User;
  try {
    user = await prisma.user.findFirstOrThrow({
      where: {
        id: parseInt(req.body.userId),
      },
    });
  } catch (error) {
    throw new NotFoundException("user not found:", ErrorCodes.USER_NOT_FOUND);
  }

  const address = await prisma.address.create({
    data: {
      ...req.body,
      userId: user.id,
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
