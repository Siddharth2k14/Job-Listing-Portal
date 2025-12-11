// import express from "express";
// import { signupUser, loginUser, verifyOtp } from "../controllers/authController.js"

// const router = express.Router();

// router.post("/signup", signupUser);
// router.post("/login", loginUser);
// router.post("/verify-otp", verifyOtp);

// export default router;

import express from 'express';
import { signupUser, loginUser } from '../authController.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

export default router;
