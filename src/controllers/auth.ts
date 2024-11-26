import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignupSchema } from "../schema/user";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    SignupSchema.parse(req.body);

    const { email, password, name } = req.body;

    let user = await prisma.user.findFirst({ where: { email } });

    if (user) {
      next(
        new BadRequestException(
          "User already exists",
          ErrorCodes.USER_ALREADY_EXISTS
        )
      );
    }

    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });

    res.json(user);
  } catch (error: any) {
    next(
      new UnprocessableEntity(
        error?.issues,
        "Unprocessable entity",
        ErrorCodes.UNPROCESSABLENTITY
      )
    );
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    throw Error("User does not exist!");
  }

  if (!compareSync(password, user.password)) {
    throw Error("Incorrect password.");
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({ user, token });
};
