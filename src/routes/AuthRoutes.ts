import express from "express";
import {
  validateUserLoginRequest,
  validateUserSignUpRequest,
  validateUserOtpVerificationRequest,
} from "../middleware/validation";

import { jwtParseVerifyOtp } from "../middleware/accountAuth";
import AuthControllers from "../controllers/AuthControllers";
const router = express.Router();

//Login Routes
router.post("/log-in", validateUserLoginRequest, AuthControllers.logIn);

//SignUp Routes
router.post("/send-otp", validateUserSignUpRequest, AuthControllers.sendOtp);

router.post(
  "/verify-otp",
  validateUserOtpVerificationRequest,
  jwtParseVerifyOtp,
  AuthControllers.verifyOtp
);

export default router;
