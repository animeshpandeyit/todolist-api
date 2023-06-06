import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

import { Plant } from "../models/plant.js";
// import { getplantData } from "../controllers/plant.js";
const router = express.Router();
// import { isAuthenticated } from "../middlewares/auth.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/profile",
  // isAuthenticated,
  upload.single("image"),
  async (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        res.status(401).json({ success: false, message: "login first!!" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id);
      // Create a new image document
      const newPlant = new Plant({
        name: req.body.name,
        description: req.body.description,
        typesofflowers: {
          category: req.body.category,
          flowers: req.body.flowers,
        },
        image: {
          data: req.file.filename,
          contentType: req.file.mimetype,
        },
        user: req.user,
      });
      // Save the plant to the database
      await newPlant.save();
      res.status(201).json({ message: "Plant uploaded successfully" });
    } catch (err) {
      console.error("Failed to upload plant:", err);
      res.status(500).json({ error: "Failed to upload plant" });
    }
  }
);

// router.get("/getplantData", getplantData);

export default router;
