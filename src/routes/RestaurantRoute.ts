import express from "express";
import RestaurantController from "../controllers/RestaurantControllers";
import {
  validateRestaurantRequest,
  validateRestaurantSearchRequest,
} from "../middleware/validation";

const router = express.Router();

router.get(
  "/:restaurantId",
  validateRestaurantRequest,
  RestaurantController.getRestaurant
);

router.get(
  "/search/:city",
  validateRestaurantSearchRequest,
  RestaurantController.searchRestaurant
);

export default router;
