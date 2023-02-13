import { Request, Response } from "express";
import createToken from "../../util/createToken.js";
import prisma from "../../util/prisma.js";

export default async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.json({ error: "Missing Credentials" });

  const duplicateUser = await prisma.user.findFirst({ where: { email } });
  if (duplicateUser) return res.json({ error: "User already exists" });

  const newUser = await prisma.user.create({ data: { name, email, password } });
  const token = createToken(newUser.userId);

  return res.json({ token });
};
