import express from "express";
import controller from "../controllers/userLogin";
import requireUser from "../middleware/getUser";

const router = express.Router();

//api calls
router.post("/login", controller.userLoginCreate);
router.get("/login", requireUser, controller.findUserLogin);

export = router;
