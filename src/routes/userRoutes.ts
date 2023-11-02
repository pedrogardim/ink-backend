import express, { Request } from "express";
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

adminRouter.get("/", async (req, res, next) => {
  try {
    const users = await getUsers(req.query);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

adminRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(parseInt(req.params.id));
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

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
