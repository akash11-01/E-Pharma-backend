import express from "express";

import storesControllers from "../controllers/storesControllers.js";

const storesRouter = express.Router();

storesRouter.get("/", storesControllers.getAllStores);
storesRouter.get("/nearest", storesControllers.getAllNearStores);

export default storesRouter;
