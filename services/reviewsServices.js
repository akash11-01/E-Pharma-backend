import { Review } from "../models/Review.js";

export const listReviews = async () => {
  const reviews = await Review.find();

  return reviews;
};
