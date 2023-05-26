import express from "express";

const router = express.Router();

import { register, login, getallUsers } from "../controllers/user.js";

router.post("/create", register);
router.post("/login", login);
router.get("/allUsers", getallUsers);
export default router;
