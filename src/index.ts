import express from "express";
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Hi");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port:${process.env.PORT}`);
});
