import express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.get("/login", controller.adminLogin);

export default router;
