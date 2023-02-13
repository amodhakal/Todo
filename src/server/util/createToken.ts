import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const tokenVerifier = process.env.TOKEN_VERIFIER;
if (!tokenVerifier) throw new Error("TOKEN_VERIFIER is not defined");

export default (userId: string) =>
  jwt.sign(userId, tokenVerifier);
