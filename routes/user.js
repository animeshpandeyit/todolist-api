import express from "express";

const router = express.Router();

import { register } from "../controllers/user.js";

router.post("/create", register);
export default router;
