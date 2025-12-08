import express from "express";
import { signupUser, loginUser, verifyOtp } from "../authController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);

export default router;
