import express from "express";

const router = express.Router();

import {
  register,
  login,
  getallUsers,
  updateUser,
  getUserByID,
  resetPassword
} from "../controllers/user.js";

router.post("/create", register);
router.post("/login", login);
router.get("/allUsers", getallUsers);
router.put("/updateUser/:id", updateUser);
router.get("/getUserByID/:id", getUserByID);
router.post("/resetPassword", resetPassword);
// router.get("/getUserByID", getUserByID);
export default router;
