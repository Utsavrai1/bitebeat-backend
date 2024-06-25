import express from "express";
import { jwtParse } from "../middleware/userAuth";
import OrderControllers from "../controllers/OrderControllers";

const router = express.Router();

router.get("/", jwtParse, OrderControllers.getMyOrders);

router.post(
  "/checkout/create-checkout-session",
  jwtParse,
  OrderControllers.createCheckoutSession
);

router.post("/checkout/webhook", OrderControllers.stripeWebhookHandler);

router.post("/rate", jwtParse, OrderControllers.rateOrder);

export default router;
