import { Handler } from "express";
import jwt from "jsonwebtoken";
import { CurrentUserData } from "../types";

export const auth: Handler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] as string;
  const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string);
  req.currentUser = tokenDecoded as CurrentUserData;
  next();
};
