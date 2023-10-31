import express from "express";
import {
  getTattooWorkById,
  getTattooWorks,
  createTattooWork,
  updateTattooWork,
  deleteTattooWork,
} from "../controllers/tattooWorksControllers";
import { asyncWrapper } from "../utils/wrappers";
import { roleCheck } from "../middleware/roleCheck";

const router = express.Router();

//Admin CRUD
const adminRouter = express.Router();
adminRouter.use(roleCheck("super_admin"));

adminRouter.get("/", asyncWrapper(getTattooWorks));
adminRouter.get("/:id", asyncWrapper(getTattooWorkById));
adminRouter.post("/", asyncWrapper(createTattooWork));
adminRouter.put("/:id", asyncWrapper(updateTattooWork));
adminRouter.delete("/:id", asyncWrapper(deleteTattooWork));

//User
//TODO

router.use("/", adminRouter);

export default router;
