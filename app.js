import express from "express";
import { config } from "dotenv";

import userRoute from "./routes/user.js";
import plantRoute from "./routes/plant.js";

export const app = express();
config({
  path: "./data/config.env",
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Welcome`);
});

app.use("/todolist/v1/user", userRoute);
app.use("/todolist/v1/plant", plantRoute);
