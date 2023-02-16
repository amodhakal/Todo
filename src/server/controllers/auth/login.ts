import { Request, Response } from "express";
import createToken from "../../util/createToken.js";
import prisma from "../../util/prisma.js";

export default async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ error: "Missing Credentials" });

    const user = await prisma.user.findFirst({ where: { email, password } });
    if (!user) return res.json({ error: "Invalid Credentials" });

    const token = createToken(user.userId);
    return res.json({ token });
}
