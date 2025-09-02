import { env } from "../config";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export const generatetoken = (newUser: any, username: String) => {
  const payload = { _id: newUser._id, username };
  const secret = env.JWT_Secret!;
  const options = { expiresIn: env.JWTEXP } as jwt.SignOptions;
  const token = jwt.sign(payload, secret, options);
  return token;
};
