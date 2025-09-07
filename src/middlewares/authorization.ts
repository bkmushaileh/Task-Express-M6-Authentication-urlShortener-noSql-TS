import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";

export const authorization = (
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
      const payload = jwt.verify(token, env.JWT_Secret!);
      (req as any).user = payload;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
