import { Cart } from "../models/Cart.js";

export const getCartById = async (userId) => {
  const cart = await Cart.findOne({ userId });

  return cart;
};

export const upsertCart = async (userId, data) => {
  const cart = await Cart.findOneAndUpdate({ userId }, data, {
    new: true,
    upsert: true,
  });

  return cart;
};
