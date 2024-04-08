import express from "express";
import { jwtParse } from "../middleware/userAuth";
import OrderControllers from "../controllers/OrderControllers";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  jwtParse,
  OrderControllers.createCheckoutSession
);

router.post("/checkout/webhook", OrderControllers.stripeWebhookHandler);

export default router;
