import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";
import User from "../models/User";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      res.status(401).json({ message: "No token provided" });
    }

    const [scheme, token] = header?.split(" ") || [];
    if (scheme !== "Bearer" || !token) {
      res.status(401).json({ message: "Invalid auth format" });
    }
    try {
      const decodedToken: any = jwt.verify(token, env.JWT_Secret!);
      const { _id } = decodedToken;
      const user = await User.findById(_id);
      if (!user) {
        return next({ status: 401, message: "not authorized" });
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
