import express from "express";
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  setAsTattoist,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  getTattooists,
} from "../controllers/usersControllers";
import { asyncWrapper } from "../utils/wrappers";
import { roleCheck } from "../middleware/roleCheck";

const router = express.Router();

//Admin CRUD
const adminRouter = express.Router();
adminRouter.use(roleCheck("super_admin"));

adminRouter.get("/", asyncWrapper(getUsers));
adminRouter.get("/:id", asyncWrapper(getUserById));
adminRouter.post("/", asyncWrapper(createUser));
adminRouter.put("/:id", asyncWrapper(updateUser));
adminRouter.delete("/:id", asyncWrapper(deleteUser));
adminRouter.put("/setAsTattooist/:id", asyncWrapper(setAsTattoist));

//User
router.get("/me", asyncWrapper(getMyProfile));
router.put("/me", asyncWrapper(updateMyProfile));
router.delete("/me", asyncWrapper(deleteMyProfile));

router.get("/getTattooists", asyncWrapper(getTattooists));

router.use("/", adminRouter);

export default router;
