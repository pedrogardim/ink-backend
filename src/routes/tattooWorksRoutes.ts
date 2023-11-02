import express from "express";
import {
  getTattooWorkById,
  getTattooWorks,
  createTattooWork,
  updateTattooWork,
  deleteTattooWork,
  getMyTattooWorks,
  getMyTattooWorkById,
  createMyTattooWork,
  updateMyTattooWork,
  deleteMyTattooWork,
} from "../controllers/tattooWorksControllers";
import { asyncWrapper } from "../utils/wrappers";
import { roleCheck } from "../middleware/roleCheck";
import { auth } from "../middleware/auth";

const router = express.Router();

//Public
router.get("/", asyncWrapper(getTattooWorks));
router.get("/", asyncWrapper(getMyTattooWorks));

//User - Tattooist CRUD
const tattooistRouter = express.Router();
tattooistRouter.use(roleCheck("tattooist"));

tattooistRouter.get("/:id", asyncWrapper(getMyTattooWorkById));
tattooistRouter.post("/", asyncWrapper(createMyTattooWork));
tattooistRouter.put("/:id", asyncWrapper(updateMyTattooWork));
tattooistRouter.delete("/:id", asyncWrapper(deleteMyTattooWork));

//Admin CRUD
const adminRouter = express.Router();
adminRouter.use(roleCheck("super_admin"));

adminRouter.get("/:id", asyncWrapper(getTattooWorkById));
adminRouter.post("/", asyncWrapper(createTattooWork));
adminRouter.put("/:id", asyncWrapper(updateTattooWork));
adminRouter.delete("/:id", asyncWrapper(deleteTattooWork));

//
router.use("/my/", auth, tattooistRouter);
router.use("/", auth, adminRouter);

export default router;
