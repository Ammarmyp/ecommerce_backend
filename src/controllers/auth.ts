import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });

  if (user) {
    throw Error("User already exists!");
  }

  user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.json(user);
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
