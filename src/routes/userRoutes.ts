import express from "express";
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersControllers";
import { asyncWrapper } from "../utils/wrappers";

const router = express.Router();

//Admin CRUD
router.get("/", asyncWrapper(getUsers));
router.get("/:id", asyncWrapper(getUserById));
router.post("/", asyncWrapper(createUser));
router.put("/:id", asyncWrapper(updateUser));
router.delete("/:id", asyncWrapper(deleteUser));

//User
router.get("/me", asyncWrapper(getUsers));
router.put("/me", asyncWrapper(updateUser));
router.delete("/me", asyncWrapper(deleteUser));

export default router;
