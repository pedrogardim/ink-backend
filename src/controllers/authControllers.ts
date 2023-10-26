import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Handler } from "express";
import { validateRegistrationData } from "../utils/validation";
import { RegisterPayload } from "../types/auth";
import { User } from "../models/User";
import { getBaseUrl } from "../utils/format";

//errors are handled by async wrapper and error middleware!

const { JWT_SECRET = "" } = process.env;

export const register: Handler = async (req, res) => {
  validateRegistrationData(req.body as RegisterPayload);

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    password: encryptedPassword,
  }).save();

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  delete user.password;

  res.json({
    data: {
      kind: "authentication",
      token,
      tokenIat: new Date(),
      tokenExp: new Date(Date.now() + 1000 * 60 * 60),
      user: {
        kind: "user",
        self: `${getBaseUrl(req)}/users/${user.id}`,
        ...user,
      },
    },
  });
};

export const login: Handler = async (req, res) => {
  res.json("Hello world");
};
