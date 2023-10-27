import fs from "fs";
import express from "express";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express";

const file = fs.readFileSync("src/docs/swagger.yaml", "utf8");
const swaggerDocument = yaml.parse(file);

const router = express.Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
