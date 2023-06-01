import mongoose from "mongoose";

const flowerCategorySchema = new mongoose.Schema({
  category: String,
  flowers: [String],
});

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
  typesofflowers: [flowerCategorySchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Plant = mongoose.model("Plant", schema, "plants");
