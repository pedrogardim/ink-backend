import express from "express";
import { roleCheck } from "../middleware/roleCheck";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
} from "../controllers/appointmentsControllers";

const router = express.Router();

// User operations
router.get("/my", async (req, res) => {
  const appointments = await getAppointments(req.query, req.currentUser);
  res.status(200).json(appointments);
});

router.get("/my/:id", async (req, res) => {
  const appointments = await getAppointmentById(
    parseInt(req.params.id),
    req.currentUser
  );
  res.status(200).json(appointments);
});

router.post("/my", async (req, res) => {
  const appointments = await createAppointment(req.body, req.currentUser);
  res.status(201).json(appointments);
});

router.put("/my/:id", async (req, res) => {
  const appointments = await updateAppointment(
    parseInt(req.params.id),
    req.body,
    req.currentUser
  );
  res.status(201).json(appointments);
});

router.delete("/my/:id", async (req, res) => {
  const appointments = await deleteAppointment(
    parseInt(req.params.id),
    req.currentUser
  );
  res.status(204).json(appointments);
});

//Admin CRUD
const adminRouter = express.Router();
adminRouter.use(roleCheck("super_admin"));

adminRouter.get("/", async (req, res) => {
  const appointments = await getAppointments(req.query);
  res.status(200).json(appointments);
});

adminRouter.get("/:id", async (req, res) => {
  const appointments = await getAppointmentById(parseInt(req.params.id));
  res.status(200).json(appointments);
});

adminRouter.post("/", async (req, res) => {
  const appointments = await createAppointment(req.body);
  res.status(201).json(appointments);
});

adminRouter.put("/:id", async (req, res) => {
  const appointments = await updateAppointment(
    parseInt(req.params.id),
    req.body
  );
  res.status(200).json(appointments);
});

adminRouter.delete("/:id", async (req, res) => {
  const deleteRes = await deleteAppointment(parseInt(req.params.id));
  res.status(204).json(deleteRes);
});

router.use("/", adminRouter);

export default router;
