import { config } from "./config/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user";
import loginRoutes from "./routes/login";
import cors from "cors";

const app = express();
// connect to mongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log("db connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);
app.use("/admin", loginRoutes);

app.listen(config.server.port, () => {
  console.log("Server started");
});
