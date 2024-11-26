import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { hashSync } from "bcrypt";

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
