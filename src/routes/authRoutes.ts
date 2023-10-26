import express from "express";
import { login, register } from "../controllers/authControllers";
import { asyncWrapper } from "../utils/wrappers";

const router = express.Router();

router.post("/register", asyncWrapper(register));
router.post("/login", asyncWrapper(login));

export default router;
