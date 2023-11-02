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
import { auth } from "../middleware/auth";

const router = express.Router();

//Public

router.get("/", async (req, res) => {
  const tattooWorks = await getTattooWorks(req.query);
  res.status(200).json(tattooWorks);
});

router.get("/:id", async (req, res) => {
  const tattooWork = await getTattooWorkById(parseInt(req.params.id));
  res.status(200).json(tattooWork);
});

//User - Tattooist CRUD
const tattooistRouter = express.Router();
tattooistRouter.use(roleCheck("tattooist"));

tattooistRouter.post("/", async (req, res) => {
  const createdTattooWork = createTattooWork(req.body, req.currentUser);
  res.status(201).json(createdTattooWork);
});
tattooistRouter.put("/:id", async (req, res) => {
  const modifiedTattoWork = updateTattooWork(
    parseInt(req.params.id),
    req.body,
    req.currentUser
  );
  res.status(200).json(modifiedTattoWork);
});
tattooistRouter.delete("/:id", async (req, res) => {
  const deletedRes = await deleteTattooWork(
    parseInt(req.params.id),
    req.currentUser
  );
  res.status(204).json(deletedRes);
});

router.use("/my/", auth, tattooistRouter);

//Admin CRUD
const adminRouter = express.Router();
adminRouter.use(roleCheck("super_admin"));

adminRouter.post("/", async (req, res) => {
  const createdTattooWork = createTattooWork(req.body);
  res.status(201).json(createdTattooWork);
});
adminRouter.put("/:id", async (req, res) => {
  const modifiedTattoWork = updateTattooWork(parseInt(req.params.id), req.body);
  res.status(200).json(modifiedTattoWork);
});
adminRouter.delete("/:id", async (req, res) => {
  const deletedRes = await deleteTattooWork(parseInt(req.params.id));
  res.status(204).json(deletedRes);
});

//
router.use("/", auth, adminRouter);

export default router;
