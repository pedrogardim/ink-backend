import express from "express";

require("dotenv").config();

import { AppDataSource } from "./db";
import authRouter from "./routes/authRoutes";
import docsRouter from "./routes/docsRoutes";

import { errorHandler } from "./middleware/errorHandler";
import { auth } from "./middleware/auth";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/docs", docsRouter);

app.get("/", auth, (req, res) => {
  return res.json("Hi");
});

app.use(errorHandler);

AppDataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App listening on port:${process.env.PORT}`);
  });
});
