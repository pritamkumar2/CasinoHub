import express from "express";
const router = express.Router();

import {
  login,
  register,
  verifyOtp,
  forget,
} from "../controllers/login-register/authantication.js";

router.post("/auth/login", login);
router.post("/auth/register", register);
router.post("/auth/verify-otp", verifyOtp);
router.post("/auth/forget", forget);

export default router;
