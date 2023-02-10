import { config } from "./config/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userLogin";
import dbConnection from "./utilities/databaseConnection";
import deserializeUser from "./middleware/deserializeUser";

const router = express();

//connect to mongo db
mongoose.set("strictQuery", true);
dbConnection();

// basic config
router.use(express.json());
router.use(deserializeUser);
router.use(cors());

// routes
router.use("/user", userRoutes);

//create server
router.listen(config.server.port, () => {
  console.log("server started");
});
