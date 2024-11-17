import express from "express";

import productsControllers from "../controllers/productsControllers.js";
import { isValidId } from "../middlewares/isValidId.js";

const productsRouter = express.Router();

productsRouter.get("/", productsControllers.getAllProducts);
productsRouter.post("/create", productsControllers.createProduct);
productsRouter.get("/:id", isValidId, productsControllers.getOneProduct);

export default productsRouter;
