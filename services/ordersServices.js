import { Order } from "../models/Order.js";

export const createOrder = async (body) => {
  const newOrder = await Order.create(body);

  return newOrder;
};
