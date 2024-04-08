import express from "express";
import multer from "multer";
import MyRestaurantControllers from "../controllers/MyRestaurantControllers";
import { jwtParse } from "../middleware/userAuth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, //10mb
  },
});

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtParse,
  MyRestaurantControllers.createMyRestaurant
);

router.get("/", jwtParse, MyRestaurantControllers.getMyRestaurant);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtParse,
  MyRestaurantControllers.updateMyRestaurant
);

router.get("/order", jwtParse, MyRestaurantControllers.getMyRestaurantOrders);

router.patch(
  "/order/:orderId/status",
  jwtParse,
  MyRestaurantControllers.updateOrderStatus
);

export default router;
