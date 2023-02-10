import mongoose from "mongoose";
import { config } from "../config/config";

const dbConnection = async () => {
  try {
    await mongoose.connect(config.mongo.url);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
