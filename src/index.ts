import express from "express";

require("dotenv").config();

import { AppDataSource } from "./db";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Hi");
});

AppDataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App listening on port:${process.env.PORT}`);
  });
});
