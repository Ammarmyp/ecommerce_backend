import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCodes } from "../../exceptions/root";
import ApiResponse from "../../services/apiResponse";

const deleteAddress = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const address = await prisma.address.findUnique({
    where: {
      id,
    },
  });
  if (!address) {
    throw new NotFoundException(
      "Address not found",
      ErrorCodes.ADDRESS_NOT_FOUND
    );
  }

  await prisma.address.delete({ where: { id } });

  res.json(new ApiResponse(true, "Address successfully deleted!", address));
};

export default deleteAddress;
