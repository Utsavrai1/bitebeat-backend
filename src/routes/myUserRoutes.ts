import express from "express";
import MyUserControllers from "../controllers/MyUserControllers";
import { jwtParse } from "../middleware/userAuth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.get("/", jwtParse, MyUserControllers.getCurrentUser);

router.put(
  "/",
  jwtParse,
  validateMyUserRequest,
  MyUserControllers.updateCurrentUser
);

export default router;
