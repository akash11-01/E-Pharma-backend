import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { listReviews } from "../services/reviewsServices.js";

const getAllReviews = async (_, res) => {
  const result = await listReviews();

  res.json(result);
};

export default {
  getAllReviews: ctrlWrapper(getAllReviews),
};
