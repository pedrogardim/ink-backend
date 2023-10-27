import fs from "fs";
import express from "express";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = YAML.parse(
  fs.readFileSync("src/docs/swagger.yaml", "utf8")
);

const componentsDocument = YAML.parse(
  fs.readFileSync("src/docs/components.yaml", "utf8")
);

const router = express.Router();

router.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup({
    ...swaggerDocument,
    components: componentsDocument.components,
  })
);

export default router;
