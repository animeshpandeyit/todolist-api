import express from "express";

const router = express.Router();

import {
  register,
  login,
  getallUsers,
  updateUser,
  getUserByID,
  resetPassword,
  getMyProfile,
  logout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.post("/create", register);
router.post("/login", login);
router.get("/allUsers", getallUsers);
router.put("/updateUser/:id", updateUser);
router.get("/getUserByID/:id", getUserByID);
router.post("/resetPassword", resetPassword);
router.get("/logout", logout);
router.get("/getMyProfile", isAuthenticated, getMyProfile);
// router.get("/getUserByID", getUserByID);
export default router;
