import express from "express";
import multer from "multer";
import { Plant } from "../models/plant.js";

const plantrouter = express.Router();

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

plantrouter.post("/profile", upload.single("image"), async (req, res, next) => {
  try {
    // Create a new image document
    const newPlant = new Plant({
      name: req.body.name,
      description: req.body.description,
      image: {
        data: req.file.filename,
        contentType: req.file.mimetype,
      },
    });
    // Save the plant to the database
    await newPlant.save();

    res.status(201).json({ message: "Plant uploaded successfully" });
  } catch (err) {
    console.error("Failed to upload plant:", err);
    res.status(500).json({ error: "Failed to upload plant" });
  }
});

export default plantrouter;
