import prisma from "../../util/prisma.js";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
    const { userId } = req.body;

    const tasks = await prisma.task.findMany({ where: { userId } });
    return res.json(tasks);
}