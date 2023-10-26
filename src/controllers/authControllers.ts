import { Handler } from "express";
import { validateRegistrationData } from "../utils/validation";
import { RegisterPayload } from "../types/auth";

export const register: Handler = async (req, res) => {
  try {
    const isValid = validateRegistrationData(req.body as RegisterPayload);

    res.json(isValid);
  } catch (err: any) {
    const { message, code = 500 } = err;
    res.status(code).json({ error: { code, message } });
  }
};

export const login: Handler = async (req, res) => {
  try {
    res.json("Hello world");
  } catch (err: any) {
    const { message, code = 500 } = err;
    res.status(code).json({ error: { code, message } });
  }
};
