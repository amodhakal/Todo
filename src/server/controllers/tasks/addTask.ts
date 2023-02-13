import prisma from "../../util/prisma.js";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const { userId, content } = req.body;
  if (!content) return res.json({ error: "No Content Provided" });

  await prisma.task
    .create({ data: { content, userId } })
    .then(() => res.json({ success: "Task Added" }));
};
