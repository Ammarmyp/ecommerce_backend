import { Request, Response } from "express";
import { UpdateAddressSchema } from "../../services/validation";
import { Address } from "@prisma/client";
import prisma from "../../../prisma/client";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCodes } from "../../exceptions/root";
import { BadRequestException } from "../../exceptions/bad-request";
import { UnAuthorizedAccessException } from "../../exceptions/unauthorized";
import ApiResponse from "../../services/apiResponse";

const fetchAndValidateAddress = async (
  addressId: number,
  userId: number,
  type: string
) => {
  try {
    const address = await prisma.address.findFirstOrThrow({
      where: {
        id: addressId,
      },
    });
    if (address.userId != userId) {
      throw new BadRequestException(
        `${type} Address does not belong to you`,
        ErrorCodes.UNPROCESSABLENTITY
      );
    }
    return address;
  } catch (error) {
    throw new NotFoundException(
      `${type} Address not found`,
      ErrorCodes.ADDRESS_NOT_FOUND
    );
  }
};

const updateAdress = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new UnAuthorizedAccessException(
      "User not authorized",
      ErrorCodes.UNAUTHORIZEDACCESS
    );
  }
  const validatedData = UpdateAddressSchema.parse(req.body);
  const userId = req.user.id;
  let shippingAddress: Address;
  let billingAddress: Address;
  if (validatedData.defualtShippingAddressId) {
    shippingAddress = await fetchAndValidateAddress(
      validatedData.defualtShippingAddressId,
      userId,
      "shipping"
    );
  }

  if (validatedData.defualtBillingAddressId) {
    billingAddress = await fetchAndValidateAddress(
      validatedData.defualtBillingAddressId,
      userId,
      "billing"
    );
  }

  const updatedAddress = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...validatedData,
    },
  });

  return res
    .status(201)
    .json(
      new ApiResponse(true, "Address updated Successfully", updatedAddress)
    );
};

export default updateAdress;
