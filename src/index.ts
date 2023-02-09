import { config } from "./config";
import express, { Request, Response } from "express";
import mongoose, { Schema } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes";

const bcrypt = require("bcryptjs");

dotenv.config();

//MongoDB setup
mongoose.connect(config.mongo.url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error..."));
db.once("open", () => {
  console.log("Connected to the Database...");
});

//Express
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);

//Port
const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server is on port ${port}...`);
});
