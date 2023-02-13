import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();
const tokenVerifier = process.env.TOKEN_VERIFIER;
if (!tokenVerifier) throw new Error("TOKEN_VERIFIER is not defined");

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.json({ error: "No Token Provided" });

  jwt.verify(token, tokenVerifier, (err, userId) => {
    if (err) return res.json({ error: "Invalid Token" });

    req.params.userId = userId as string;
    next();
  });
};
