import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Handler } from "express";
import { validateLogin, validateRegistrationData } from "../utils/validation";
import { LoginPayload, RegisterPayload } from "../types/auth";
import { User } from "../models/User";
import { getBaseUrl } from "../utils/format";

//errors are handled by async wrapper and error middleware!

const { JWT_SECRET = "" } = process.env;

export const register: Handler = async (req, res) => {
  validateRegistrationData(req.body as RegisterPayload);

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    role: "client",
    password: encryptedPassword,
  }).save();

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).json({
    data: {
      kind: "authentication",
      token,
      tokenIat: new Date(),
      tokenExp: new Date(Date.now() + 1000 * 60 * 60),
      user: {
        kind: "user",
        self: `${getBaseUrl(req)}/users/${user.id}`,
        ...user,
        password: undefined,
      },
    },
  });
};

export const login: Handler = async (req, res) => {
  const { email, password } = req.body as LoginPayload;

  validateLogin({ email, password });

  const user = await User.findOneBy({ email });

  if (!user) throw { code: 401, message: "Invalid login credentials" };

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw { code: 401, message: "Invalid login credentials" };
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({
    data: {
      kind: "authentication",
      token,
      tokenIat: new Date(),
      tokenExp: new Date(Date.now() + 1000 * 60 * 60),
      user: {
        kind: "user",
        self: `${getBaseUrl(req)}/users/${user.id}`,
        ...user,
        password: undefined,
      },
    },
  });
};
