import express from "express";

import { asyncWrapper } from "../utils/wrappers";
import { roleCheck } from "../middleware/roleCheck";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
} from "../controllers/appointmentsControllers";

const router = express.Router();

//Admin CRUD
const adminRouter = express.Router();
adminRouter.use(roleCheck("super_admin"));

adminRouter.get("/", asyncWrapper(getAppointments));
adminRouter.get("/:id", asyncWrapper(getAppointmentById));
adminRouter.post("/", asyncWrapper(createAppointment));
adminRouter.put("/:id", asyncWrapper(updateAppointment));
adminRouter.delete("/:id", asyncWrapper(deleteAppointment));

router.use("/", adminRouter);

export default router;
