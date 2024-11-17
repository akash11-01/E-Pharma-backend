import express from "express";

import cartControllers from "../controllers/cartControllers.js";
import ordersControllers from "../controllers/ordersControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { cartSchema } from "../schemas/cartsSchemas.js";
import { orderSchema } from "../schemas/ordersSchemas.js";

const cartRouter = express.Router();

cartRouter.get("/", authenticate, cartControllers.getOneCart);
cartRouter.put(
  "/update",
  authenticate,
  validateBody(cartSchema),
  cartControllers.saveCart
);
cartRouter.post(
  "/checkout",
  authenticate,
  validateBody(orderSchema),
  ordersControllers.addOrder
);

export default cartRouter;
