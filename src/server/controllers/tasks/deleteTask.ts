import prisma from "../../util/prisma.js";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const { userId, taskId } = req.body;

  const task = await prisma.task.findUnique({ where: { taskId } });
  if (!task) return res.json({ error: "Task not found" });
  if (task.userId !== userId) return res.json({ error: "Unauthorized" });

  await prisma.task
    .delete({ where: { taskId } })
    .then(() => res.json({ success: "Task Deleted" }));
};
