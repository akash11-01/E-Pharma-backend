import express from "express";

import reviewsControllers from "../controllers/reviewsControllers.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", reviewsControllers.getAllReviews);

export default reviewsRouter;
