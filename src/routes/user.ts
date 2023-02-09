import express from "express";
import userController from "../controllers/user";
const router = express.Router();

router.post("/signup", userController.signUp);

export = router;
