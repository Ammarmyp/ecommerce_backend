import { compareSync, hashSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import prisma from "../../prisma/client";
import { BadRequestException } from "../exceptions/bad-request";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { SignupSchema } from "../schema/user";
import { JWT_SECRET } from "../secret";
import ApiResponse from "../services/apiResponse";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignupSchema.parse(req.body);

  const { email, password, name } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });

  if (user) {
    throw new BadRequestException(
      "User already exists",
      ErrorCodes.USER_ALREADY_EXISTS
    );
  }

  user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.json(new ApiResponse(true, "User created", user));
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    throw new NotFoundException("User not found!", ErrorCodes.USER_NOT_FOUND);
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestException(
      "Incorrect password",
      ErrorCodes.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json(new ApiResponse(true, "user logged in ", { user, token }));
};

export const me = async (req: Request, res: Response) => {
  if (req.user) {
    res.json(req.user);
  }
};
