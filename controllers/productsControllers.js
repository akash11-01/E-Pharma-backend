import { httpError } from "../helpers/httpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { getProductById, listProducts } from "../services/productsServices.js";

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10, name, category, stock } = req.query;
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (stock) {
    filter.stock = stock;
  }

  const skip = (page - 1) * limit;

  const result = await listProducts(filter, { skip, limit });

  res.json(result);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById({ _id: id });

  if (!product) {
    throw httpError(404, "Not found");
  }

  res.json(product);
};

export default {
  getAllProducts: ctrlWrapper(getAllProducts),
  getOneProduct: ctrlWrapper(getOneProduct),
};
