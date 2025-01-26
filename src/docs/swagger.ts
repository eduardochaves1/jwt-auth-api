import fs from "fs";

const swaggerDocument = JSON.parse(
  fs.readFileSync("./src/docs/swagger.json", "utf8")
);

export default swaggerDocument;
