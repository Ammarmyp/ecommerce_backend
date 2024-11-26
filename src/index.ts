import express, { Express } from "express";
import rootRouter from "./routes";
import { PORT } from "./secret";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log("app started listening in port 3000");
});
