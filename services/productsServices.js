import { Product } from "../models/Product.js";

export const listProducts = async (filter = {}, query = {}) => {
  const products = await Product.find(
    filter,
    "id name price stock category photo suppliers",
    query
  );

  const total = await Product.countDocuments(filter);
  return { products, total };
};

export const getProductById = async (productId) => {
  const product = await Product.findById(productId);

  return product;
};
