import express from "express";
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersControllers";
import { asyncWrapper } from "../utils/wrappers";
import { roleCheck } from "../middleware/roleCheck";

const router = express.Router();

//Admin CRUD
router.get("/", roleCheck("super_admin"), asyncWrapper(getUsers));
router.get("/:id", roleCheck("super_admin"), asyncWrapper(getUserById));
router.post("/", roleCheck("super_admin"), asyncWrapper(createUser));
router.put("/:id", roleCheck("super_admin"), asyncWrapper(updateUser));
router.delete("/:id", roleCheck("super_admin"), asyncWrapper(deleteUser));

//User
router.get("/me", asyncWrapper(getUsers));
router.put("/me", asyncWrapper(updateUser));
router.delete("/me", asyncWrapper(deleteUser));

export default router;
