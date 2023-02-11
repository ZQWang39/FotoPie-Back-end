import express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.get("/getUsers", controller.getUsers);

export default router;
