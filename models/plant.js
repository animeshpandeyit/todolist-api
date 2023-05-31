import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    // unique: true,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

export const Plant = mongoose.model("Plant", schema, "plants");
