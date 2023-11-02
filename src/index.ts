import express from "express";
import "express-async-errors";

require("dotenv").config();

import { AppDataSource } from "./db";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import appointmentsRouter from "./routes/appointmentRoutes";
import tattooWorksRouter from "./routes/tattooWorksRoutes";
import docsRouter from "./routes/docsRoutes";

import { errorHandler } from "./middleware/errorHandler";
import { auth } from "./middleware/auth";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/users", auth, userRouter);
app.use("/api/appointments", auth, appointmentsRouter);
app.use("/api/tattooWorks", tattooWorksRouter);
app.use("/api/docs", docsRouter);

app.get("/", auth, (req, res) => {
  return res.json("Hi");
});

app.use(errorHandler);

AppDataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App listening on port:${process.env.PORT}`);
    console.log(`Swagger available on: ${process.env.BASE_URL}/docs`);
  });
});
