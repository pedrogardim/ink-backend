import express from "express";
import { loginUser, registerUser } from "../controllers/authControllers";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const authResponse = await registerUser(req.body);
    res.status(201).json(authResponse);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const authResponse = await loginUser(req.body);
    res.status(200).json(authResponse);
  } catch (err) {
    next(err);
  }
});

export default router;
