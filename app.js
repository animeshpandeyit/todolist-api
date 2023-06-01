import express from "express";
import { config } from "dotenv";

import userRoute from "./routes/user.js";
import plantRoute from "./routes/plant.js";

import cookieParser from "cookie-parser";

export const app = express();
config({
  path: "./data/config.env",
});
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send(`Welcome`);
});

app.use("/todolist/v1/user", userRoute);

app.use("/todolist/v1/plant", plantRoute);
