import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    // unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

export const User = mongoose.model("User", schema, "users");
