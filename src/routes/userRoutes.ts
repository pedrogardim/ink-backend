import express from "express";
import {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersControllers";
import { roleCheck } from "../middleware/roleCheck";
import { auth } from "../middleware/auth";

const router = express.Router();

//Admin CRUD
const adminRouter = express.Router();
adminRouter.use(roleCheck("super_admin"));

adminRouter.get("/", async (req, res) => {
  const users = await getUsers(req.query);
  res.status(200).json(users);
});

adminRouter.get("/:id", async (req, res) => {
  const user = await getUserById(parseInt(req.params.id));
  res.status(200).json(user);
});

adminRouter.post("/", async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
});

adminRouter.put("/:id", async (req, res) => {
  const user = await updateUser(parseInt(req.params.id), req.body);
  res.status(200).json(user);
});

adminRouter.delete("/:id", async (req, res) => {
  const userDeleted = await deleteUser(parseInt(req.params.id));
  res.status(204).json(userDeleted);
});
adminRouter.put("/setAsTattooist/:id", async (req, res, next) => {
  const user = await updateUser(parseInt(req.params.id), {
    role: "tattooist",
  });
  res.status(200).json(user);
});

//User

const myProfileRouter = express.Router();

myProfileRouter.get("/me", async (req, res) => {
  const { userId } = req.currentUser;
  const user = await getUserById(userId);
  res.status(200).json(user);
});

myProfileRouter.put("/me", async (req, res) => {
  const { userId } = req.currentUser;
  const user = await updateUser(userId, req.body);
  res.status(200).json(user);
});

myProfileRouter.delete("/me", async (req, res) => {
  const { userId } = req.currentUser;
  const userDeleted = await deleteUser(userId);
  res.status(204).json(userDeleted);
});

//public user routes

router.get("/getTattooists", async (req, res) => {
  const users = await getUsers(
    { ...req.query, role: "tattooist" },
    { routePrefix: "/getTattooists/" }
  );
  res.status(200).json(users);
});

//TODO: DOCUMENTATION
router.get("/getTattooist/:id", async (req, res) => {
  const users = await getUserById(parseInt(req.params.id), {
    role: "tattooist",
  });
  res.status(200).json(users);
});

router.use("/", auth, adminRouter);
router.use("/", auth, myProfileRouter);

export default router;
