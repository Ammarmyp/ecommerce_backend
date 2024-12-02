import { NextFunction, Request, Response } from "express";
import { UnAuthorizedAccessException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";

const addminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user?.role === "ADMIN") {
    next();
  } else {
    next(
      new UnAuthorizedAccessException(
        "Unauthorized",
        ErrorCodes.UNAUTHORIZEDACCESS
      )
    );
  }
};

export default addminMiddleware;
