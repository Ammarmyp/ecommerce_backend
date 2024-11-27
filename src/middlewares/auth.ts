import { NextFunction, Request, Response } from "express";
import { UnAuthorizedAccessException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import prisma from "../../prisma/client";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //*1 extract the token from the header
  const token = req.headers.authorization;

  //*2 if token is not present throw an error of unauthorized
  if (!token) {
    return next(
      new UnAuthorizedAccessException(
        "User is not authorized",
        ErrorCodes.UNAUTHORIZEDACCESS
      )
    );
  }

  try {
    //*3 if token exists, verify that token and extract the payload

    const payload = jwt.verify(token, JWT_SECRET) as any;

    //*4 to get the user from the payload
    const user = await prisma.user.findFirst({ where: { id: payload.userId } });
    if (!user) {
      return next(
        new UnAuthorizedAccessException(
          "User is not authorized",
          ErrorCodes.UNAUTHORIZEDACCESS
        )
      );
    }

    //*5 attach that user to the current request object
    req.user = user;
    next();
  } catch (error) {
    next(
      new UnAuthorizedAccessException(
        "User is not authorized",
        ErrorCodes.UNAUTHORIZEDACCESS
      )
    );
  }
};

export default authMiddleware;
