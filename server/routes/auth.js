import express from "express";
import { googleAuth, signin, signup, signout } from "../controllers/auth.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup)

//SIGN IN
router.post("/signin", signin)

//SIGN OUT
router.post("/signout", signout) //added

//GOOGLE AUTH
router.post("/google", googleAuth)

export default router;
