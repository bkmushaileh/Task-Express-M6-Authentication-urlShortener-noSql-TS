import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { env } from "../../config";
import { generateHashPassword } from "../../utils/hashPassword";
import { generatetoken } from "../../utils/jwt";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next({ message: "No username or password", status: 400 });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return next({ message: "username already exists!", status: 400 });
    }
    req.body.password = await generateHashPassword(password);

    const newUser = await User.create(req.body);
    const token = generatetoken(newUser, username);

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next({ message: "Invalid credentials", status: 400 });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return next({ message: "Invalid credentials", status: 400 });
    }
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generatetoken(user._id, username);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};
