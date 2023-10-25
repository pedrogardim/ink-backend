import express from "express";

require("dotenv").config();

import { AppDataSource } from "./db";
import authRouter from "./routes/authRoutes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  return res.json("Hi");
});

AppDataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App listening on port:${process.env.PORT}`);
  });
});
