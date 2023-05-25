import mongoose from "mongoose";

export const connectDB = (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "todolistusers",
      useNewUrlParser: "true",
      useUnifiedTopology: "true",
    })
    .then((c) => console.log(`Database Connected`))
    .catch((e) => console.log(e));
};
