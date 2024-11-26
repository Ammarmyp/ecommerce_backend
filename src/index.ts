import express, { Express } from "express";
import rootRouter from "./routes";
import { PORT } from "./secret";
import { errorMiddleWare } from "./middlewares/errors";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);
app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log("app started listening in port 3000");
});
