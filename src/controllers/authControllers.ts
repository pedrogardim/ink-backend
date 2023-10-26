import bcrypt from "bcrypt";
import { Handler } from "express";
import { validateRegistrationData } from "../utils/validation";
import { RegisterPayload } from "../types/auth";
import { User } from "../models/User";

//errors are handled by async wrapper and error middleware!

export const register: Handler = async (req, res) => {
  validateRegistrationData(req.body as RegisterPayload);

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    password: encryptedPassword,
  }).save();

  res.json(user);
};

export const login: Handler = async (req, res) => {
  res.json("Hello world");
};
